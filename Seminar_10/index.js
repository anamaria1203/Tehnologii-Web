const express = require("express");
const app = express();
const port = 3000;

const sequelize = require("./sequelize");

const University = require("./models/university");
const Student = require("./models/student");

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
University.hasMany(Student);
Student.belongsTo(University);

app.listen(port, () => {
  console.log("The server is running on http://localhost:" + port);
});

app.use((err, req, res, next) => {
  console.error("[ERROR]:" + err);
  res.status(500).json({ message: "500 - Server Error" });
});

app.get("/create", async (req, res, next) => {
  try {
    await sequelize.sync({ force: true });
    res.status(201).json({ message: "Database created with the models." });
  } catch (err) {
    next(err);
  }
});

app.get("/universities", async (req, res, next) => {
  try {
    const universities = await University.findAll();
    res.status(200).json(universities);
  } catch (err) {
    next(err);
  }
});

app.post("/university", async (req, res, next) => {
  try {
    await University.create(req.body);
    res.status(201).json({ message: "University Created!" });
  } catch (err) {
    next(err);
  }
});

app.post("/universities/:universityId/students", async (req, res, next) => {
  try {
    const university = await University.findByPk(req.params.universityId);
    if (university) {
      const student = new Student(req.body);
      student.universityId = university.id;
      await student.save();
      res.status(201).json({ message: "Student created!" });
    } else {
      res.status(404).json({ message: "404 - University Not Found" });
    }
  } catch (error) {
    next(error);
  }
});

app.get("/universities/:universityId/students", async (req, res, next) => {
  try {
    const university = await University.findByPk(req.params.universityId);
    if (university) {
      const students = await university.getStudents();
      res.status(200).json(students);
    } else {
      res.status(404).json({ message: "404 - University Not Found!" });
    }
  } catch (error) {
    next(error);
  }
});

app.get(
  "/universities/:universityId/students/:studentId",
  async (req, res, next) => {
    try {
      const university = await University.findByPk(req.params.universityId);
      if (university) {
        const students = await university.getStudents({
          where: { id: req.params.studentId },
        });
        const student = students.shift();
        if (student) {
          res.status(200).json(student);
        } else {
          res
            .status(404)
            .json({ message: "404 - Student Not Found in this University!" });
        }
      } else {
        res.status(404).json({ message: "404 - University Not Found!" });
      }
    } catch (error) {
      next(error);
    }
  }
);

app.delete(
  "/universities/:universityId/students/:studentId",
  async (req, res, next) => {
    try {
      const university = await University.findByPk(req.params.universityId);
      if (university) {
        const students = await university.getStudents({
          where: { id: req.params.studentId },
        });
        const student = students.shift();
        if (student) {
          await student.destroy();
          res.status(202).json({ message: "Student deleted!" });
        } else {
          res.status(404).json({ message: "404 - Student Not Found!" });
        }
      } else {
        res.status(404).json({ message: "404 - University Not Found!" });
      }
    } catch (error) {
      next(error);
    }
  }
);

app.put(
  "/universities/:universityId/students/:studentId",
  async (req, res, next) => {
    try {
      const university = await University.findByPk(req.params.universityId);
      if (university) {
        const students = await university.getStudents({
          where: { id: req.params.studentId },
        });
        const student = students.shift();
        if (student) {
          student.studentFullName = req.body.fullName;
          student.studentStatus = req.body.status;
          await student.save();
          res.status(202).json({ message: "Student updated!" });
        } else {
          res.status(404).json({ message: "404 - Student Not Found!" });
        }
      } else {
        res.status(404).json({ message: "404 - University Not Found!" });
      }
    } catch (error) {
      next(error);
    }
  }
);

const express = require("express");
const application = express();
const port = process.env.PORT || 8080;

const sequelize = require("./sequelize");

const University = require("./models/university");
const Student = require("./models/student");

University.hasMany(Student);
Student.belongsTo(University);

application.use(
  express.urlencoded({
    extended: true,
  })
);
application.use(express.json());

application.listen(port, () => {
  console.log(`The server is running on http://localhost:${port}.`);
});

application.use((error, request, response, next) => {
  console.error(`[ERROR]: ${error}`);
  response.status(500).json(error);
});

application.put("/", async (request, response, next) => {
  try {
    await sequelize.sync({ force: true });
    response.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

application.get("/universities", async (request, response, next) => {
  try {
    const universities = await University.findAll();
    if (universities.length > 0) {
      response.json(universities);
    } else {
      response.sendStatus(204);
    }
  } catch (error) {
    next(error);
  }
});

application.post("/universities", async (request, response, next) => {
  try {
    const university = await University.create(request.body);
    response.status(201).location(university.id).send();
  } catch (error) {
    next(error);
  }
});

application.get(
  "/universities/:universityId/students",
  async (request, response, next) => {
    try {
      const university = await University.findByPk(request.params.universityId);
      if (university) {
        const students = await university.getStudents();
        if (students.length > 0) {
          response.json(students);
        } else {
          response.sendStatus(204);
        }
      } else {
        response.sendStatus(404);
      }
    } catch (error) {
      next(error);
    }
  }
);

application.post(
  "/universities/:universityId/students",
  async (request, response, next) => {
    try {
      const university = await University.findByPk(request.params.universityId);
      if (university) {
        const student = await Student.create(request.body);
        await university.addStudent(student);
        response.status(201).location(student.id).send();
      } else {
        response.sendStatus(404);
      }
    } catch (error) {
      next(error);
    }
  }
);

application.get(
  "/universities/:universityId/students/:studentId/enrollements",
  async (request, response, next) => {
    try {
      const university = await University.findByPk(request.params.universityId);
      if (university) {
        const students = await university.getStudents({
          where: { id: request.params.studentId },
        });
        const student = students.shift();

        if (student) {
          response.json({
            student: student.studentFullName,
            enrolledAt: university.universityName,
            status: student.studentStatus,
            message: "Informații înrolare găsite.",
          });
        } else {
          response
            .status(404)
            .json({ message: "Studentul nu aparține de această universitate" });
        }
      } else {
        response.sendStatus(404);
      }
    } catch (error) {
      next(error);
    }
  }
);

application.delete(
  "/universities/:universityId/students/:studentId",
  async (request, response, next) => {
    try {
      const university = await University.findByPk(request.params.universityId);
      if (university) {
        const students = await university.getStudents({
          where: { id: request.params.studentId },
        });
        const student = students.shift();
        if (student) {
          await student.destroy();
          response.sendStatus(204);
        } else {
          response.sendStatus(404);
        }
      } else {
        response.sendStatus(404);
      }
    } catch (error) {
      next(error);
    }
  }
);

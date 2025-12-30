const { Op } = require("sequelize");
const Employee = require("../models/employee");

const router = require("express").Router();

router
  .route("/employees")
  .get(async (req, res) => {
    const { name, minSalary, simplified, sortBy } = req.query;

    try {
      let whereClause = {};
      if (minSalary) {
        whereClause.salary = { [Op.gt]: minSalary };
      }
      if (name) {
        whereClause.firstName = { [Op.like]: `%${name}%` };
      }

      const employees = await Employee.findAll({
        where: Object.keys(whereClause).length > 0 ? whereClause : undefined,

        attributes: simplified
          ? { exclude: ["id", "createdAt", "updatedAt"] }
          : undefined,

        //SORTARE:
        // Dacă primim sortBy, ordonăm crescător după acel câmp
        order: sortBy ? [[sortBy, "ASC"]] : undefined,
      });

      return res.status(200).json(employees);
    } catch (err) {
      return res
        .status(500)
        .json({ error: "Eroare la filtrare/sortare", details: err });
    }
  })
  .post(async (req, res) => {
    try {
      const newEmployee = await Employee.create(req.body);
      return res.status(200).json(newEmployee);
    } catch (err) {
      return res.status(500).json(err);
    }
  });

router
  .route("/employees/:id")
  .get(async (req, res) => {
    const employee = await Employee.findByPk(req.params.id);
    if (employee) {
      return res.status(200).json(employee);
    } else {
      return res
        .status(404)
        .json({ error: `Employee with id ${req.params.id} does not exist` });
    }
  })
  .put(async (req, res) => {
    const employee = await Employee.findByPk(req.params.id);
    if (employee) {
      return res.status(200).json(await employee.update(req.body));
    } else {
      return res
        .status(404)
        .json({ error: `Employee with id ${req.params.id} does not exist` });
    }
  })
  .delete(async (req, res) => {
    try {
      const employee = await Employee.findByPk(req.params.id);
      if (employee) {
        await employee.destroy();
        return res.status(200).json({ message: "Employee deleted" });
      } else {
        return res.status(404).json({ error: "Employee not found" });
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  });

module.exports = router;

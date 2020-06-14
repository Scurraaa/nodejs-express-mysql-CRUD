module.exports = app => {
	const students = require("../controllers/student.controllers.js")

	app.post("/students", students.create);

	app.get("/students", students.findAll);

	app.get("/students/:studentId", students.findOne);

	app.put("/students/:studentId", students.update);

	app.delete("/students/:studentId", students.delete);

	app.delete("/students", students.deleteAll);


};



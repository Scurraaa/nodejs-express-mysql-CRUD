module.exports = app => {
	const students = require("../controllers/student.controllers.js")

	app.post("/students", students.create)


};



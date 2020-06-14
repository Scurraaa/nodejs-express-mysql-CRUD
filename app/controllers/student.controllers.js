const Student = require("../models/student.model.js");

exports.create = (req,res) => {
	if (!req.body) {
		res.status(400).send({
			message: "Content can not be processed"
		});
	}

	const student = new Student({
		student_number: req.body.student_number,
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		email: req.body.email,
		enrolled: req.body.enrolled
});
	Student.create(student, (err, data) => {
		if (err)
			res.status(500).send({
				message:
				err.message || "Error Occured when creating a record for a student"});
		else res.send(data);
	});
};


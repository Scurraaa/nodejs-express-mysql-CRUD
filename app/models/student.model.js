const sql = require("./db.js");

const Student = function(student) {
	this.student_number = student.student_number;
	this.first_name = student.first_name;
	this.last_name = student.last_name;
	this.email = student.email;
	this.enrolled = student.enrolled;
};

Student.create = (newStudent, result) => {
	sql.query("INSERT INTO students SET ?", newStudent, (err, res) => {
		if (err){
			console.log("Error: ", err);
			result(err, null);
			return;
		}
		result(null, { message: `Student with ${newStudent.student_number} is successfully created`});
	});
}

Student.findById = (studentId, result) => {
	sql.query(`SELECT * FROM students WHERE student_number = {studentId}`, (err, res) => {
		if (err) {
			console.log("Error: ", err);
			result(err, null);
			return;
		}
		if (res.length) {
			console.log("Student Found", res[0]);
			result(null, res[0]);
			return;
		}

		result({ kind: "student with this student number is not found"}, null);
	});
}

Student.getAll = result => {
	sql.query("SELECT * FROM students", (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(null,err);
			return;
		}
		if(res) {
			console.log("List of Students: ", res);
			result(null, res);
			return;
		}
	});
};

Student.updateById = (studentId, student, result) => {
	sql.query("UPDATE students SET first_name = ?, last_name = ?, email = ?, enrolled = ?, WHERE student_number = ?", [student.first_name, student.last_name, student_email, student.enrolled, studentId], (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(null,err);
			return;
		}

		if(res.affectedRows == 0) {
			result({details: "Student not found"}, null);
			return;
		}

		console.log("update success!", res);
		result(null, res);
		return;
	});
};

Student.remove = (studentId, result) => {
	sql.query("DELETE FROM students WHERE student_number = ?", studentId, (err,res) => {
		if (err) {
			console.log("error: ", err);
			result(null, err);
			return;
		}
		
		if (res.affectedRows == 0) {
			result({ details: "student not found"}, null);
			return;
		}

		console.log("student record is successfully deleted");
		result(null, res);
	});
};

Student.removeAll = result => {
	sql.query("DELETE FROM students", (err,res) => {
		if (err) {
			console.log("error :", err);
			result(null, err);
			return;
		}

		console.log(`Deleted ${res.affectedRows} students`);
		result(null, res);
		return;
	});
};

module.exports = Student

const express = require('express');
const Classroom = require('../modals/Classroom');
const User = require('../modals/User');
const router = express.Router();

// Create classroom
router.post('/create', async (req, res) => {
  try {
    const { name, startTime, endTime, days, teacherId } = req.body;
    const existingUser = await User.findById(teacherId);
    if (existingUser) {
      const classroom = new Classroom({ name, startTime, endTime, days, teacher: teacherId });
      await classroom.save().then(() => res.status(200).json({ classroom }));
      existingUser.classroom.push(classroom);
      await existingUser.save();
    }
  } catch (error) {
    res.status(200).json({ message: "error occured while creating classroom" })
  }

});

// Assign student to classroom
router.post('/assign-student', async (req, res) => {
  try {
    const { classroomId, studentId } = req.body;
    const classroom = await Classroom.findById(classroomId);
    if (classroom) {
      classroom.students.push(studentId);
      await classroom.save().then(()=>{
        res.status(200).json({message: "Student assigned to classroom"})
      })
    }
  } catch (error) {
    res.status(200).json({ message: "error occured while adding students" })
  }
});

module.exports = router;

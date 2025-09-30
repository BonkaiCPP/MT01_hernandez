const express = require('express');
const studentController = require('../controllers/studentController');
const validators = require('../validators/studentValidators');

const router = express.Router();

router.post('/', validators.createOrUpdate, studentController.createStudent);
router.get('/', studentController.listStudents);
router.get('/:id', studentController.getStudentById);
router.put('/:id', validators.createOrUpdate, studentController.updateStudent);
router.delete('/:id', studentController.deleteStudent);

module.exports = router;
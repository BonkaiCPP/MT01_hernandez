const { validationResult } = require('express-validator');
const studentService = require('../services/studentService');

function handleValidation(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
}

exports.createStudent = async (req, res, next) => {
  try {
    const invalid = handleValidation(req, res);
    if (invalid) return;
    const { name, email, age } = req.body;
    const created = await studentService.create({ name, email, age });
    res.status(201).json(created);
  } catch (err) { next(err); }
};

exports.listStudents = async (req, res, next) => {
  try {
    const list = await studentService.list();
    res.json(list);
  } catch (err) { next(err); }
};

exports.getStudentById = async (req, res, next) => {
  try {
    const found = await studentService.getById(req.params.id);
    if (!found) return res.status(404).json({ error: 'Student not found' });
    res.json(found);
  } catch (err) { next(err); }
};

exports.updateStudent = async (req, res, next) => {
  try {
    const invalid = handleValidation(req, res);
    if (invalid) return;
    const { name, email, age } = req.body;
    const updated = await studentService.update(req.params.id, { name, email, age });
    if (!updated) return res.status(404).json({ error: 'Student not found' });
    res.json(updated);
  } catch (err) { next(err); }
};

exports.deleteStudent = async (req, res, next) => {
  try {
    const deleted = await studentService.remove(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Student not found' });
    res.json(deleted);
  } catch (err) { next(err); }
};



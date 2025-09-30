const { validationResult } = require('express-validator');
const studentService = require('../services/studentService');

function handleValidation(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
}

function stripMeta(entity) {
  if (!entity) return entity;
  const obj = typeof entity.toObject === 'function' ? entity.toObject() : entity;
  delete obj.createdAt;
  delete obj.updatedAt;
  delete obj.__v;
  return obj;
}

exports.createStudent = async (req, res, next) => {
  try {
    const invalid = handleValidation(req, res);
    if (invalid) return;
    const { name, email, age, course, hobby } = req.body;
    const created = await studentService.create({ name, email, age, course, hobby });
    res.status(201).json(stripMeta(created));
  } catch (err) { next(err); }
};

exports.listStudents = async (req, res, next) => {
  try {
    const list = await studentService.list();
    res.json(list.map(stripMeta));
  } catch (err) { next(err); }
};

exports.getStudentById = async (req, res, next) => {
  try {
    const found = await studentService.getById(req.params.id);
    if (!found) return res.status(404).json({ error: 'Student not found' });
    res.json(stripMeta(found));
  } catch (err) { next(err); }
};

exports.updateStudent = async (req, res, next) => {
  try {
    const invalid = handleValidation(req, res);
    if (invalid) return;
    const { name, email, age, course, hobby } = req.body;
    const updated = await studentService.update(req.params.id, { name, email, age, course, hobby });
    if (!updated) return res.status(404).json({ error: 'Student not found' });
    res.json(stripMeta(updated));
  } catch (err) { next(err); }
};

exports.deleteStudent = async (req, res, next) => {
  try {
    const deleted = await studentService.remove(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Student not found' });
    res.json(stripMeta(deleted));
  } catch (err) { next(err); }
};



const Student = require('../models/Student');

exports.create = async (data) => {
  const student = new Student(data);
  return await student.save();
};

exports.list = async () => {
  return await Student.find().lean();
};

exports.getById = async (id) => {
  return await Student.findById(id).lean();
};

exports.update = async (id, data) => {
  return await Student.findByIdAndUpdate(id, data, { new: true, runValidators: true }).lean();
};

exports.remove = async (id) => {
  return await Student.findByIdAndDelete(id).lean();
};



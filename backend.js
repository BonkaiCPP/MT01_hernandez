const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let items = [];
let nextId = 1;

let students = [];
let nextStudentId = 1;

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/items', (req, res) => {
  const { name, description } = req.body || {};
  if (!name) {
    return res.status(400).json({ error: 'name is required' });
  }
  const newItem = { id: nextId++, name, description: description || '' };
  items.push(newItem);
  res.status(201).json(newItem);
});

app.get('/api/items', (req, res) => {
  res.json(items);
});

app.get('/api/items/:id', (req, res) => {
  const id = Number(req.params.id);
  const item = items.find(i => i.id === id);
  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }
  res.json(item);
});

app.put('/api/items/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = items.findIndex(i => i.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }
  const { name, description } = req.body || {};
  if (!name) {
    return res.status(400).json({ error: 'name is required' });
  }
  items[index] = { id, name, description: description || '' };
  res.json(items[index]);
});

app.patch('/api/items/:id', (req, res) => {
  const id = Number(req.params.id);
  const item = items.find(i => i.id === id);
  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }
  const { name, description } = req.body || {};
  if (name !== undefined) item.name = name;
  if (description !== undefined) item.description = description;
  res.json(item);
});

app.delete('/api/items/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = items.findIndex(i => i.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }
  const [deleted] = items.splice(index, 1);
  res.json(deleted);
});

app.get('/students', (req, res) => {
  res.json(students);
});

app.get('/students/:id', (req, res) => {
  const id = Number(req.params.id);
  const student = students.find(s => s.id === id);
  if (!student) return res.status(404).json({ error: 'Student not found' });
  res.json(student);
});

app.post('/students', (req, res) => {
  const { name, course } = req.body || {};
  if (!name) return res.status(400).json({ error: 'name is required' });
  const student = { id: nextStudentId++, name, course: course || '' };
  students.push(student);
  res.status(201).json(student);
});

app.put('/students/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = students.findIndex(s => s.id === id);
  if (index === -1) return res.status(404).json({ error: 'Student not found' });
  const { name, course } = req.body || {};
  if (!name) return res.status(400).json({ error: 'name is required' });
  students[index] = { id, name, course: course || '' };
  res.json(students[index]);
});

app.patch('/students/:id', (req, res) => {
  const id = Number(req.params.id);
  const student = students.find(s => s.id === id);
  if (!student) return res.status(404).json({ error: 'Student not found' });
  const { name, course } = req.body || {};
  if (name !== undefined) student.name = name;
  if (course !== undefined) student.course = course;
  res.json(student);
});

app.delete('/students/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = students.findIndex(s => s.id === id);
  if (index === -1) return res.status(404).json({ error: 'Student not found' });
  const [deleted] = students.splice(index, 1);
  res.json(deleted);
});

app.use('/api', (req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`API server listening on http://localhost:${PORT}`);
});



const express = require('express');
const app = express();
app.use(express.json());

// Base de datos en memoria
let users = [
  { id: 1, nombre: 'Ana', email: 'ana@test.com' },
  { id: 2, nombre: 'Carlos', email: 'carlos@test.com' }
];

// GET: Obtener todos los usuarios
app.get('/api/users', (req, res) => {
  res.json(users);
});

// GET: Obtener un usuario por ID
app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (user) res.json(user);
  else res.status(404).json({ error: 'Usuario no encontrado' });
});

// POST: Crear un nuevo usuario
app.post('/api/users', (req, res) => {
  const newUser = {
    id: users.length + 1,
    nombre: req.body.nombre,
    email: req.body.email
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// DELETE: Eliminar un usuario
app.delete('/api/users/:id', (req, res) => {
  users = users.filter(u => u.id !== parseInt(req.params.id));
  res.json({ message: 'Usuario eliminado' });
});

app.listen(4001, () => {
  console.log('🚀 Servidor corriendo en http://localhost:4001');
});

/////////////////////////////////////////////////////////////

let products = [
  { id: 1, nombre: 'Laptop', precio: 2500000, categoria: 'tecnologia' },
  { id: 2, nombre: 'Mouse', precio: 50000, categoria: 'tecnologia' }
];

app.get('/api/products', (req, res) => res.json(products));

app.post('/api/products', (req, res) => {
  const newProduct = { id: products.length + 1, ...req.body };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.delete('/api/products/:id', (req, res) => {
  products = products.filter(p => p.id !== parseInt(req.params.id));
  res.json({ message: 'Producto eliminado' });
});

//////////////////////////////////////////////////////////////////////////

let orders = [];

app.get('/api/orders', (req, res) => res.json(orders));

app.post('/api/orders', (req, res) => {
  const newOrder = {
    id: orders.length + 1,
    ...req.body,
    fecha: new Date().toISOString(),
    estado: 'pendiente'
  };
  orders.push(newOrder);
  res.status(201).json(newOrder);
});

app.put('/api/orders/:id', (req, res) => {
  const order = orders.find(o => o.id === parseInt(req.params.id));
  if (order) {
    Object.assign(order, req.body);
    res.json(order);
  } else {
    res.status(404).json({ error: 'Orden no encontrada' });
  }
});


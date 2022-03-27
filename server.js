const express = require('express');
const { insertCurso, getCursos, updateCurso, deleteCurso } = require('./queries');
const app = express();
const port = 3000;

// Middlewares
app.use(express.static('public'));
app.use(express.json());

// Routes
app.post('/curso', async (req, res) => {
    const { nombre, nivelTecnico, fechaInicio, duracion } = req.body;
    const respuesta = await insertCurso(nombre, nivelTecnico, fechaInicio, duracion);
    res.send(respuesta);
});

app.get('/cursos', async (req, res) => {
    const respuesta = await getCursos();
    res.send(respuesta);
});

app.put('/curso', async (req, res) => {
    const { id, nombre, nivelTecnico, fechaInicio, duracion } = req.body;
    const respuesta = await updateCurso(id, nombre, nivelTecnico, fechaInicio, duracion);
    res.send(respuesta);
});

app.delete('/cursos/:id', async (req, res) => {
    const { id } = req.params;
    const respuesta = await deleteCurso(id);
    respuesta > 0 ? res.send(`El curso id ${id} fue eliminado con éxito.`) : res.send('No existe un curso registrado con ese id');
});

app.listen(port, () => console.log(`Server initialized at port ${port}.`));
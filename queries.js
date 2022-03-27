const { Pool } = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: '0000',
    database: 'cursos',
    port: 5432
});

const insertCurso = async(nombre, nivel, fecha, duracion) => {
    try {
        const result = await pool.query(`INSERT INTO cursos (nombre, nivel, fecha, duracion) values ('${nombre}', '${nivel}', '${fecha}', '${duracion}') RETURNING*`);
        return result.rows;
    } catch (error) {
        return error;
    }
};

const getCursos = async() => {
    try {
        const result = await pool.query(`SELECT * FROM cursos`);
        return result.rows;
    } catch (error) {
        return error;
    }
};

const updateCurso = async(id, nombre, nivelTecnico, fechaInicio, duracion) => {
    try {
        const result = await pool.query(`UPDATE cursos SET nombre = '${nombre}', nivel = '${nivelTecnico}', fecha = '${fechaInicio}', duracion = '${duracion}'  WHERE id = '${id}' RETURNING*`);
        return result.rows;
    } catch (error) {
        return error;
    }
};

const deleteCurso = async(id) => {
    try {
        const result = await pool.query(`DELETE FROM cursos WHERE id = '${id}'`);
        return result.rowCount;
    } catch (error) {
        return error;
    }
};

module.exports = {
    insertCurso,
    getCursos,
    updateCurso,
    deleteCurso
};
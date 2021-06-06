const PostgresService = require('../../services/postgres.service');
const _pg = new PostgresService();

const getPersonas = async (req, res) => {
    let sql = `select * from Personas`;
    try {
        let result = await _pg.executeSql(sql);
        return res.send(result.rows);
    } catch (error) {
        console.log(error);
        return res.send({ ok: false, message: "Error consultando los usuarios", content: error, });
    }
};

const getPersona = async (req, res) => {
    let persona = req.body;
    let sql = `select * from Personas where id_persona = ${persona.id_persona}`;
    try {
        let result = await _pg.executeSql(sql);
        return res.send(result.rows);
    } catch (error) {
        console.log(error);
        return res.send({ ok: false, message: "Error consultando el usuario", content: error, });
    }
};

const createPersona = async (req, res) => {
    try {
        let persona = req.body;
        let sql = `insert into Personas (nombre, apellidos, id_tipo, identificacion, correo, 
            password, celular, id_rol) values('${persona.nombre}', '${persona.apellidos}', 
            ${persona.id_tipo}, '${persona.identificacion}', '${persona.correo}', '${persona.password}', 
            '${persona.celular}', ${persona.id_rol})`;
        let result = await _pg.executeSql(sql);
        return res.send({ ok: result.rowCount == 1, message: result == 1 ? "El usuario no fue creado" : "Usuario creado", content: persona, });
    } catch (error) {
        console.log(error);
        return res.send({ ok: false, message: "Error creado el usuario", content: error, });
    }
};

const updatePersona = async (req, res) => {
    let persona = req.body;
    let sql = `select * from Personas where id_persona = ${persona.id_persona}`;
    let result = await _pg.executeSql(sql);
    if (result.rowCount != 1) {
        return res.send("El usuario no existe");
    } else {
        let sqlUpdate = `update Personas set nombre='${persona.nombre}', apellidos = '${persona.apellidos}',
        id_tipo = ${persona.id_tipo}, identificacion = '${persona.identificacion}', correo = '${persona.correo}',
         password = '${persona.password}', celular = '${persona.celular}' where id_persona = ${persona.id_persona};
        `;
        try {
            let resultUpdate = await _pg.executeSql(sqlUpdate);
            return res.send({ ok: true, message: "Usuario actuaizado", content: resultUpdate.rows, });
        } catch (error) {
            console.log(error);
            return res.send({ ok: false, message: "Error actualizando el usuario", content: error, });
        }
    }
};

const deletePersona = async (req, res) => {
    let persona = req.body;
    let sql = `select * from Personas where id_persona = ${persona.id_persona}`;
    let result = await _pg.executeSql(sql);
    if (result.rowCount != 1) {
        return res.send("El usuario no existe");
    } else {
        let sqlDelete = `delete from Personas where id_persona = ${persona.id_persona}`;
        try {
            let resultDelete = await _pg.executeSql(sqlDelete);
            return res.send({ ok: true, message: "Usuario eliminado", content: resultDelete.rows, });
        } catch (error) {
            console.log(error);
            return res.send({ ok: false, message: "Error eliminando el usuario", content: error, });
        }
    }
};

module.exports = { getPersona, getPersonas, createPersona, updatePersona, deletePersona };
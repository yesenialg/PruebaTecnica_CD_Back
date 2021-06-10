const PostgresService = require('../../services/postgres.service');
const _pg = new PostgresService();

const getPersonas = async (req, res) => {
    let sql = `select personas.id_persona, personas.nombre, personas.apellidos, roles.nombre as rol, tiposidentificacion.name as id_Tipo, 
    personas.identificacion, personas.correo, personas.celular from personas inner join roles on personas.id_rol = roles.id_rol 
    inner join tiposidentificacion on tiposidentificacion.id_tipo = personas.id_tipo`;
    try {
        let result = await _pg.executeSql(sql);

        return res.send({ ok: true, message: "Usuarios consultados", content: result.rows});
    } catch (error) {
        console.log(error);
        return res.send({ ok: false, message: "Error consultando los usuarios", content: error, });
    }
};

const getPersona = async (req, res) => {
    let id = req.params.id;
    let sql = `select id_persona, personas.nombre as nombres, personas.apellidos, roles.nombre as rol, 
    tiposidentificacion.name as id_tipo, personas.identificacion as numeroId, personas.correo, personas.password, 
    personas.celular from personas inner join roles on personas.id_rol = roles.id_rol 
    inner join tiposidentificacion on tiposidentificacion.id_tipo = personas.id_tipo where id_persona = ${id} limit 1`;
    try {
        let result = await _pg.executeSql(sql);
        return res.send({ ok: false, message: "Usuario consultado", content: result.rows, });
    } catch (error) {
        console.log(error);
        return res.send({ ok: false, message: "Error consultando el usuario", content: error, });
    }
};

const createPersona = async (req, res) => {
    try {
        let persona = req.body;
        let sql = `insert into Personas (nombre, apellidos, id_tipo, identificacion, correo, 
            password, celular, id_rol) values('${persona.nombres}', '${persona.apellidos}', 
            ${persona.tipoId}, '${persona.numeroId}', '${persona.correo}', md5('${persona.password}'), 
            '${persona.celular}', ${persona.rol})`;
        let result = await _pg.executeSql(sql);
        return res.send({ ok: result.rowCount == 1, message: result == 1 ? "El usuario no fue creado" : "Usuario creado", content: persona, });
    } catch (error) {
        console.log(error);
        return res.send({ ok: false, message: "Error creado el usuario", content: error, });
    }
};

const updatePersona = async (req, res) => {
    let id = req.params.id;
    let persona = req.body;
    let sql = `select * from Personas where id_persona = ${id}`;
    let result = await _pg.executeSql(sql);
    if (result.rowCount != 1) {
        return res.send("El usuario no existe");
    } else {
        let sqlUpdate = `update Personas set nombre='${persona.nombres}', apellidos = '${persona.apellidos}',
        id_tipo = ${persona.id_tipo}, identificacion = '${persona.numeroid}', correo = '${persona.correo}',
         celular = '${persona.celular}',id_rol = ${persona.rol} where id_persona = ${id};
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
    let id = req.params.id;
    let persona = req.body;
    let sql = `select * from Personas where id_persona = ${id}`;
    let result = await _pg.executeSql(sql);
    if (result.rowCount != 1) {
        return res.send("El usuario no existe");
    } else {
        let sqlDelete = `delete from Personas where id_persona = ${id}`;
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
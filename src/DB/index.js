import * as SQLite from "expo-sqlite"

let db

export const initDB = async () => {
    if (!db) {
        db = await SQLite.openDatabaseAsync("Tienda.db")
    }
}

export const initSessionTable = async () => {
    //console.log("iniciando tabla de sesiones")
    await initDB();
    await db.execAsync(`
    CREATE TABLE IF NOT EXISTS session (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    localId TEXT,
    email TEXT
);

    `)
}

export const saveSession = async (localId, email) => {
    await initDB();
    await db.runAsync(`DELETE FROM session`) //ESTO elimina la tabla entera lo correcto deberia ser utilizar un where con el identificador del id que se quiere eliminar
    await db.runAsync(`INSERT INTO session (localId, email) VALUES(?,?);`, [localId, email])
}

export const getSession = async () => {
    await initDB();
    const result = await db.getAllAsync(`SELECT * FROM session LIMIT 1`); // en este caso no hay validaciones. Esto es una mala practica ya que faltan validaciones.
    // console.log("resultado del getSession",result)
    return result.length > 0 ? result[0] : null;
}

export const clearSession = async () => {
    await initDB()
    await db.runAsync(`DELETE FROM session`)// aca se vuelve a borrar la tabla simplemente por cuestiones practicas.. lo correcto es usar where e indicar con el id que se esta eliminando de la tabla
}
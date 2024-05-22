// Importa las bibliotecas necesarias
const sqlite3 = require('sqlite3').verbose(); // Biblioteca para interactuar con SQLite
const path = require('path'); // Módulo para manejar y transformar rutas de archivos
const fs = require('fs'); // Módulo del sistema de archivos para operaciones como la escritura de logs
const { app } = require('electron'); // Módulo de Electron para acceder a propiedades de la aplicación
const { promisify } = require('util'); // Modulo de Node para promisificar

// Obtiene la ruta del directorio de datos del usuario para la aplicación
const userDataPath = app.getPath('userData');

// Nombre del archivo de la base de datos
const dbFileName = 'database.db';

// Ruta completa del archivo de la base de datos dentro del directorio de datos del usuario
const dbDestinationPath = path.join(userDataPath, dbFileName);

// Obtiene la fecha actual para nombrar el archivo de log
const currentDate = new Date();
const dateString = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
const logDirectory = path.join(userDataPath, 'logs'); // Ruta de la carpeta de logs
const logFileName = `${dateString} Log.txt`; // Nombre del archivo de log
const logFilePath = path.join(logDirectory, logFileName); // Ruta completa del archivo de log

// Crea la carpeta de logs si no existe
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory, { recursive: true });
}

// Abre el archivo de log en modo de escritura, creando uno nuevo si no existe
const logStream = fs.createWriteStream(logFilePath, { flags: 'a' });

// Función para registrar logs con fecha y hora en el archivo de log
const logToFile = (message) => {
  const timestamp = new Date().toLocaleString(); 
  logStream.write(`${timestamp}: ${message}\n`);
};

// Conectar a la base de datos
const db = new sqlite3.Database(dbDestinationPath, (err) => {
  if (err) {
    logToFile('Error opening database: ' + err);
  } else {
    logToFile('Database connected at ' + dbDestinationPath);

    // Inicializar tablas
    initializeTables();
  }
});

// Promisificar métodos de la base de datos
db.run = promisify(db.run);
db.get = promisify(db.get);
db.all = promisify(db.all);

// Función para inicializar tablas
const initializeTables = async () => {
  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT
    )
  `;

 
  try {
    await db.run(createUsersTable);
    logToFile('Users table created or already exists');
  } catch (err) {
    logToFile('Error initializing tables: ' + err);
  }
};

module.exports = db; // Exporta la conexión a la base de datos para su uso en otros módulos

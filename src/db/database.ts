import SQLite, { SQLiteDatabase } from 'react-native-sqlite-storage';
import { Origin, RegisterType, WaterConsumptionProps } from './types';
import { format } from 'date-fns';

SQLite.enablePromise(true);

let db: SQLiteDatabase;

async function openDB() {
  if (db) return db; // reutiliza conexão se já estiver aberta
  db = await SQLite.openDatabase({
    name: 'todrinkwater.db',
    location: "default",
  });
  return db;
};

async function createTable() {
  const database = await openDB();
  const query = `
    CREATE TABLE IF NOT EXISTS Consumption (
      id TEXT PRIMARY KEY,
      quantity INTEGER NOT NULL,
      created_at DATETIME,
      formatted_date TEXT,
      register_type TEXT,
      origin TEXT,
      excluded BOOLEAN
    );
  `;
  await database.executeSql(query);
};

interface InsertConsumptionProps {
  quantity: number;
  formattedDate: string;
  registerType: RegisterType;
  origin: Origin;
  excluded?: boolean
}
async function insertConsumption({ formattedDate, quantity, registerType, origin, excluded = false }: InsertConsumptionProps) {
  const database = await openDB();
  const id = Math.random().toString(36).substring(2, 15 + 2);
  const atualDate = format(new Date(), "yyyy-MM-dd kk:mm:ss")

  const query = `
    INSERT INTO Consumption (id, quantity, created_at, formatted_date, register_type, origin, excluded)
    VALUES (?, ?, ?, ?, ?, ?, ?);
  `;

  try {
    await database.executeSql(query, [id, quantity, atualDate, formattedDate, registerType, origin, excluded]);
  } catch (e) {
    console.log(e)
  }
};

async function insertConsumptionFromConnectivity(props: WaterConsumptionProps): Promise<void> {
  const { formatted_date, quantity, register_type, origin, id, created_at, excluded } = props;
  const database = await openDB();

  const query = `
    INSERT INTO Consumption (id, quantity, created_at, formatted_date, register_type, origin, excluded)
    VALUES (?, ?, ?, ?, ?, ?, ?);
  `;
  try {
    await database.executeSql(query, [id, quantity, created_at, formatted_date, register_type, origin, excluded]);
  } catch (e) {
    console.log(e)
  }
};

async function backupToNewTable(): Promise<WaterConsumptionProps[]> {
  const database = await openDB();
  const query = `
    SELECT * FROM WaterConsumption ORDER BY created_at DESC;
  `;
  const [results] = await database.executeSql(query);
  const consumptions: WaterConsumptionProps[] = [];
  for (let i = 0; i < results.rows.length; i++) {
    consumptions.push(results.rows.item(i));
  }

  for (let b = 0; b < consumptions.length; b++) {
    const register = consumptions[b];
    const queryInsert = `
      INSERT INTO Consumption (id, quantity, created_at, formatted_date, register_type, origin, excluded)
      VALUES (?, ?, ?, ?, ?, ?, ?);
    `;
    await database.executeSql(queryInsert, [register.id, register.quantity, register.created_at, register.formatted_date, register.register_type, register.origin, false]);
  }

  const deleteQuery = 'DELETE FROM WaterConsumption';
  await database.executeSql(deleteQuery)
  return consumptions;
};

interface GetConsumptionPerDayProps {
  formattedDate: string;
}
async function getConsumptionPerDay({ formattedDate }: GetConsumptionPerDayProps): Promise<WaterConsumptionProps[]> {
  const database = await openDB();
  const query = `
    SELECT * FROM Consumption 
    WHERE formatted_date = ? AND excluded = ?
    ORDER BY created_at DESC;
  `;
  const [results] = await database.executeSql(query, [formattedDate, false]);
  const consumptions = [];
  for (let i = 0; i < results.rows.length; i++) {
    consumptions.push(results.rows.item(i));
  }
  return consumptions;
};

interface ConsumptionExistsProps {
  createdAt: string;
}
async function consumptionExists({ createdAt }: ConsumptionExistsProps): Promise<boolean> {
  const database = await openDB();
  const query = `
    SELECT 1 FROM Consumption
    WHERE created_at = ? LIMIT 1
  `;
  const [results] = await database.executeSql(query, [createdAt]);
  return results.rows.length > 0
}

export const database = {
  openDB,
  createTable,
  backupToNewTable,
  insertConsumption,
  getConsumptionPerDay,
  consumptionExists,
  insertConsumptionFromConnectivity
}
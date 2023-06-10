import * as SQLite from "expo-sqlite";
function openDatabase() {
  if (Platform.OS === "web") {
    return {
      transaction: () => {
        return {
          executeSql: () => { },
        };
      },
    };
  }

  const db = SQLite.openDatabase("db.db");
  db.transaction((tx) => {
    tx.executeSql("create table if not exists sales (id integer primary key not null, products text, payment_method text, value real, create_at text default current_timestamp)");
    tx.executeSql("create table if not exists products (id integer primary key not null, code int, name text, price real, measurement text)");
  }, (error) => console.log(error));
  return db;
}

export default db = openDatabase();
import React, { useEffect, useState } from 'react';
import Container from '../components/Container';
import { Title } from '../components/Title';
import { Input } from '../components/Input';
import PressableButton from '../components/Button';
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
  return db;
}

const db = openDatabase();
const Product = () => {
  const [name, setName] = useState(null);
  const [code, setCode] = useState(null);
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists products (id integer primary key not null, code int, name text);"
      );
    });
  }, []);

  const add = ({name, code}) => {
    if (!name || !code) {
      return false;
    }
    db.transaction(
      (tx) => {
        tx.executeSql("insert into products (code, name) values (0, ?)", [code,name]);
        setCode(null)
        setName(null)
        console.log('click add', name, code)
        tx.executeSql("select * from products", [], (_, { rows }) =>
          console.log(JSON.stringify(rows))
        );
      },
      null
    );
  };

  return (
    <Container>
      <Title>Cadastrar Produto</Title>
      <Input placeholder='Nome' value={name} onChangeText={(text) => setName(text)} />
      <Input placeholder='Código' value={code} onChangeText={(text) => setCode(text)} />
      <PressableButton title={'Salvar'} onPress={() => add({name, code})}></PressableButton>
    </Container>
  )
}
export default Product
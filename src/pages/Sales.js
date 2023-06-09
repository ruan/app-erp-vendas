import React, { useEffect, useState } from 'react';
import Container from '../components/Container';
import { Title } from '../components/Title';
import { ListSales } from '../components/ListSales';
import database from '../database';

const Sales = () => {
  const [sales, setSales] = useState([]);

  const getSales = () => {
    database.transaction((tx) => {
      tx.executeSql(`select * from sales order by create_at desc`, [], (_, { rows }) => {
        setSales(rows._array.map(sell => ({ ...sell, products: JSON.parse(sell.products)})))
      });

    }, error => console.log('Error Get Sales', error))
  }

  useEffect(() => {
    getSales()
  },[])
  return (
    <Container>
      <ListSales items={sales}></ListSales>
    </Container>
  )
}
export default Sales
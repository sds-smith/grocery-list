import { useState } from 'react';
import Header from './components/Header';
import List from './components/List';
import BottomAppBar from './components/BottomAppBar';
import './App.css';

function App() {
  const [listItems, setListItems] = useState({});

  const total = Object.values(listItems).reduce((acc, curr) => acc + (curr.quantity * curr.price), 0)

  return (
    <>
      <Header setListItems={setListItems} />
      <List listItems={listItems} />
      <BottomAppBar total={total}/>
    </>
  )
}

export default App

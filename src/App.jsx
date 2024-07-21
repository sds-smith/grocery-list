import { useState, useEffect } from 'react';
import Header from './components/Header';
import List from './components/List';
import BottomAppBar from './components/BottomAppBar';
import './App.css';
import { getSections, getItems, getList, updateList } from './utils/firebase';
import AdminPanel from './components/AdminPanel';
import CustomModal from './components/CustomModal';

const TOGGLE_VIEW = {
  Admin: 'List',
  List: 'Admin'
}

function App() {
  const [view, setView] = useState('List')
  const [sections, setSections] = useState(null);
  const [items, setItems] = useState(null);
  const [listItems, setListItems] = useState(null);
  const [listId, setListId] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const total = !listItems ? 0 : Object.values(listItems)
    .reduce((acc, curr) => {
      return !curr.quantity || !curr.price ? acc : acc + (curr.quantity * curr.price) 
    }, 0)
    .toFixed(2);

  const toggleView = () => setView(prevView => TOGGLE_VIEW[prevView]);

  const handleUpdateList = (selected, quantity, notes) => {
    const itemToAdd = {
      ...items[selected],
      quantity
    };
    if (notes) itemToAdd.notes = notes;

    setListItems(prevListItems => ({
      ...prevListItems,
      [selected] : itemToAdd
    }));
  }

  const handleOpenModal = (action, payload) => setOpenModal({action, payload});
  const handleCloseModal = () => setOpenModal(false);

  const archiveList = () => {
    setListItems(prevList => ({
      ...prevList,
      isArchived: true
    }))
  }

  useEffect(() => {
    if (listItems) updateList(listItems, listId)
  }, [listItems, listId])

  useEffect(() => {
   if (!sections) {
    getSections().then(setSections)
   }
  }, [sections])
  
  useEffect(() => {
   if (!items) {
    getItems().then(setItems)
   }
  }, [items])
    
  useEffect(() => {
    if (!listItems) {
     getList().then(list => {
      setListItems(list.listItems)
      setListId(list.listId)
     })
    }
   }, [listItems])

  return (
    <>
      <Header items={items || {}} handleUpdateList={handleUpdateList} view={view} toggleView={toggleView} />
      { view === "Admin"
        ? <AdminPanel sections={sections} setItems={setItems} numItems={Object.entries(items).length} />
        : <List listItems={listItems || {}} sections={sections} handleOpenModal={handleOpenModal} />
      }
      <CustomModal
        open={openModal}
        handleClose={handleCloseModal}
        setListItems={setListItems}
      />
      <BottomAppBar total={total} archiveList={archiveList} view={view}/>
    </>
  )
}

export default App

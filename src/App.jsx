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
  const [view, setView] = useState('List');
  const [openModal, setOpenModal] = useState(false);

  const [sections, setSections] = useState(null);
  const [items, setItems] = useState(null);
  const [listItems, setListItems] = useState(null);
  const [listId, setListId] = useState(null);

  const total = !listItems ? 0 : Object.values(listItems)
    .reduce((acc, curr) => acc + (curr.quantity * curr.price), 0).toFixed(2);

  const toggleView =  () => setView(prevView => TOGGLE_VIEW[prevView]);

  const handleUpdateList = async (selected, quantity, notes) => {
    if (quantity === 0) {
      const newListItems = { ...listItems };
      delete newListItems[selected];

      await updateList(newListItems, listId);

      setListItems(prevListItems => {
        const newListItems = { ...prevListItems };
        delete newListItems[selected];
        return newListItems;
      })
    } else {
      const newOrUpdatedItem = {
        ...items[selected],
        quantity
      };
      if (notes) {
        newOrUpdatedItem.notes = notes 
      } 
      await updateList({...listItems, [newOrUpdatedItem.id]:newOrUpdatedItem}, listId)
  
      setListItems(prevListItems => ({
        ...prevListItems,
        [selected] : newOrUpdatedItem
      }));
    }
  }

  const handleOpenModal = (action, payload) => setOpenModal({action, payload});
  const handleCloseModal = () => setOpenModal(false);

  const archiveList = async () => {
    await updateList({ ...listItems, isArchived: true }, listId)

    setListItems(prevList => ({
      ...prevList,
      isArchived: true
    }))
  }

  useEffect(() => {
   if (!sections) getSections().then(setSections)
  }, [sections])
  
  useEffect(() => {
   if (!items) getItems().then(setItems)
  }, [items])
    
  useEffect(() => {
    if (!listItems) getList().then(list => {
      setListItems(list.listItems)
      setListId(list.listId)
     })
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
        handleUpdateList={handleUpdateList}
      />
      <BottomAppBar total={total} archiveList={archiveList} view={view}/>
    </>
  )
}

export default App

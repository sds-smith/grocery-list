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

  const [loadingSections, setLoadingSections] = useState(false);
  const [loadingItems, setLoadingItems] = useState(false);
  const [loadingListItems, setLoadingListItems] = useState(false);

  const total = !listItems ? 0 : Object.values(listItems)
    .reduce((acc, curr) => acc + (curr.quantity * curr.price), 0).toFixed(2);

  const toggleView =  () => setView(prevView => TOGGLE_VIEW[prevView]);

  const handleUpdateList = async (selected, quantity, notes) => {
    const itemToAdd = {
      ...items[selected],
      quantity
    };
    if (notes) itemToAdd.notes = notes;

    await updateList({...listItems, [itemToAdd.id]:itemToAdd}, listId)

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
   if (!sections && !loadingSections) {
    setLoadingSections(true)
    getSections().then(setSections).finally(setLoadingSections(false))
   }
  }, [loadingSections, sections])
  
  useEffect(() => {
   if (!items && !loadingItems) {
    setLoadingItems(true)
    getItems().then(setItems).finally(setLoadingItems(false))
   }
  }, [items, loadingItems])
    
  useEffect(() => {
    if (!listItems && !loadingListItems) {
      setLoadingListItems(true)
     getList().then(list => {
      setListItems(list.listItems)
      setListId(list.listId)
     }).finally(setLoadingListItems(false))
    }
   }, [listItems, loadingListItems])

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

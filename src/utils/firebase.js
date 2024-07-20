import { initializeApp } from 'firebase/app'

import { 
    getFirestore, 
    doc, 
    collection,
    writeBatch,
    query,
    getDocs,
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCNB_LBLSIVidmySagkyR-KZy4nQTZE9ww",
  authDomain: "grocery-list-6d5b9.firebaseapp.com",
  projectId: "grocery-list-6d5b9",
  storageBucket: "grocery-list-6d5b9.appspot.com",
  messagingSenderId: "103899743396",
  appId: "1:103899743396:web:b973d4e7014e583e599231"
};

initializeApp(firebaseConfig);

export const db = getFirestore()

const today = new Date().toISOString();

export const addItem = async ( objectToAdd, numItems ) => {
  const collectionRef = collection(db, 'items')
  const batch = writeBatch(db)

  const id = `I${numItems + 1}`

  const docRef = doc(collectionRef, objectToAdd.name.toLowerCase())
  batch.set(docRef, {...objectToAdd, id})

  await batch.commit()
  console.log('done')
  return {...objectToAdd, id}
}

export const updateList = async ( updatedList, listKey = today ) => {
  console.log({listKey})
  const collectionRef = collection(db, 'lists')
  const batch = writeBatch(db)

  const docRef = doc(collectionRef, listKey)
  batch.set(docRef, {...updatedList, id: listKey})

  await batch.commit()
  console.log('done')
}

export const addCollectionAndDocuments = async ( collectionKey, objectsToAdd ) => {
  const collectionRef = collection(db, collectionKey)
  const batch = writeBatch(db)

  objectsToAdd.forEach((object) => {
      const docRef = doc(collectionRef, object.name.toLowerCase())
      batch.set(docRef, object)
  })    
  await batch.commit()
  console.log('done')
}

export const getSections = async () => {
  const collectionRef = collection(db, 'sections')
  const q = query(collectionRef)

  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.reduce((sections, docSnapshot) => {
        const data = docSnapshot.data()
        return {
            ...sections,
            [data.id] : data
        }
  },{})
}

export const getItems = async () => {
  const collectionRef = collection(db, 'items')
  const q = query(collectionRef)

  const querySnapshot = await getDocs(q)

  return querySnapshot.docs.reduce((items, docSnapshot) => {
        const data = docSnapshot.data()
        return {
            ...items,
            [data.id] : data
        }
  },{})
}

export const getList = async () => {
  const collectionRef = collection(db, 'lists')
  const q = query(collectionRef)

  const querySnapshot = await getDocs(q)

  return querySnapshot.docs.reduce((_acc, docSnapshot) => {
    const doc = docSnapshot.data()
    const listId = doc.id;
    delete doc.id;
    return {
      listId,
      listItems: doc
    };
  },{}) || {}
}
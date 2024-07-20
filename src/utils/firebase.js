import { initializeApp } from 'firebase/app'

import { 
    getFirestore, 
    doc, 
    collection,
    writeBatch,
    query,
    where,
    getDocs,
} from 'firebase/firestore';

import firebaseConfig from '../lib/firebaseConfig';

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
  const q = query(collectionRef, /*where('isArchived', '!=', true)*/)

  const querySnapshot = await getDocs(q)
console.log('[getList] querySnapshot.docs.data()',querySnapshot.docs.map(docSnapshot=>docSnapshot.data()))
  return querySnapshot.docs.reduce((_acc, docSnapshot) => {
    const doc = docSnapshot.data()
    const listId = doc.id;
    delete doc.id;
    if (Object.prototype.hasOwnProperty.call(doc, 'isArchived')) delete doc.isArchived;
    return {
      listId,
      listItems: doc
    };
  },{}) || {}
}
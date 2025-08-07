// productsService.js
import { db } from '../firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc, 
  doc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';

// Obtener todos los productos
export const getProducts = async () => {
  const querySnapshot = await getDocs(collection(db, 'products'));
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

// Obtener un producto por ID
export const getProductById = async (id) => {
  const docRef = doc(db, 'products', id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
};

// Agregar un nuevo producto
export const addProduct = async (productData) => {
  const docRef = await addDoc(collection(db, 'products'), productData);
  return docRef.id;
};

// Actualizar un producto
export const updateProduct = async (id, productData) => {
  await updateDoc(doc(db, 'products', id), productData);
};

// Eliminar un producto
export const deleteProduct = async (id) => {
  await deleteDoc(doc(db, 'products', id));
};
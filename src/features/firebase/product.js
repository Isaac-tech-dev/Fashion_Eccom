import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";

export const getProducts = async () => {
  try {
    const productsRef = collection(db, "products");
    const productSnapShot = await getDocs(productsRef);
    const products = productSnapShot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return products;
  } catch (error) {
    console.error(error);
  }
};


//export const getProductsId
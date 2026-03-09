import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db, hasFirebaseConfig } from "../lib/firebase";

const COLLECTION_NAME = "certificateUsers";

export async function addCertificateUser(name, email = "") {
  if (!hasFirebaseConfig || !db) {
    throw new Error("Firebase is not configured. Add VITE_FIREBASE_* values.");
  }

  const trimmedName = name.trim();
  const trimmedEmail = email.trim();

  if (!trimmedName) {
    throw new Error("Name is required.");
  }

  await addDoc(collection(db, COLLECTION_NAME), {
    name: trimmedName,
    email: trimmedEmail,
    createdAt: serverTimestamp(),
  });
}

export async function getCertificateUsers() {
  if (!hasFirebaseConfig || !db) {
    return [];
  }

  const q = query(collection(db, COLLECTION_NAME), orderBy("name", "asc"));
  const snap = await getDocs(q);

  return snap.docs
    .map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name || "",
        email: data.email || "",
      };
    })
    .filter((user) => user.name);
}

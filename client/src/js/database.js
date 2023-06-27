import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Logic to accept content and add to DB
export const putDb = async (content) => {
// DB and DB Version
const jateDB = await openDB("jate", 1);

// New transaction with DB name and privileges
const transact = jateDB.transaction("jate", "readwrite");

// Opens object store
const store = transact.objectStore("jate");

// Updates data in database
const req = store.put({ id: 1, value: content });

// Confirms that data has been added to DB
const res = await req;
console.log('Data saved to DB', res);
};

// Logic that gets all content from the database
export const getDb = async () => {

// Open DB and DB Version
const jateDb = await openDB("jate", 1);

// New DB transaction and privileges
const transact = jateDb.transaction("jate", "readonly");

// Opens object store
const store = transact.objectStore("jate");

// Gets all data from DB
const req = store.getAll();

// Confirms and returns data
const res = await req;
console.log("Data read from DB", res);
return res.value;
}

initdb();

// ============================================================
// IndexedDB Database Layer for 外校单词小达人
// ============================================================

const DB_NAME = 'VocabAppDB';
const DB_VERSION = 1;

let dbInstance = null;

/**
 * Open (or create) the IndexedDB database.
 * Returns a promise that resolves to the DB instance.
 */
export function openDB() {
  if (dbInstance) return Promise.resolve(dbInstance);

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      // Words store: key = id (number)
      if (!db.objectStoreNames.contains('words')) {
        const wordsStore = db.createObjectStore('words', { keyPath: 'id' });
        wordsStore.createIndex('grade', 'grade', { unique: false });
        wordsStore.createIndex('unit', 'unit', { unique: false });
        wordsStore.createIndex('grade_unit', ['grade', 'unit'], { unique: false });
      }

      // Books store: key = id (string, e.g. "joinin1")
      if (!db.objectStoreNames.contains('books')) {
        db.createObjectStore('books', { keyPath: 'id' });
      }

      // Units store: key = composite "bookId|unitId"
      if (!db.objectStoreNames.contains('units')) {
        db.createObjectStore('units', { keyPath: 'key' });
      }

      // Progress store: key = key string
      if (!db.objectStoreNames.contains('progress')) {
        db.createObjectStore('progress', { keyPath: 'key' });
      }
    };

    request.onsuccess = (event) => {
      dbInstance = event.target.result;
      resolve(dbInstance);
    };

    request.onerror = (event) => {
      console.error('IndexedDB error:', event.target.error);
      reject(event.target.error);
    };
  });
}

// ==================== Word Operations ====================

/**
 * Bulk-insert words into the database.
 */
export function insertWords(words) {
  return openDB().then(db => {
    return new Promise((resolve, reject) => {
      const tx = db.transaction('words', 'readwrite');
      const store = tx.objectStore('words');
      words.forEach(w => store.put(w));
      tx.oncomplete = () => resolve();
      tx.onerror = (e) => reject(e.target.error);
    });
  });
}

/**
 * Get all words for a given book (by grade number).
 */
export function getWordsByGrade(grade) {
  return openDB().then(db => {
    return new Promise((resolve, reject) => {
      const tx = db.transaction('words', 'readonly');
      const store = tx.objectStore('words');
      const index = store.index('grade');
      const request = index.getAll(grade);
      request.onsuccess = () => resolve(request.result);
      request.onerror = (e) => reject(e.target.error);
    });
  });
}

/**
 * Get words by grade and unit.
 */
export function getWordsByGradeUnit(grade, unitId) {
  return openDB().then(db => {
    return new Promise((resolve, reject) => {
      const tx = db.transaction('words', 'readonly');
      const store = tx.objectStore('words');
      const index = store.index('grade_unit');
      const request = index.getAll([grade, unitId]);
      request.onsuccess = () => resolve(request.result);
      request.onerror = (e) => reject(e.target.error);
    });
  });
}

/**
 * Get words by array of IDs.
 */
export function getWordsByIds(ids) {
  return openDB().then(db => {
    return new Promise((resolve, reject) => {
      const tx = db.transaction('words', 'readonly');
      const store = tx.objectStore('words');
      const results = [];
      let count = 0;
      if (ids.length === 0) { resolve([]); return; }
      ids.forEach(id => {
        const req = store.get(id);
        req.onsuccess = () => {
          if (req.result) results.push(req.result);
          count++;
          if (count === ids.length) resolve(results);
        };
        req.onerror = () => {
          count++;
          if (count === ids.length) resolve(results);
        };
      });
    });
  });
}

/**
 * Get total word count.
 */
export function getWordCount() {
  return openDB().then(db => {
    return new Promise((resolve, reject) => {
      const tx = db.transaction('words', 'readonly');
      const store = tx.objectStore('words');
      const request = store.count();
      request.onsuccess = () => resolve(request.result);
      request.onerror = (e) => reject(e.target.error);
    });
  });
}

// ==================== Book Operations ====================

export function insertBooks(books) {
  return openDB().then(db => {
    return new Promise((resolve, reject) => {
      const tx = db.transaction('books', 'readwrite');
      const store = tx.objectStore('books');
      books.forEach(b => store.put(b));
      tx.oncomplete = () => resolve();
      tx.onerror = (e) => reject(e.target.error);
    });
  });
}

export function getAllBooks() {
  return openDB().then(db => {
    return new Promise((resolve, reject) => {
      const tx = db.transaction('books', 'readonly');
      const store = tx.objectStore('books');
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = (e) => reject(e.target.error);
    });
  });
}

export function getBookById(id) {
  return openDB().then(db => {
    return new Promise((resolve, reject) => {
      const tx = db.transaction('books', 'readonly');
      const store = tx.objectStore('books');
      const request = store.get(id);
      request.onsuccess = () => resolve(request.result);
      request.onerror = (e) => reject(e.target.error);
    });
  });
}

// ==================== Unit Operations ====================

export function insertUnits(units) {
  return openDB().then(db => {
    return new Promise((resolve, reject) => {
      const tx = db.transaction('units', 'readwrite');
      const store = tx.objectStore('units');
      units.forEach(u => store.put(u));
      tx.oncomplete = () => resolve();
      tx.onerror = (e) => reject(e.target.error);
    });
  });
}

export function getUnitsByBook(bookId) {
  return openDB().then(db => {
    return new Promise((resolve, reject) => {
      const tx = db.transaction('units', 'readonly');
      const store = tx.objectStore('units');
      // Units have keys like "joinin1|starter", we filter by bookId prefix
      const request = store.getAll();
      request.onsuccess = () => {
        const units = request.result.filter(u => u.bookId === bookId);
        units.sort((a, b) => a.order - b.order);
        resolve(units);
      };
      request.onerror = (e) => reject(e.target.error);
    });
  });
}

// ==================== Progress Operations ====================

export function getProgress() {
  return openDB().then(db => {
    return new Promise((resolve, reject) => {
      const tx = db.transaction('progress', 'readonly');
      const store = tx.objectStore('progress');
      const request = store.get('main');
      request.onsuccess = () => {
        resolve(request.result?.value || {
          wrongWords: {},
          completedUnits: {},
          streak: { days: 0, lastDate: null },
        });
      };
      request.onerror = (e) => reject(e.target.error);
    });
  });
}

export function saveProgress(value) {
  return openDB().then(db => {
    return new Promise((resolve, reject) => {
      const tx = db.transaction('progress', 'readwrite');
      const store = tx.objectStore('progress');
      store.put({ key: 'main', value });
      tx.oncomplete = () => resolve();
      tx.onerror = (e) => reject(e.target.error);
    });
  });
}

// ==================== Check if seeded ====================

export function isDatabaseSeeded() {
  return openDB().then(db => {
    return new Promise((resolve, reject) => {
      const tx = db.transaction('words', 'readonly');
      const store = tx.objectStore('words');
      const request = store.count();
      request.onsuccess = () => resolve(request.result > 0);
      request.onerror = (e) => reject(e.target.error);
    });
  });
}

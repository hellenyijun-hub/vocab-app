// ============================================================
// useDB — React hooks for IndexedDB data access
// ============================================================
import { useState, useEffect } from 'react';
import {
  getWordsByGradeUnit, getWordsByGrade, getWordsByIds, getWordCount,
  getAllBooks, getBookById, getUnitsByBook,
} from '../db/database';

/**
 * Load books list from DB.
 */
export function useBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllBooks().then(data => {
      setBooks(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  return { books, loading };
}

/**
 * Load a single book by ID.
 */
export function useBook(bookId) {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!bookId) { setLoading(false); return; }
    getBookById(bookId).then(data => {
      setBook(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [bookId]);

  return { book, loading };
}

/**
 * Load units for a book.
 */
export function useUnits(bookId) {
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!bookId) { setLoading(false); return; }
    getUnitsByBook(bookId).then(data => {
      setUnits(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [bookId]);

  return { units, loading };
}

/**
 * Load words for a specific book + unit.
 */
export function useWords(bookId, unitId) {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!bookId || !unitId) { setLoading(false); return; }
    const bookGrade = { joinin1: 3, joinin2: 4, joinin3: 5, sprint: 6 }[bookId] || 3;
    getWordsByGradeUnit(bookGrade, unitId).then(data => {
      setWords(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [bookId, unitId]);

  return { words, loading };
}

/**
 * Load words by grade (all units in a book).
 */
export function useWordsByBook(bookId) {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!bookId) { setLoading(false); return; }
    const bookGrade = { joinin1: 3, joinin2: 4, joinin3: 5, sprint: 6 }[bookId] || 3;
    getWordsByGrade(bookGrade).then(data => {
      setWords(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [bookId]);

  return { words, loading };
}

/**
 * Load words by IDs (for wrong word review).
 */
export function useWordsByIds(ids) {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!ids || ids.length === 0) { setWords([]); setLoading(false); return; }
    getWordsByIds(ids).then(data => {
      setWords(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [ids.join(',')]);

  return { words, loading };
}

/**
 * Load total word count from DB.
 */
export function useWordCount() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    getWordCount().then(c => setCount(c)).catch(() => {});
  }, []);

  return count;
}

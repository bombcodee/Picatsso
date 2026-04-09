/**
 * 작업물 히스토리 저장소 — IndexedDB 기반
 *
 * 어댑터 패턴: 나중에 Supabase로 교체 가능
 * interface ArtworkStorage → 현재 IndexedDB 구현체
 *
 * 저장 구조:
 *   DB명: picatsso-history
 *   Store명: artworks
 *   키: id (string)
 *   값: SavedArtwork (이미지 base64 포함, 약 2.7MB/장)
 *
 * IndexedDB 용량: 브라우저별 수백MB~수GB 가능 (localStorage 5MB 한계 없음)
 */

import type { GeneratedArtwork, CatAnalysis, ArtStyle } from '@/lib/types';

/** 저장되는 작업물 데이터 */
export interface SavedArtwork {
  id: string;
  imageBase64: string;
  prompt: string;
  style: ArtStyle;
  createdAt: string;
  /** 추가 메타데이터 */
  analysis: CatAnalysis;
  sceneDescription: string;
  label?: string;
}

/** 작업물 저장소 인터페이스 (어댑터 패턴 — 나중에 Supabase 교체 가능) */
export interface ArtworkStorage {
  save(artworks: SavedArtwork[]): Promise<void>;
  getAll(): Promise<SavedArtwork[]>;
  getById(id: string): Promise<SavedArtwork | null>;
  delete(id: string): Promise<void>;
  deleteAll(): Promise<void>;
}

const DB_NAME = 'picatsso-history';
const STORE_NAME = 'artworks';
const DB_VERSION = 1;

/** IndexedDB 연결 */
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        store.createIndex('createdAt', 'createdAt', { unique: false });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/** IndexedDB 구현체 */
export class IndexedDBArtworkStorage implements ArtworkStorage {
  async save(artworks: SavedArtwork[]): Promise<void> {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);

    for (const artwork of artworks) {
      store.put(artwork);
    }

    return new Promise((resolve, reject) => {
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }

  async getAll(): Promise<SavedArtwork[]> {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const index = store.index('createdAt');

    return new Promise((resolve, reject) => {
      /** 최신순 정렬 (역방향 커서) */
      const results: SavedArtwork[] = [];
      const request = index.openCursor(null, 'prev');

      request.onsuccess = () => {
        const cursor = request.result;
        if (cursor) {
          results.push(cursor.value as SavedArtwork);
          cursor.continue();
        } else {
          resolve(results);
        }
      };
      request.onerror = () => reject(request.error);
    });
  }

  async getById(id: string): Promise<SavedArtwork | null> {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);

    return new Promise((resolve, reject) => {
      const request = store.get(id);
      request.onsuccess = () => resolve(request.result ?? null);
      request.onerror = () => reject(request.error);
    });
  }

  async delete(id: string): Promise<void> {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);

    return new Promise((resolve, reject) => {
      const request = store.delete(id);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async deleteAll(): Promise<void> {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);

    return new Promise((resolve, reject) => {
      const request = store.clear();
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }
}

/** 싱글톤 인스턴스 */
export const artworkStorage = new IndexedDBArtworkStorage();

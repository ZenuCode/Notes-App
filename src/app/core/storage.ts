import { Injectable } from '@angular/core';
import { noteList } from '../shared/interface/interface';

@Injectable()
export class StorageService {
  setNote(key: string, noteList: noteList[]): void {
    localStorage.setItem(key, JSON.stringify(noteList));
  }

  getNote(key: string): any {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : [];
  }

  removeNote(key: string, note: any): void {
    let tempStore = this.getNote(key);
    const index = tempStore.findIndex((item: noteList) => item.title === note.title);
    if (index !== -1) {
      tempStore.splice(index, 1);
      localStorage.setItem(key, JSON.stringify(tempStore));
    }
  }
}
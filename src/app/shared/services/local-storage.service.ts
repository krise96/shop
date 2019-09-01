import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {

  static parseItem<T>(key: string): T {
    return JSON.parse(localStorage.getItem(key)) as T;
  }

  static stringifyItem(key: string, value: any) {
    return localStorage.setItem(key, JSON.stringify(value));
  }
}

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {

  static parseItem<T>(key: string): T {
    return JSON.parse(localStorage.getItem(key)) as T;
  }

  static observableParseItem<T>(key: string): Observable<T | null> {
    const itemJSON = localStorage.getItem(key);
    if (!itemJSON) {
      return of(null);
    }
    const item = JSON.parse(itemJSON) as T;
    return of(item);
  }

  static stringifyItem(key: string, value: any) {
    return localStorage.setItem(key, JSON.stringify(value));
  }
}

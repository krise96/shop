import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JsonPlaceholderService {
  constructor(private http: HttpClient) {
  }

  public getPhotos(): Observable<Array<any>> {
    return this.http.get<Array<any>>('https://jsonplaceholder.typicode.com/photos');
  }

  public getPhotosPromise(): Promise<Array<any>> {
    return this.getPhotos().toPromise();
  }
}

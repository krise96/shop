import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
  useValue: { App: 'Mykola\'s shop', Ver: '1.0' }
})
export class ConstantsService {
}

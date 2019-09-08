import {Injectable} from '@angular/core';
import { ConstantsServiceTypes } from '../models/config/constants.types';

const value: ConstantsServiceTypes = { App: 'Mykola\'s shop', Ver: '1.0' };

@Injectable({
  providedIn: 'root',
  useValue: value
})
export class ConstantsService implements ConstantsServiceTypes {
}

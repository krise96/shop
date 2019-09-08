import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Observable, of } from 'rxjs';
import { Config, PropsInterface } from '../models/config/config.types';
import { retry, switchMap } from 'rxjs/operators';
import defaultConfig from '../../../assets/app-config.json';

@Injectable({
  providedIn: 'root'
})
export class ConfigOptionsService {

  private config: any = {};

  public setSettings(props: PropsInterface | Array<PropsInterface>): void {
    if (!Array.isArray(props)) {
     props = [props];
    }
    props.forEach((pr) => {
      this.config[pr.name] = pr.value;
    });
    LocalStorageService.stringifyItem('appConfig', this.config);
  }

  public getSettings(): Observable<Config> {
    return LocalStorageService.observableParseItem<Config>('appConfig')
      .pipe(
        retry(2),
        switchMap((config) => {
          if (config === null) {
            LocalStorageService.stringifyItem('appConfig', defaultConfig);
            return of(defaultConfig);
          } else {
            return of(config);
          }
        })
      );
  }
}

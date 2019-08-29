import { Injectable } from '@angular/core';

interface PropsInterface {
  name: string;
  value: any;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigOptionsService {

  private config: any = {};

  setSettings(props: PropsInterface | Array<PropsInterface>) {
    if (!Array.isArray(props)) {
     props = [props];
    }
    props.forEach((pr) => {
      this.config[pr.name] = pr.value;
    });
  }

  getSettings() {
    return this.config;
  }
}

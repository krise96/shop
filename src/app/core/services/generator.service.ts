import { Injectable } from '@angular/core';
import { GeneratorFactoryService } from './generator-factory.service';

function generatorFactoryService(length: number = 0) {
  return (factory: GeneratorFactoryService) => {
    // Не понял для чего тут GeneratorService
    // return new GeneratorService(factory.generate(length));
    return factory.generate(length);
  };
}

@Injectable({
  providedIn: 'root',
  useFactory: generatorFactoryService(20),
  deps: [GeneratorFactoryService]
})
export class GeneratorService {
  // str: string;

  // constructor(str) {
  //   this.str = str;
  // }
}

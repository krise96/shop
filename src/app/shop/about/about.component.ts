import { Component, Optional } from '@angular/core';
import { LocalStorageService } from '../../core/services/local-storage.service';
import { ConfigOptionsService } from '../../core/services/config-options.service';
import { ConstantsService } from '../../core/services/constants.service';
import { GeneratorService } from '../../core/services/generator.service';
import { GeneratorFactoryService } from '../../core/services/generator-factory.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {


  constructor(
    // То, что используется в шаблоне, делаем публичным
    @Optional() public localStorageService: LocalStorageService,
    @Optional() private configService: ConfigOptionsService,
    @Optional() public constantsService: ConstantsService,
    @Optional() public generatorService: GeneratorService
  ) // @Optional() private generatorFactoryService: GeneratorFactoryService
  {
    this.configService.setSettings([
      {
        name: 'login',
        value: 'mykola_krys'
      },
      {
        name: 'email',
        value: 'krise96@gmail.com'
      }
    ]);
    console.log(this.configService.getSettings());
    console.log(this.generatorService);
  }
}

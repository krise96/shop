import { Component, Inject, Optional } from '@angular/core';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { ConfigOptionsService } from '../../shared/services/config-options.service';
import { ConstantsService } from '../../shared/services/constants.service';
import { GeneratorService } from '../../shared/services/generator.service';
import { GeneratorFactoryService } from '../../shared/services/generator-factory.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {

  constructor(
    @Optional() public constantsService: ConstantsService,
    @Optional() public generatorFactoryService: GeneratorFactoryService,
    @Optional() private configService: ConfigOptionsService,
    @Optional() private generatorService: GeneratorService,
  ) {
    this.configService.setSettings([{
      name: 'login',
      value: 'mykola_krys',
    },
      {
        name: 'email',
        value: 'krise96@gmail.com',
      }]
      );
  }
}

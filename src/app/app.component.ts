import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { JsonPlaceholderService } from './shared/services/json-placeholder.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ConfigOptionsService } from './shared/services/config-options.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  @ViewChild('appTitle', { static: true }) title: ElementRef;

  private destroyPhotos$ = new Subject();
  private destroyConfig$ = new Subject();

  constructor(
    private jsonPlaceHolderService: JsonPlaceholderService,
    private configOptionsService: ConfigOptionsService
  ) {
    this.initSubscriptions();
  }


  ngOnInit(): void {
    this.title.nativeElement.innerText = 'Mykola\'s shop';
  }

  ngOnDestroy() {
    this.destroyPhotos$.complete();
    this.destroyConfig$.complete();
  }

  private initSubscriptions(): void {
    this.jsonPlaceHolderService.getPhotos()
      .pipe(takeUntil(this.destroyPhotos$))
      .subscribe((x) => {
        console.log(x);
      });
    this.jsonPlaceHolderService.getPhotosPromise().then((x) => {
      console.log(x);
    });

    this.configOptionsService.getSettings()
      .pipe(takeUntil(this.destroyConfig$))
      .subscribe((con) => {
        console.log(con);
      });
  }
}

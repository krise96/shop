import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild('appTitle', { static: true }) title: ElementRef;

  ngOnInit(): void {
    this.title.nativeElement.innerText = 'Mykola\'s shop';
  }
}

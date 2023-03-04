import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-prijedlozi-filmova',
  templateUrl: './prijedlozi-filmova.component.html',
  styleUrls: ['./prijedlozi-filmova.component.scss']
})

export class PrijedloziFilmovaComponent {
  constructor(private titleService: Title) {
    titleService.setTitle("Prijedlozi filmova");
  }
}

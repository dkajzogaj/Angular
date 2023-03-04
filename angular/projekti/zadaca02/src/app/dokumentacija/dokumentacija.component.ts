import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-dokumentacija',
  templateUrl: './dokumentacija.component.html', 
  styleUrls: ['./dokumentacija.component.scss']
})

export class DokumentacijaComponent {
  title = 'Dokumentacija';

  constructor(private titleService: Title) {
    titleService.setTitle("Dokumentacija");
  }
}

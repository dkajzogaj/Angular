import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';



@Component({
  selector: 'app-galerija-slika',
  templateUrl: './galerija-slika.component.html',
  styleUrls: ['./galerija-slika.component.scss']
})

export class GalerijaSlikaComponent {
  constructor(private titleService: Title) {
    titleService.setTitle("Galerija slika");
  }
}

import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-slika',
  templateUrl: './slika.component.html',
  styleUrls: ['./slika.component.scss']
})

export class SlikaComponent {
  constructor(private titleService: Title) {
    titleService.setTitle("Slika");
  }
}

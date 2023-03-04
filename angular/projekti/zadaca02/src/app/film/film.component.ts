import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss']
})

export class FilmComponent {
  constructor(private titleService: Title) {
    titleService.setTitle("Film");
  }
}

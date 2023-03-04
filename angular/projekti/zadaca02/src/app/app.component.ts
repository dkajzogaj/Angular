import { Component } from '@angular/core';
import { environment } from '../environments/environment';
import { KorisnikI } from './servisi/korisnikI';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Početna';
}


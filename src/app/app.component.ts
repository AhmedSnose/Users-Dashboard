import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HeaderComponent],
  template: ` 
  <app-header></app-header>
  <router-outlet></router-outlet>`,
  styles: [
    `
      // :host {
      //   max-width: 1280px;
      //   margin: 0 auto;
      //   padding: 2rem;
      //   text-align: center;
      // }
    `,
  ],
})
export class AppComponent {}

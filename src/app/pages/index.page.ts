import { Component, signal } from '@angular/core';
import { UserListComponent } from '../components/user-list/user-list.component';
import { SearchBarComponent } from '../components/search-bar/search-bar.component';
import { UserService } from '../services/user/user.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports:[UserListComponent,SearchBarComponent],
  template: `
    <app-search-bar></app-search-bar>
    <app-user-list></app-user-list>
  `,
})
export default class HomeComponent {}

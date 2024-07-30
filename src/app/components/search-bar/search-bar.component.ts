import { Component, OnInit } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { debounceTime, distinctUntilChanged, Observable, startWith, switchMap } from 'rxjs';
import { UserService } from '../../services/user/user.service';
import { MatSelectModule } from '@angular/material/select';
import { User } from 'src/app/types/userTypes';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [ReactiveFormsModule, MatSelectModule, MatAutocompleteModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
})
export class SearchBarComponent implements OnInit {
  searchForm!: FormGroup;
  filteredUsers!: Observable<User[]> | undefined;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.searchForm = this.fb.group({
      userId: [null, [Validators.maxLength(4),Validators.min(0)]],
    });
  }

  ngOnInit() {
    this.searchForm
      .get('userId')
      ?.valueChanges.pipe(startWith(''))
      .subscribe((value) => {        
        this.userService.searchValue$.next(value);
      });
  }
}

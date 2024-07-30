import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { PaginatorComponent } from '../paginator/paginator.component';
import { map, Subscription } from 'rxjs';
import { paginatorIF } from '../../types/paginatorTypes';
import { User } from '../../types/userTypes';
import { PaginationService } from '../../services/paginator/paginator.service';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink,
    PaginatorComponent,
    NgIf,
    NgxSkeletonLoaderModule,
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent implements OnDestroy, OnInit {
  users!: User[];
  paginatorData: paginatorIF = {
    page: 1,
    per_page: 4,
  };
  subscription!: Subscription;
  paginationSubscription!: Subscription;
  loading = true;

  constructor(
    private userService: UserService,
    private paginationService: PaginationService
  ) {}

  ngOnInit(): void {
    this.getUsersData();

    this.paginationSubscription = this.paginationService.pageChange$.subscribe(
      (paginatorData: paginatorIF) => {
        this.getUsersData(paginatorData);
      }
    );

    this.userService.searchValue$.subscribe((searchValue) =>
      this.getUsersData(this.paginatorData, searchValue)
    );
  }

  getUsersData(paginatorData?: paginatorIF, searchValue?: string) {
    this.loading = true;
    setTimeout(() => {
      this.subscription = this.userService
        .getUsers(paginatorData, searchValue)
        .subscribe((response) => {
          this.users = response.users;
          this.paginatorData = response.paginatorData;
        });
      this.loading = false;
    }, 2000); // Simulating a delay of 2 seconds
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.paginationSubscription.unsubscribe();
  }
}

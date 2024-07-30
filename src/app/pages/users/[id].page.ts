import { AfterContentInit, Component, inject } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, switchMap, tap } from 'rxjs/operators';
import { User } from 'src/app/types/userTypes';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-group',
  standalone: true,
  imports: [AsyncPipe, NgIf,RouterLink],
  template: `
    <div *ngIf="user$ | async as user" class="mt-32">
      <div
        class="mx-auto bg-white rounded-xl shadow-md overflow-hidden w-[16rem]"
      >
        <div class="relative">
          <img class="w-full object-cover h-48" [src]="user.avatar" />
        </div>
        <div class="p-4">
          <div class="text-xl font-semibold text-gray-800">
            {{ user.first_name }} {{ user.last_name }}
          </div>
          <div
            class="text-xs  text-gray-800 mb-2 underline hover:cursor-pointer"
          >
            {{ user.email }}
          </div>
        </div>
      </div>
    </div>
    <div class="fixed bottom-0 right-0 p-4">
      <a
        [routerLink]="['/']"
        class=" text-white rounded-full w-10 h-10 flex items-center justify-center"
        onclick=""
      >
        <svg
          width="800px"
          height="800px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM13.92 16.13H9C8.59 16.13 8.25 15.79 8.25 15.38C8.25 14.97 8.59 14.63 9 14.63H13.92C15.2 14.63 16.25 13.59 16.25 12.3C16.25 11.01 15.21 9.97 13.92 9.97H8.85L9.11 10.23C9.4 10.53 9.4 11 9.1 11.3C8.95 11.45 8.76 11.52 8.57 11.52C8.38 11.52 8.19 11.45 8.04 11.3L6.47 9.72C6.18 9.43 6.18 8.95 6.47 8.66L8.04 7.09C8.33 6.8 8.81 6.8 9.1 7.09C9.39 7.38 9.39 7.86 9.1 8.15L8.77 8.48H13.92C16.03 8.48 17.75 10.2 17.75 12.31C17.75 14.42 16.03 16.13 13.92 16.13Z"
            fill="#292D32"
          />
        </svg>
</a>
    </div>
  `,
})
export default class GroupComponent implements AfterContentInit {
  constructor(private userService: UserService) {}

  private readonly route = inject(ActivatedRoute);
  user$ = this.route.paramMap.pipe(
    switchMap((params) => {
      const id = params.get('id') ?? '';
      return this.userService.getUser(id);
    })
  );

  ngAfterContentInit(): void {
    // Any additional initialization logic can go here
  }
}

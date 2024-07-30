import {
  AfterContentChecked,
  AfterContentInit,
  Component,
  Input,
} from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { PaginationService } from '../../services/paginator/paginator.service';
import { paginatorIF } from '../../types/paginatorTypes';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [MatPaginatorModule],
  template: `
    <mat-paginator
      style="background: #E2DAD6"
      [length]="paginatorData.total"
      [pageSize]="paginatorData.per_page"
      [pageIndex]="paginatorData.page - 1"
      [pageSizeOptions]="[4, 8, 12]"
      aria-label="Select page"
      (page)="onPageChange($event)"
    >
    </mat-paginator>
  `,
})
export class PaginatorComponent {
  @Input({
    required: true,
  })
  paginatorData!: paginatorIF;

  constructor(private paginationService: PaginationService) {}

  onPageChange(event: PageEvent) {
    this.paginatorData.page = event.pageIndex + 1;
    this.paginatorData.per_page = event.pageSize;
    this.paginationService.changePage(this.paginatorData);
  }
}

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { paginatorIF } from 'src/app/types/paginatorTypes';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  private pageChangeSubject = new Subject<paginatorIF>();
  pageChange$ = this.pageChangeSubject.asObservable();

  changePage(paginatorData: paginatorIF) {
    this.pageChangeSubject.next(paginatorData);
  }
}

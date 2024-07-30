import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User, userResponseType } from 'src/app/types/userTypes';
import { paginatorIF } from 'src/app/types/paginatorTypes';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://reqres.in/api/users';
  searchValue$ = new BehaviorSubject<string>('')

  constructor(private http: HttpClient) {}

  getUsers(paginatorData?: paginatorIF, searchValue?: string): Observable<any> {    
    const isSearchingById = Boolean(searchValue);
    const queryParams = `?page=${paginatorData?.page ? paginatorData.page : 1}&per_page=${paginatorData?.per_page ? paginatorData.per_page : 4}${isSearchingById ? '&id=' + searchValue : ''}`;
    
    return this.http.get<userResponseType>(`${this.apiUrl}` + queryParams).pipe(
      map((response) => {  
        return {
          users: isSearchingById ? [response.data] : response.data,
          paginatorData: {
            page: response.page,
            per_page: response.per_page,
            total_pages: response.total_pages,
            total: response.total,
          },
        };
      }),
      catchError(this.handleError('getUsers', {users:[],paginatorData:{}}))
    );
  }
  

  getUser(id: string): Observable<any> {
    return this.http.get<{data:User}>(`${this.apiUrl}/${id}`).pipe(
      map(res=>res.data),
      catchError(this.handleError(`getUser id=${id}`, {users:[]}))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
}

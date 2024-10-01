import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../common/user';
import { Observable,Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private ROOT_URL:String ='http://localhost:8080'                        
  private usersUrl = 'http://localhost:8080/api/users';
  private deleteUrl = 'http://localhost:8080/api/delete';

  constructor(private httpClient: HttpClient) { }

    private _refreshNeeded$ = new Subject<void>()

    get refreshNeeded$(){
        return this._refreshNeeded$
    }
    getUsers():Observable<User[]>{
        return this.httpClient.get<User[]>(this.usersUrl);
    }
     deleteUser(user: number):Observable<any>{
       return this.httpClient
       .delete<any>(`${this.deleteUrl}/${user}`)
       .pipe(
        tap(()=>{
          this._refreshNeeded$.next()
        })
       )
       ;
   }

}

import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/user";
import {environment} from "../../environments/environment";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService{
  private apiServerUrl = environment.apiBaseUrl;
  // @ts-ignore
  public currentUser: Observable<User>;
  constructor(private http: HttpClient) {
  }
  public getUsers(): Observable<User[]>{
    return this.http.get<User[]>(`${this.apiServerUrl}/admin/allUserByAdmin`);
  }

  public addUser(user: User): Observable<User>{
    return this.http.post<User>(`${this.apiServerUrl}/user/save`, user);
  }

  public updateUser(user: User): Observable<User>{
    return this.http.put<User>(`${this.apiServerUrl}/user/updateUser`, user);
  }

  public deleteUser(userId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/admin/deleteUserByAdmin/${userId}`);
  }
  public login(user: User){
    return this.http.post<any>(`${this.apiServerUrl}/user/login`, user)
  }
  public getUser(user: User): Observable<User>{
    return this.http.post<User>(`${this.apiServerUrl}/user//userGetOne`, user);
  }
}

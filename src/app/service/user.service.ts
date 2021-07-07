import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {User} from "../model/user";

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
  public deleteUser(userId: number): Observable<User[]>{
    return this.http.delete<User[]>(`${this.apiServerUrl}/admin/deleteUserByAdmin/${userId}`);
  }
  public login(user: User){
    return this.http.post<any>(`${this.apiServerUrl}/user/login`, user)
  }
  public getUser(user: User): Observable<User>{
    return this.http.post<User>(`${this.apiServerUrl}/user/userGetOne`, user);
  }
  public blockUser(userId: number): Observable<User[]>{
    return this.http.get<User[]>(`${this.apiServerUrl}/admin/blockUserByAdmin/${userId}`);
  }

  public setAdminUser(userId: number): Observable<User>{
    return this.http.get<User>(`${this.apiServerUrl}/admin/updatedUserByAdmin/${userId}`);
  }
}

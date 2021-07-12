import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment.prod";
import {User} from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class UserService{
  private apiServerUrl = environment.apiUrl;
  // @ts-ignore
  public currentUser: Observable<User>;
  constructor(private http: HttpClient) {
  }
  public getUsers(): Observable<User[]>{
    return this.http.get<User[]>(`${this.apiServerUrl}admin/allUserByAdmin`);
  }
  public addUser(user: User): Observable<User>{
    return this.http.post<User>(`${this.apiServerUrl}user/save`, user);
  }
  public deleteUser(userId: number): Observable<User[]>{
    return this.http.delete<User[]>(`${this.apiServerUrl}admin/deleteUserByAdmin/${userId}`);
  }
  public login(user: User){
    return this.http.post<any>(`${this.apiServerUrl}user/login`, user)
  }
  public blockUser(userId: number): Observable<User[]>{
    return this.http.get<User[]>(`${this.apiServerUrl}admin/blockUserByAdmin/${userId}`);
  }
  public setAdminUser(userId: number): Observable<User>{
    return this.http.get<User>(`${this.apiServerUrl}admin/updatedUserByAdmin/${userId}`);
  }
}

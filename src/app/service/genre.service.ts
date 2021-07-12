import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/user";
import {environment} from "../../environments/environment.prod";
import {Genre} from "../model/genre";

@Injectable({
  providedIn: 'root'
})
export class GenreService{
  private apiServerUrl = environment.apiUrl;
  // @ts-ignore
  public currentUser: Observable<User>;
  constructor(private http: HttpClient) {
  }
  public getAllGenre(): Observable<Genre[]>{
    return this.http.get<Genre[]>(`${this.apiServerUrl}working/listAllGenre`);
  }
}

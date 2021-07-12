import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/user";
import {environment} from "../../environments/environment.prod";
import {Tags} from "../model/tags";

@Injectable({
  providedIn: 'root'
})
export class TagsService{
  private apiServerUrl = environment.apiUrl;
  // @ts-ignore
  public currentUser: Observable<User>;
  constructor(private http: HttpClient) {
  }
  public getAllTags(): Observable<Tags[]>{
    return this.http.get<Tags[]>(`${this.apiServerUrl}/working/listAllTags`);
  }
}

import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Tags} from "../model/tags";

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }

  public getAllTags(): Observable<Tags[]> {
    return this.http.get<Tags[]>(`${this.apiServerUrl}/working/listAllTags`);
  }
}

import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/user";
import {environment} from "../../environments/environment.prod";
import {FunFic} from "../model/funFic";
import {FunFicSearchRequest} from "../model/funFicSearchRequest";

@Injectable({
  providedIn: 'root'
})
export class FunFicService {
  private apiServerUrl = environment.apiUrl;
  // @ts-ignore
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
  }

  public getFunFicList(): Observable<FunFic[]> {
    return this.http.get<FunFic[]>(`${this.apiServerUrl}/working/listFunFic`);
  }

  public getFunFicListId(funFicId: number): Observable<FunFic[]> {
    return this.http.get<FunFic[]>(`${this.apiServerUrl}/working/listFunFicById/${funFicId}`);
  }

  public deleteFunFicById(funFicId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/working/deleteFunFicByUser/${funFicId}`);
  }

  public addFunFic(funFic: FunFic, genre: string, idUser: number, tagsList: Array<string>): Observable<FunFic> {
    funFic.typeTags = tagsList;
    funFic.genre = genre;
    funFic.idUser = idUser;
    return this.http.post<FunFic>(`${this.apiServerUrl}/working/addFunFicByUser`, funFic);
  }

  public addFunFicByAdmin(funFic: FunFic, genre: string, tagsList: Array<string>): Observable<FunFic> {
    funFic.typeTags = tagsList;
    funFic.genre = genre;
    // @ts-ignore
    let user = JSON.parse(sessionStorage.getItem('user'));
    funFic.idUser = user.id;
    return this.http.post<FunFic>(`${this.apiServerUrl}/admin/addFunFicByAdmin`, funFic);
  }

  public addFunFicByAdminThisUser(funFic: FunFic, genre: string, tagsList: Array<string>, idUser: number): Observable<FunFic> {
    funFic.typeTags = tagsList;
    funFic.genre = genre;
    funFic.idUser = idUser;
    return this.http.post<FunFic>(`${this.apiServerUrl}/admin/addFunFicByAdminThisUser`, funFic);
  }

  public upload(formData: FormData): Observable<void> {
    return this.http.post<void>(`${this.apiServerUrl}/admin/upload`, formData)
  }

  public searchFunFic(funFic: String): Observable<FunFic[]> {

    return this.http.get<FunFic[]>(`${this.apiServerUrl}/working/searchFunFic/${funFic}`);
  }
}

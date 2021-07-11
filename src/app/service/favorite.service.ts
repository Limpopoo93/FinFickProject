import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/user";
import {environment} from "../../environments/environment";
import {Favorite} from "../model/favorite";
import {publish} from "rxjs/operators";
import {FunFic} from "../model/funFic";
import {Chapter} from "../model/chapter";

@Injectable({
  providedIn: 'root'
})
export class FavoriteService{
  private apiServerUrl = environment.apiBaseUrl;
  // @ts-ignore
  public currentUser: Observable<User>;
  constructor(private http: HttpClient) {
  }
  public addFavorite(idChapter: number,user: User): Observable<Favorite>{
  user.idChapter = idChapter;
    return this.http.post<Favorite>(`${this.apiServerUrl}/working/addMyFavorite`, user);
  }
  public getFavoriteList(idUser: number): Observable<FunFic[]>{
    return this.http.get<FunFic[]>(`${this.apiServerUrl}/working/listFavoriteByIdUser/${idUser}`);
  }

  public deleteFavoriteByUser(idFunFic: number): Observable<FunFic[]>{
    return this.http.get<FunFic[]>(`${this.apiServerUrl}/working/deleteFavoriteByUser/${idFunFic}`);
  }

  public getReadFunFic(idFunFic: number): Observable<Chapter[]>{
    return this.http.get<Chapter[]>(`${this.apiServerUrl}/working/chapterByFunFic/${idFunFic}`);
  }
}

import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/user";
import {environment} from "../../environments/environment";
import {FunFic} from "../model/funFic";

@Injectable({
  providedIn: 'root'
})
export class FunFicService{
  private apiServerUrl = environment.apiBaseUrl;
  // @ts-ignore
  public currentUser: Observable<User>;
  constructor(private http: HttpClient) {
  }
  public getFunFicList(): Observable<FunFic[]>{
    return this.http.get<FunFic[]>(`${this.apiServerUrl}/working/listFunFic`);
  }
  public getFunFicListId(funFicId: number): Observable<FunFic[]>{
    return this.http.get<FunFic[]>(`${this.apiServerUrl}/working/listFunFicById/${funFicId}`);
  }
  public deleteFunFicById(funFicId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/working/deleteFunFicByUser/${funFicId}`);
  }
  public addFunFic(funFic: FunFic, genre: string, idUser: number, tagsList:Array<string>): Observable<FunFic>{
    funFic.typeTags = tagsList;
    funFic.genre = genre;
    funFic.idUser=idUser;
    return this.http.post<FunFic>(`${this.apiServerUrl}/working/addFunFicByUser`, funFic);
  }
}

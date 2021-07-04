import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {User} from "../model/user";
import {HttpClient} from "@angular/common/http";
import {FunFic} from "../model/funFic";
import {Chapter} from "../model/chapter";
import {CommentRequest} from "../model/CommentRequest";
import {Genre} from "../model/genre";

@Injectable({
  providedIn: 'root'
})
export class FunFicService{
  private apiServerUrl = environment.apiBaseUrl;
  // @ts-ignore
  public currentFunFic: Observable<FunFic>;
  constructor(private http: HttpClient) {
  }
  public getFunFicList(): Observable<FunFic[]>{
    return this.http.get<FunFic[]>(`${this.apiServerUrl}/user/listFunFic`);
  }
  public getChapterList(chapterId: number): Observable<Chapter[]>{
    return this.http.get<Chapter[]>(`${this.apiServerUrl}/user/chapterByFunFic/${chapterId}`);
  }

  public addComments(comment: CommentRequest, id: number): Observable<CommentRequest>{
    comment.idChapter = id;
    return this.http.post<CommentRequest>(`${this.apiServerUrl}/user/commentSave`, comment);
  }

  public getFunFicListId(funFicId: number): Observable<FunFic[]>{
    return this.http.get<FunFic[]>(`${this.apiServerUrl}/user/listFunFicById/${funFicId}`);
  }
  public deleteFunFicById(funFicId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/user/deleteFunFicByUser/${funFicId}`);
  }

  public getAllGenre(): Observable<Genre[]>{
    return this.http.get<Genre[]>(`${this.apiServerUrl}/user/listAllGenre`);
  }

  public addFunFic(funFic: FunFic, genre: string, idUser: number): Observable<FunFic>{
    funFic.genre = genre;
    funFic.idUser=idUser;
    return this.http.post<FunFic>(`${this.apiServerUrl}/user/addFunFicByUser`, funFic);
  }
}

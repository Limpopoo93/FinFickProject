import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/user";
import {environment} from "../../environments/environment";
import {Chapter} from "../model/chapter";
import {FunFic} from "../model/funFic";

@Injectable({
  providedIn: 'root'
})
export class ChapterService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }

  public getChapterList(chapterId: number): Observable<Chapter[]> {
    return this.http.get<Chapter[]>(`${this.apiServerUrl}/working/chapterByFunFic/${chapterId}`);
  }

  public addChapter(chapter: Chapter, id: number): Observable<Chapter> {
    chapter.idFunFic = id;
    return this.http.post<Chapter>(`${this.apiServerUrl}/working/addChapter`, chapter);
  }

  public addChapterByAdmin(chapter: Chapter, idFunFic: number): Observable<Chapter> {
    chapter.idFunFic = idFunFic;
    return this.http.post<Chapter>(`${this.apiServerUrl}/admin/addChapterByAdmin`, chapter);
  }

  public addLikes(id: number, user: User): Observable<FunFic> {
    user.idChapter = id;
    return this.http.post<FunFic>(`${this.apiServerUrl}/working/addLike`, user);
  }

  public addRating(idChapter: number, idRating: number): Observable<Chapter> {
    // @ts-ignore
    const user = JSON.parse(sessionStorage.getItem('user'));
    user.rating = idRating;
    user.idChapter = idChapter;
    return this.http.post<Chapter>(`${this.apiServerUrl}/working/addRating`, user);
  }
}

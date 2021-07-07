import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/user";
import {environment} from "../../environments/environment";
import {Chapter} from "../model/chapter";

@Injectable({
  providedIn: 'root'
})
export class ChapterService{
  private apiServerUrl = environment.apiBaseUrl;
  // @ts-ignore
  public currentUser: Observable<User>;
  constructor(private http: HttpClient) {
  }
  public getChapterList(chapterId: number): Observable<Chapter[]>{
    return this.http.get<Chapter[]>(`${this.apiServerUrl}/working/chapterByFunFic/${chapterId}`);
  }
  public addChapter(chapter: Chapter, id: number): Observable<Chapter>{
    chapter.idFunFic = id;
    return this.http.post<Chapter>(`${this.apiServerUrl}/working/addChapter`, chapter);
  }
}

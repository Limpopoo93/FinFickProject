import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/user";
import {environment} from "../../environments/environment.prod";
import {CommentRequest} from "../model/CommentRequest";
import {FunFic} from "../model/funFic";
import {Chapter} from "../model/chapter";

@Injectable({
  providedIn: 'root'
})
export class CommentService{
  private apiServerUrl = environment.apiUrl;
  // @ts-ignore
  public currentUser: Observable<User>;
  constructor(private http: HttpClient) {
  }
  public addComments(comment: CommentRequest, id: number): Observable<CommentRequest>{
    comment.idChapter = id;
    return this.http.post<CommentRequest>(`${this.apiServerUrl}user/commentSave`, comment);
  }

}

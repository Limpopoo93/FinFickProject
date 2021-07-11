import { Component, OnInit } from '@angular/core';
import {HttpErrorResponse, HttpStatusCode} from "@angular/common/http";
import {FunFic} from "../../model/funFic";
import {Chapter} from "../../model/chapter";
import {CommentRequestDtos} from "../../model/commentDto";
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {User} from "../../model/user";
import {CommentRequest} from "../../model/CommentRequest";
import { FunFicService } from 'src/app/service/funFic.service';
import {CommentService} from "../../service/comment.service";
import {ChapterService} from "../../service/chapter.service";
import {Favorite} from "../../model/favorite";
import {FavoriteService} from "../../service/favorite.service";
import {convertToParamMap} from "@angular/router";

@Component({
  selector: 'app-fun-fic-table',
  templateUrl: './fun-fic-table.component.html',
  styleUrls: ['./fun-fic-table.component.css']
})
export class FunFicTableComponent implements OnInit {
  // @ts-ignore
  public funFicList: FunFic[];
  // @ts-ignore
  public chapterList: Chapter[];
  public showMyMessage3 = false;
  public showMyMessage5 = false;
  public showComments = true;
  public totalLength: any;
  public page: number=1;
  // @ts-ignore
  public addFormComments: FormGroup;
  // @ts-ignore
  public favorite:Favorite;
  // @ts-ignore
  public user:User;
  // @ts-ignore
  public form: FormGroup;
  // @ts-ignore
  public ratingResult:number;
  // @ts-ignore
  public chapter:Chapter
  // @ts-ignore
  public result:string;

  constructor(private funFicService: FunFicService, private commentService: CommentService, private chapterService: ChapterService, private favoriteService:FavoriteService) {
    this.form = new FormGroup({
      rating: new FormControl(null)
    })
  }

  ngOnInit(): void {
    this.getFunFicList();
    this.addFormComments = new FormGroup({
      "textComments": new FormControl(null, [Validators.required, Validators.pattern("[^a-zA-Z]"), Validators.minLength(4), Validators.maxLength(50)]),
      "email": new FormControl(null, [Validators.required, Validators.email, Validators.minLength(4), Validators.maxLength(15)])
    })
  }
  public pushMyFavorite(idChapter: number){
    // @ts-ignore
    this.favoriteService.addFavorite(idChapter, JSON.parse(sessionStorage.getItem('user'))).subscribe(
      (response: Favorite) => {
        this.favorite = response;
      },
      (error: HttpErrorResponse) => {
        this.result = error.message;
       // alert(error.message);
      }
    )
  }

  public getFunFicList(): void {
    this.funFicService.getFunFicList().subscribe(
      (response: FunFic[]) => {
        this.funFicList = response;
        this.totalLength=this.funFicList.length;
        console.log(this.totalLength);
        this.showMyMessage3 = true;
      },
      (error: HttpErrorResponse) => {
        this.result = error.message;
        //alert(error.message);
      }
    )
  }
  public getIdChapter(id: number){
    this.chapterService.getChapterList(id).subscribe(
      (response: Chapter[]) => {
        this.chapterList = response;
        console.log(response);
        // @ts-ignore
        let user = JSON.parse(sessionStorage.getItem('user'));
        if (user == null){
          this.showComments = false;
        }
        this.showMyMessage3 = false;
        this.showMyMessage5 = true;
      },
      (error: HttpErrorResponse) => {
        this.result = error.message;
        //alert(error.message)
      }
    )
  }
  public onCommentPush(addForm: FormGroupDirective, id: number): void {
    // @ts-ignore
    document.getElementById("clickMessage").click();
    this.commentService.addComments(addForm.value, id).subscribe(
      (response: CommentRequest) => {
        console.log(response)
      },
      (error: HttpErrorResponse) => {
        this.result = error.message;
        //alert(error.message)
      }
    )
  }

  public addLikes(idChapter: number): void {
    console.log(idChapter)
    // @ts-ignore
    const user = JSON.parse(sessionStorage.getItem('user'));
    this.chapterService.addLikes(idChapter, user).subscribe(
      (response: FunFic) => {
        console.log(response)
      },
      (error: HttpErrorResponse) => {
        this.result = error.message;
        //alert(error.message)
      }
    )
  }

  public addRating(idChapter: number): void {
    // @ts-ignore
    this.ratingResult = this.form ? this.form.get('rating').value : '';

    this.chapterService.addRating(idChapter, this.ratingResult).subscribe(
      (response: Chapter) => {
      },
      (error: HttpErrorResponse) => {
        this.result = error.message;
        //alert(error.message)
      }
    )
  }




}

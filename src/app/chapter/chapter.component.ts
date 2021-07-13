import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FunFic} from "../model/funFic";
import {HttpErrorResponse} from "@angular/common/http";
import {Chapter} from "../model/chapter";
import {ChapterService} from "../service/chapter.service";
import {FormGroup} from "@angular/forms";
import {Favorite} from "../model/favorite";
import {FunFicService} from "../service/funFic.service";
import {User} from "../model/user";

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.css']
})
export class ChapterComponent implements OnInit {
  // @ts-ignore
  @Input() funFicResultSearch: FunFic[]
  // @ts-ignore
  @Input() showFunFic
  public totalLength: any;
  public page: number = 1;
  public showChapter = false;
  public showLike = false;
  public showAddFavorite = false;
  // @ts-ignore
  public result: string;
  // @ts-ignore
  public funFicList: FunFic[];
  // @ts-ignore
  public chapterList: Chapter[];
  // @ts-ignore
  public favorite: Favorite;
  // @ts-ignore
  public user: User;
  // @ts-ignore
  public form: FormGroup;
  // @ts-ignore
  public ratingResult: number;
  // @ts-ignore
  public chapter: Chapter
  @Output()
  showChapterSearch = new EventEmitter();


  constructor(private chapterService: ChapterService, private funFicService: FunFicService) {
  }

  ngOnInit(): void {
  }

  public pushMyFavorite(idChapter: number) {
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

  public getIdChapter(id: number) {
    this.chapterService.getChapterList(id).subscribe(
      (response: Chapter[]) => {
        this.chapterList = response;
        console.log(response);
        // @ts-ignore
        let user = JSON.parse(sessionStorage.getItem('user'));
        if (user != null) {
          this.showAddFavorite = true;
          this.showLike = true;
        }
        this.showFunFic = false;
        this.showChapter = true;
        //this.showChapterSearch.emit();
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

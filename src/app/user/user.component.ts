import {Component, Input, OnInit} from '@angular/core';
import {User} from "../model/user";
import {FunFic} from "../model/funFic";
import {HttpErrorResponse} from "@angular/common/http";
import {Chapter} from "../model/chapter";
import {FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {Genre} from "../model/genre";
import {Tags} from "../model/tags";
import {FunFicService} from "../service/funFic.service";
import {ChapterService} from "../service/chapter.service";
import {GenreService} from "../service/genre.service";
import {TagsService} from "../service/tags.service";
import {FavoriteService} from "../service/favorite.service";
import {Favorite} from "../model/favorite";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public infoByUser = true;
  public funFicListSettingUser = false;
  public readChapterByUser = false;
  public addFunFicUser = false;
  public addChapterUser = false;
  public showFavoriteUser = false;
  public readChapterByFavorite = false;

  @Input()
  public user!: User;
  // @ts-ignore
  public user1: User;
  // @ts-ignore
  public funFicList: FunFic[];
  // @ts-ignore
  public genreList: Genre[];
  public totalLength: any;
  public page: number = 1;
  // @ts-ignore
  public chapterList: Chapter[];
  // @ts-ignore
  public user2: User;
  // @ts-ignore
  public tagList: Tags[];
  // @ts-ignore
  public form: FormGroup;
  // @ts-ignore
  public genre1: string
  // @ts-ignore
  public funFicNew: FunFic;
  // @ts-ignore
  public selectedItem: string[]
  // @ts-ignore
  public addFunFicForm: FormGroup;
  // @ts-ignore
  public addChapterForm: FormGroup;
  // @ts-ignore
  public funFicByFavorite: FunFic[];
  // @ts-ignore
  public chapterListByFavorite: Chapter[];
  // @ts-ignore
  public ratingResult:number;


  constructor(private funFicService: FunFicService, private chapterService: ChapterService, private genreService: GenreService, private tagsService: TagsService, private favoriteService: FavoriteService) {
    this.form = new FormGroup({
      country: new FormControl(null)
    })
  }

  ngOnInit() {
    this.selectedItem = new Array<string>();
    this.addFunFicForm = new FormGroup({
      "nameFunFic": new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(30)]),
      "shortDescription": new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(60)])
    });
    this.addChapterForm = new FormGroup({
      "numberChapter": new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(15)]),
      "nameChapter": new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(30)]),
      "textChapter": new FormControl(null, [Validators.required, Validators.minLength(4)])
    });
  }

  public getUserListFavorite(){
    // @ts-ignore
    this.user1 = JSON.parse(sessionStorage.getItem('user'));
    this.favoriteService.getFavoriteList(this.user1.id).subscribe(
      (response: FunFic[]) => {
        this.funFicByFavorite = response;
        this.totalLength = this.funFicByFavorite.length;
        this.infoByUser = false;
        this.funFicListSettingUser = false;
        this.readChapterByUser = false;
        this.addFunFicUser = false;
        this.addChapterUser = false;
        this.showFavoriteUser = true;
        this.readChapterByFavorite = false;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public deleteFunFicFavorite(idFunFic: number){
    this.favoriteService.deleteFavoriteByUser(idFunFic).subscribe(
      (response: FunFic[]) => {
        this.funFicByFavorite = response;
        this.totalLength = this.funFicByFavorite.length;
        this.infoByUser = false;
        this.funFicListSettingUser = false;
        this.readChapterByUser = false;
        this.addFunFicUser = false;
        this.addChapterUser = false;
        this.showFavoriteUser = false;
        this.readChapterByFavorite = false;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public readFunFicFavorite(idFunFic: number){
    this.favoriteService.getReadFunFic(idFunFic).subscribe(
      (response: Chapter[]) => {
        this.chapterListByFavorite = response;
        this.infoByUser = false;
        this.funFicListSettingUser = false;
        this.readChapterByUser = false;
        this.addFunFicUser = false;
        this.addChapterUser = false;
        this.showFavoriteUser = false;
        this.readChapterByFavorite = true;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }



  public getUserListFunficId(){
    // @ts-ignore
    this.user1 = JSON.parse(sessionStorage.getItem('user'));
    this.funFicService.getFunFicListId(this.user1.id).subscribe(
      (response: FunFic[]) => {
        this.funFicList = response;
        this.totalLength = this.funFicList.length;
        this.infoByUser = false;
        this.funFicListSettingUser = true;
        this.readChapterByUser = false;
        this.addFunFicUser = false;
        this.addChapterUser = false;
        this.showFavoriteUser = false;
        this.readChapterByFavorite = false;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public getIdChapter(id: number) {
    this.chapterService.getChapterList(id).subscribe(
      (response: Chapter[]) => {
        this.chapterList = response;
        console.log(response);
        this.funFicListSettingUser = false;
        this.readChapterByUser = true;
        this.addFunFicUser = false;
        this.addChapterUser = false;
        this.showFavoriteUser = false;
        this.readChapterByFavorite = false;
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }

  public deleteFunFicId(id: number) {
    this.funFicService.deleteFunFicById(id).subscribe();
    this.infoByUser = true;
    this.funFicListSettingUser = false;
    this.readChapterByUser = false;
    this.addFunFicUser = false;
    this.addChapterUser = false;
    this.showFavoriteUser = false;
    this.readChapterByFavorite = false;
  }

  public showFunFicForm() {
    this.addFunFicUser = true;
    this.infoByUser = false;
    this.funFicListSettingUser = false;
    this.readChapterByUser = false;
    this.addChapterUser = false;
    this.showFavoriteUser = false;
    this.readChapterByFavorite = false;
    this.genreService.getAllGenre().subscribe(
      (response: Genre[]) => {
        this.genreList = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
    this.tagsService.getAllTags().subscribe(
      (response: Tags[]) => {
        this.tagList = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }

  get country(): string {
    // @ts-ignore
    return this.form ? this.form.get('country').value : '';
  }

  // @ts-ignore
  public onChangeTags($event) {
    const typeTags = $event.target.value;
    this.selectedItem.push(typeTags);
  }

  public onFunFicPush(addForm: FormGroupDirective): void {
    // @ts-ignore
    document.getElementById("clickMessage").click();
    // @ts-ignore
    this.user2 = JSON.parse(sessionStorage.getItem('user'));
    this.funFicService.addFunFic(addForm.value, this.genre1 = this.country, this.user2.id, this.selectedItem).subscribe(
      (response: FunFic) => {
        this.funFicNew = response;
        this.addFunFicUser = false;
        this.addChapterUser = true;
        this.infoByUser = false;
        this.funFicListSettingUser = false;
        this.readChapterByUser = false;
        this.showFavoriteUser = false;
        this.readChapterByFavorite = false;
        console.log(response)

      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }


  public addChapterPush(addForm: FormGroupDirective): void {
    // @ts-ignore
    document.getElementById("clickAddChapter").click();
    this.chapterService.addChapter(addForm.value, this.funFicNew.id).subscribe(
      (response: Chapter) => {
        this.infoByUser = false;
        this.funFicListSettingUser = false;
        this.readChapterByUser = false;
        this.addFunFicUser = false;
        this.addChapterUser = false;
        this.showFavoriteUser = false;
        this.readChapterByFavorite = false;
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
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
        alert(error.message)
      }
    )
  }

  public addRating(idChapter: number): void {
    // @ts-ignore
    this.ratingResult = this.form ? this.form.get('rating').value : '';

    this.chapterService.addRating(idChapter, this.ratingResult).subscribe(
      (response: Chapter) => {
        console.log(response)
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }
}

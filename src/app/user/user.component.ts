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

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public showMyMessage7 = true;
  public showMyMessage8 = false;
  public showMyMessage9 = false;
  public showMyMessage10 = false;
  public showMyMessage11 = false;

  @Input()
  user!: User;
  // @ts-ignore
  user1: User;
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
  form: FormGroup;
  // @ts-ignore
  genre1: string
  // @ts-ignore
  funFicNew: FunFic;
  // @ts-ignore
  selectedItem: string[]
  // @ts-ignore
  addFunFicForm: FormGroup;
  // @ts-ignore
  addChapterForm: FormGroup;


  constructor(private funFicService: FunFicService, private chapterService: ChapterService, private genreService: GenreService, private tagsService: TagsService) {
    this.form = new FormGroup({
      country: new FormControl(null)
    })
  }

  ngOnInit() {
    this.selectedItem = new Array<string>();
    this.addFunFicForm = new FormGroup({
      "nameFunFic": new FormControl(null, [Validators.required, Validators.pattern("[^a-zA-Z]"), Validators.minLength(4), Validators.maxLength(30)]),
      "shortDescription": new FormControl(null, [Validators.required, Validators.pattern("[^a-zA-Z]"), Validators.minLength(4), Validators.maxLength(60)])
    });
    this.addChapterForm = new FormGroup({
      "numberChapter": new FormControl(null, [Validators.required, Validators.pattern("[^0-9]"), Validators.minLength(4), Validators.maxLength(15)]),
      "nameChapter": new FormControl(null, [Validators.required, Validators.pattern("[^a-zA-Z]"), Validators.minLength(4), Validators.maxLength(30)]),
      "textChapter": new FormControl(null, [Validators.required, Validators.pattern("[^a-zA-Z]"), Validators.minLength(4)])
    });
  }


  getUserListFunficId(): void {
    // @ts-ignore
    this.user1 = JSON.parse(sessionStorage.getItem('user'));
    this.funFicService.getFunFicListId(this.user1.id).subscribe(
      (response: FunFic[]) => {
        this.funFicList = response;
        this.totalLength = this.funFicList.length;
        console.log(this.totalLength);
        this.showMyMessage7 = false;
        this.showMyMessage8 = true;
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
        this.showMyMessage8 = false;
        this.showMyMessage9 = true;
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }

  public deleteFunFicId(id: number) {
    this.funFicService.deleteFunFicById(id).subscribe();
    this.showMyMessage7 = true;
    this.showMyMessage8 = false;
  }

  public showFunFicForm() {
    this.showMyMessage10 = true;
    this.showMyMessage7 = false;
    this.showMyMessage8 = false;
    this.showMyMessage9 = false;
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
        this.showMyMessage10 = false;
        this.showMyMessage11 = true;
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
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }
}

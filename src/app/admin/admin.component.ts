import {Component, OnInit} from '@angular/core';
import {User} from "../model/user";
import {FunFic} from "../model/funFic";
import {HttpErrorResponse} from "@angular/common/http";
import {UserService} from '../service/user.service';
import {FunFicService} from "../service/funFic.service";
import {FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {Genre} from "../model/genre";
import {Tags} from "../model/tags";
import {Chapter} from "../model/chapter";
import {ChapterService} from "../service/chapter.service";
import {GenreService} from "../service/genre.service";
import {TagsService} from "../service/tags.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  public listUserAdmin = false;
  public listFunFicByUser = false;
  public showAddFunFicEmailUser = false;
  public showAddChapterEmailUser = false;
  public addFunFicNotEmail = false;
  // @ts-ignore
  public userList: User[];
  public totalLength: any;
  public page: number = 1;
  // @ts-ignore
  public user: User;
  // @ts-ignore
  public funFicList: FunFic[]
  // @ts-ignore
  public tagList: Tags[];
  // @ts-ignore
  public tagListId: Tags[];
  // @ts-ignore
  public addFunFicForm: FormGroup;
  // @ts-ignore
  public addFunFicFormId: FormGroup;
  // @ts-ignore
  public form: FormGroup;
  // @ts-ignore
  public genreList: Genre[];
  // @ts-ignore
  public genreListId: Genre[];
  // @ts-ignore
  public addChapterForm: FormGroup;
  // @ts-ignore
  public genre1: string
  // @ts-ignore
  public funFicNew: FunFic;
  // @ts-ignore
  public selectedItem: string[]
  // @ts-ignore
  public idUserByAdmin: number;
  // @ts-ignore
  public result: string;

  constructor(private funFicService: FunFicService, private chapterService: ChapterService, private userService: UserService, private genreService: GenreService, private tagsService: TagsService) {
    this.form = new FormGroup({
      country: new FormControl(null)
    })
  }

  ngOnInit(): void {
    this.selectedItem = new Array<string>();
    this.addFunFicForm = new FormGroup({
      "nameFun": new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(30)]),
      "shortDescription": new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(60)]),
      "emailUser": new FormControl(null, [Validators.required, Validators.email, Validators.minLength(4), Validators.maxLength(30)])
    });
    this.addFunFicFormId = new FormGroup({
      "nameFun": new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(30)]),
      "shortDescription": new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(60)])
    });
    this.addChapterForm = new FormGroup({
      "numberChapter": new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(15)]),
      "nameChapter": new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(30)]),
      "textChapter": new FormControl(null, [Validators.required, Validators.minLength(4)])
    });
  }

  showAddFunFicEmail() {
    this.addFunFicNotEmail = false;
    this.listUserAdmin = false;
    this.showAddFunFicEmailUser = true;
    this.listFunFicByUser = false;
    this.showAddChapterEmailUser = false;
    this.genreService.getAllGenre().subscribe(
      (response: Genre[]) => {
        this.genreList = response;
        console.log(response)
      },
      (error: HttpErrorResponse) => {
        this.result = error.message;
      }
    )
    this.tagsService.getAllTags().subscribe(
      (response: Tags[]) => {
        this.tagList = response;
        console.log(response)
      },
      (error: HttpErrorResponse) => {
        this.result = error.message;
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

  public onFunFicPush(addForm: FormGroupDirective) {
    // @ts-ignore
    document.getElementById("clickMessage").click();
    // @ts-ignore
    this.funFicService.addFunFicByAdmin(addForm.value, this.genre1 = this.country, this.selectedItem).subscribe(
      (response: FunFic) => {
        this.funFicNew = response;
        this.listUserAdmin = false;
        this.listFunFicByUser = false;
        this.addFunFicNotEmail = false;
        this.showAddFunFicEmailUser = false;
        this.showAddChapterEmailUser = true;
        console.log(response)
      },
      (error: HttpErrorResponse) => {
        this.result = error.message;
      }
    )
  }

  public addChapterPush(addForm: FormGroupDirective): void {
    // @ts-ignore
    document.getElementById("clickAddChapter").click();
    this.chapterService.addChapterByAdmin(addForm.value, this.funFicNew.id).subscribe(
      (response: Chapter) => {
        this.listUserAdmin = false;
        this.listFunFicByUser = false;
        this.addFunFicNotEmail = false;
        this.showAddFunFicEmailUser = false;
        this.showAddChapterEmailUser = false;
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        this.result = error.message;
      }
    )
  }

  showListUser() {
    this.addFunFicNotEmail = false;
    this.listUserAdmin = true;
    this.showAddFunFicEmailUser = false;
    this.listFunFicByUser = false;
    this.showAddChapterEmailUser = false;
    this.userService.getUsers().subscribe(
      (response: User[]) => {
        this.userList = response;
        this.totalLength = this.userList.length;
      },
      (error: HttpErrorResponse) => {
        this.result = error.message;
      }
    )
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(
      (response: User[]) => {
        this.userList = response;
        this.totalLength = this.userList.length;
      },
      (error: HttpErrorResponse) => {
        this.result = error.message;
      }
    )
  }

  blockUser(id: number) {
    this.userService.blockUser(id).subscribe(
      (response: User[]) => {
        this.userList = response;
        this.totalLength = this.userList.length;
      },
      (error: HttpErrorResponse) => {
        this.result = error.message;
      }
    )
  }

  setAdminUser(id: number) {
    this.userService.setAdminUser(id).subscribe(
      (response: User) => {
        this.user = response;
      },
      (error: HttpErrorResponse) => {
        this.result = error.message;
      }
    )
  }

  getAllFunFic(id: number) {
    this.funFicService.getFunFicListId(id).subscribe(
      (response: FunFic[]) => {
        this.funFicList = response;
        this.addFunFicNotEmail = false;
        this.showAddFunFicEmailUser = false;
        this.showAddChapterEmailUser = false;
        this.listUserAdmin = false;
        this.listFunFicByUser = true;
      },
      (error: HttpErrorResponse) => {
        this.result = error.message;
      }
    )
  }

  showAddFunFic(id: number) {
    this.idUserByAdmin = id;
    this.showAddFunFicEmailUser = false;
    this.listUserAdmin = false;
    this.addFunFicNotEmail = true;
    this.listFunFicByUser = false;
    this.showAddChapterEmailUser = false;
    this.genreService.getAllGenre().subscribe(
      (response: Genre[]) => {
        console.log(response)
        this.genreListId = response;
        console.log(response)
      },
      (error: HttpErrorResponse) => {
        this.result = error.message;
      }
    )
    this.tagsService.getAllTags().subscribe(
      (response: Tags[]) => {
        this.tagListId = response;
        console.log(response)
      },
      (error: HttpErrorResponse) => {
        this.result = error.message;
      }
    )
  }

  public onFunFicPushByIdUser(addForm: FormGroup): void {
    // @ts-ignore
    document.getElementById("clickAddFunFicId").click();
    // @ts-ignore
    this.funFicService.addFunFicByAdminThisUser(addForm.value, this.genre1 = this.country, this.selectedItem, this.idUserByAdmin).subscribe(
      (response: FunFic) => {
        this.funFicNew = response;
        this.listUserAdmin = false;
        this.listFunFicByUser = false;
        this.showAddFunFicEmailUser = false;
        this.addFunFicNotEmail = false;
        this.showAddChapterEmailUser = true;
        console.log(response)
      },
      (error: HttpErrorResponse) => {
        this.result = error.message;
      }
    )
  }
}

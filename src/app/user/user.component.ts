import {Component, Input, OnInit} from '@angular/core';
import {User} from "../model/user";
import {FunFic} from "../model/funFic";
import {HttpErrorResponse} from "@angular/common/http";
import {FunFicService} from "../fun-fic/funFic.Service";
import {Chapter} from "../model/chapter";
import {FormControl, FormGroup, NgForm} from "@angular/forms";
import {CommentRequest} from "../model/CommentRequest";
import {Genre} from "../model/genre";

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
  public funFic: FunFic;
  // @ts-ignore
  public user2: User;

  // @ts-ignore
  form: FormGroup;

  // @ts-ignore
  genre1: string

  constructor(private funFicService: FunFicService) {
    this.form = new FormGroup({
      country: new FormControl(null)
    })
  }

  ngOnInit() {
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
    this.funFicService.getChapterList(id).subscribe(
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
    this.funFicService.getAllGenre().subscribe(
      (response: Genre[]) => {
        this.genreList = response;
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
  public onFunFicPush(addForm: NgForm): void {
    // @ts-ignore
    document.getElementById("clickMessage").click();
    // @ts-ignore
    this.user2 = JSON.parse(sessionStorage.getItem('user'));
    this.funFicService.addFunFic(addForm.value,  this.genre1= this.country, this.user2.id).subscribe(
      (response: FunFic) => {
        console.log(response)

      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }
}

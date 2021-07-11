import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {User} from "./model/user";
import {FormGroup, FormGroupDirective, NgForm} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {FunFicService} from "./service/funFic.service";
import {FunFic} from "./model/funFic";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public showSingInForm = false;
  public showSingUpForm = false;
  public showFunFicTable = true;
  public showFunction = false;
  public showSettingUser = false;
  public showAdminPage = false;
  public reverseForm = true;
  public showAdminFunction = false;
  public addFunFicFormUser = false;
  public showAddChapterEmailUser = false;
  public searchFunFic = false;
  // @ts-ignore
  public user1: User;
  // @ts-ignore
  public addChapterForm: FormGroup;
  // @ts-ignore
  public result:String;
  // @ts-ignore
  public funFic: string;
  @Output()
  funFicSelected = new EventEmitter();
  // @ts-ignore
  funFicResultSearch:FunFic[]
  // @ts-ignore
  public showFunFic;
  constructor(private funFicService: FunFicService) {
  }

  ngOnInit() {
  }

  showStartListPage() {
    this.showSingInForm = false;
    this.showSingUpForm = false;
    this.showFunFicTable = true;
    this.showAdminPage = false;
    this.showSettingUser = false;
    this.addFunFicFormUser = false
    this.showAddChapterEmailUser = false;
    this.searchFunFic = false;
  }


  singInFormReverse() {
    this.showSingInForm = false;
    this.showSingUpForm = false;
    this.showFunFicTable = true;
    this.showFunction = true;
    this.reverseForm = false;
    this.addFunFicFormUser = false
    this.showAddChapterEmailUser = false;
    this.searchFunFic = false;
    // @ts-ignore
    let user = JSON.parse(sessionStorage.getItem('user'))
    for (let i = 0; i <= user.roles.length; i++) {
      if (user.roles[i] == "ROLE_ADMIN") {
        this.showAdminFunction = true;
      }
    }
  }


  showSingIn() {
    this.showAdminPage = false;
    this.showSettingUser = false;
    this.showSingInForm = true;
    this.showSingUpForm = false;
    this.showFunFicTable = false;
    this.addFunFicFormUser = false
    this.showAddChapterEmailUser = false;
    this.searchFunFic = false;
  }

  showSingUp() {
    this.showAdminPage = false;
    this.showSettingUser = false;
    this.showSingUpForm = true;
    this.showSingInForm = false;
    this.showFunFicTable = false;
    this.addFunFicFormUser = false
    this.showAddChapterEmailUser = false;
    this.searchFunFic = false;
  }

  showAdmin() {
    this.showSingUpForm = false;
    this.showSingInForm = false;
    this.showFunFicTable = false;
    this.showSettingUser = false;
    this.showAdminPage = true;
    this.addFunFicFormUser = false
    this.showAddChapterEmailUser = false;
    this.searchFunFic = false;
  }

  showAddFunFic() {
    this.showSingUpForm = false;
    this.showSingInForm = false;
    this.showFunFicTable = false;
    this.showSettingUser = false;
    this.showAdminPage = false;
    this.addFunFicFormUser = true;
    this.showAddChapterEmailUser = false;
    this.searchFunFic = false;
  }

  showSetting() {
    this.showAdminPage = false;
    this.showSingUpForm = false;
    this.showSingInForm = false;
    this.showFunFicTable = false;
    this.showSettingUser = true;
    this.addFunFicFormUser = false
    this.showAddChapterEmailUser = false;
    this.searchFunFic = false;
    // @ts-ignore
    this.user1 = JSON.parse(sessionStorage.getItem('user'));
    console.log(this.user1);
  }


  logout() {
    sessionStorage.removeItem('user');
    this.reverseForm = true;
    this.showFunction = false;
    this.showSingInForm = false;
    this.showSingUpForm = false;
    this.showFunFicTable = false;
    this.showAdminPage = false;
    this.showSettingUser = false;
    this.addFunFicFormUser = false
    this.showAddChapterEmailUser = false;
    this.searchFunFic = false;
  }

  searchFunFicForm(funFic: string){
console.log(funFic)

    this.funFicService.searchFunFic(funFic).subscribe(
      (response: FunFic[]) => {
        this.reverseForm = true;
        this.showFunction = false;
        this.showSingInForm = false;
        this.showSingUpForm = false;
        this.showFunFicTable = false;
        this.showAdminPage = false;
        this.showSettingUser = false;
        this.addFunFicFormUser = false
        this.showAddChapterEmailUser = false;
        this.searchFunFic = true;
        console.log(response)
        this.showFunFic = true;
        this.funFicResultSearch = response;

      },
      (error: HttpErrorResponse) => {
        this.result = error.message;
      }
    )
  }
}

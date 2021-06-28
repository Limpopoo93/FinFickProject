import {Component, OnInit} from '@angular/core';
import {User} from "./user";
import {UserService} from "./user.service";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // @ts-ignore
  public users: User[];
  public showMyMessage = false;
  public showMyMessage1 = false;
  public showMyMessage3 = true;
  public showMyMessage4 = false;
  // @ts-ignore
  public user: User;
  // @ts-ignore
  private currentUserSubject: BehaviorSubject<User>;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.getUsers();
  }

  showMessageSoon() {
    setTimeout(() => {
      this.showMyMessage = true;
      this.showMyMessage1 = false;
      this.showMyMessage3 = false;
    }, 3000)
  }

  showMessageSoon1() {
    setTimeout(() => {
      this.showMyMessage1 = true;
      this.showMyMessage = false;
      this.showMyMessage3 = false;
    }, 3000)
  }

  public getUsers(): void {
    this.userService.getUsers().subscribe(
      (response: User[]) => {
        this.users = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onAddUser(addForm: NgForm): void {
    // @ts-ignore
    document.getElementById("addUser").click();
    this.userService.addUser(addForm.value).subscribe(
      (response: User) => {
        sessionStorage.setItem('user', JSON.stringify(response));
        console.log(response)
        this.getUsers();
        this.showMyMessage4= true;
        this.showMyMessage = false;
        this.showMyMessage1 = false;
        this.showMyMessage3 = true;
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }

  public onLogIsnUser(addForm: NgForm): void {
    // @ts-ignore
    document.getElementById("loginUser").click();
    this.userService.login(addForm.value).subscribe(
      (response: User) => {
        sessionStorage.setItem('user', JSON.stringify(response));
        const session = sessionStorage.getItem('userResult');
        console.log(session)
        console.log(response)
        this.getUsers();
        this.showMyMessage4= true;
        this.showMyMessage = false;
        this.showMyMessage1 = false;
        this.showMyMessage3 = true;
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }

  logout() {
    localStorage.removeItem('currentUser');
    // @ts-ignore
    this.currentUserSubject.next(null);
  }
}

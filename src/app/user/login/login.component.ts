import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {User} from "../../model/user";
import {UserService} from "../user.service";
import {NgForm} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // @ts-ignore
  public user: User;

  @Output()
  onShowElementIn = new EventEmitter();
  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }
  public onLogIsnUser(addForm: NgForm): void {
    // @ts-ignore
    document.getElementById("loginUser").click();
    this.userService.login(addForm.value).subscribe(
      (response: User) => {
        this.onShowElementIn.emit();
        sessionStorage.setItem('user', JSON.stringify(response));

      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }

}

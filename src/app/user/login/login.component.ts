import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {User} from "../../model/user";
import {FormGroupDirective, NgForm} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {FormControl, FormGroup, Validators} from "@angular/forms"
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // @ts-ignore
  public user: User;
  // @ts-ignore
  public singInForm: FormGroup;
  // @ts-ignore
  public result: string;

  @Output()
  onShowElementIn = new EventEmitter();
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.singInForm = new FormGroup({
      "login": new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(15)]),
      "password": new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(15)])
    })
  }


  public onLogIsnUser(addForm: FormGroupDirective): void {
    // @ts-ignore
    document.getElementById("loginUser").click();
    this.userService.login(addForm.value).subscribe(
      (response: User) => {
        this.onShowElementIn.emit();
        sessionStorage.setItem('user', JSON.stringify(response));

      },
      (error: HttpErrorResponse) => {
        this.result = error.message;
      }
    )
  }

}

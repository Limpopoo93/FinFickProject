import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {User} from "../../model/user";
import {BehaviorSubject} from "rxjs";
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  // @ts-ignore
  public user: User;
  @Output()
  onShowElementUn = new EventEmitter();
  // @ts-ignore
  singUpForm: FormGroup;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.singUpForm = new FormGroup({
      "login": new FormControl(null, [Validators.required, Validators.pattern("[^a-zA-Z0-9]"), Validators.minLength(4), Validators.maxLength(15)]),
      "password": new FormControl(null, [Validators.required, Validators.pattern("[^a-zA-Z0-9]"), Validators.minLength(4), Validators.maxLength(15)]),
      "email": new FormControl(null, [Validators.required, Validators.email, Validators.minLength(4), Validators.maxLength(30)]),
      "nameUser": new FormControl(null, [Validators.required, Validators.pattern("[^a-zA-Z]"), Validators.minLength(4), Validators.maxLength(15)]),
      "surnameUser": new FormControl(null, [Validators.required, Validators.pattern("[^a-zA-Z]"), Validators.minLength(4), Validators.maxLength(15)])
    })
  }
  public onAddUser(addForm: FormGroupDirective): void {
    // @ts-ignore
    document.getElementById("addUser").click();
    this.userService.addUser(addForm.value).subscribe(
      (response: User) => {
        this.onShowElementUn.emit();
        sessionStorage.setItem('user', JSON.stringify(response));
        console.log(response)
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }
}

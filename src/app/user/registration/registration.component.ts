import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {User} from "../../model/user";
import {BehaviorSubject} from "rxjs";
import {UserService} from "../user.service";
import {NgForm} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";

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

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }
  public onAddUser(addForm: NgForm): void {
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

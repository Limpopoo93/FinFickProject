import { Component, OnInit } from '@angular/core';
import {User} from "../model/user";
import {FunFic} from "../model/funFic";
import {HttpErrorResponse} from "@angular/common/http";
import { UserService } from '../service/user.service';
import {FunFicService} from "../service/funFic.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  public showMyMessage1 = false;
  public showMyMessage2 = false;
  public showMyMessage3 = false;
  // @ts-ignore
  public userList: User[];
  public totalLength: any;
  public page: number=1;
  // @ts-ignore
  public user:User;
  // @ts-ignore
  public funFicList: FunFic[]


  constructor(private userService: UserService, private funFicService: FunFicService) { }

  ngOnInit(): void {
  }

  showMessageSoon1() {
    this.showMyMessage1 = true;
    this.showMyMessage2 = false;
  }

  showMessageSoon2() {
    this.showMyMessage1 = false;
    this.showMyMessage2 = true;
    this.userService.getUsers().subscribe(
      (response: User[]) => {
        this.userList = response;
        this.totalLength=this.userList.length;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(
      (response: User[]) => {
        this.userList = response;
        this.totalLength=this.userList.length;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  blockUser(id: number) {
    this.userService.blockUser(id).subscribe(
      (response: User[]) => {
        this.userList = response;
        this.totalLength=this.userList.length;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  setAdminUser(id: number) {
    this.userService.setAdminUser(id).subscribe(
      (response: User) => {
        this.user = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  getAllFunFic(id: number) {
    this.funFicService.getFunFicListId(id).subscribe(
      (response: FunFic[]) => {
        this.funFicList = response;
        this.showMyMessage1 = false;
        this.showMyMessage2 = false;
        this.showMyMessage3 = true;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
}

import {Component, OnInit} from '@angular/core';
import {User} from "./model/user";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public showMyMessage = false;
  public showMyMessage1 = false;
  public showMyMessage3 = true;
  public showMyMessage4 = false;
  public showMyMessage6 = false;
  public showMyMessage8 = false;
  // @ts-ignore
  user1: User;

  constructor() {
  }

  ngOnInit() {
  }

  showMessageSoon2() {
    this.showMyMessage = false;
    this.showMyMessage1 = false;
    this.showMyMessage3 = true;
    this.showMyMessage8 = false;
    this.showMyMessage6 = false;
  }


  showMessageSoon7() {
    this.showMyMessage = false;
    this.showMyMessage1 = false;
    this.showMyMessage3 = true;
    this.showMyMessage4 = true;
  }


  showMessageSoon() {
    this.showMyMessage8 = false;
    this.showMyMessage6 = false;
    this.showMyMessage = true;
    this.showMyMessage1 = false;
    this.showMyMessage3 = false;
  }

  showMessageSoon1() {
    this.showMyMessage8 = false;
    this.showMyMessage6 = false;
    this.showMyMessage1 = true;
    this.showMyMessage = false;
    this.showMyMessage3 = false;
  }

  showMessageSoon8() {
    this.showMyMessage1 = false;
    this.showMyMessage = false;
    this.showMyMessage3 = false;
    this.showMyMessage6 = false;
    this.showMyMessage8 = true;
  }


  showMessageSoon6() {
    this.showMyMessage8 = false;
    this.showMyMessage1 = false;
    this.showMyMessage = false;
    this.showMyMessage3 = false;
    this.showMyMessage6 = true;
    // @ts-ignore
    this.user1 = JSON.parse(sessionStorage.getItem('user'));
    console.log(this.user1);
  }


  logout() {
    localStorage.removeItem('currentUser');
    // @ts-ignore
    this.currentUserSubject.next(null);
  }
}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {UserService} from "./user/user.service";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { UserComponent } from './user/user.component';
import { FunFicComponent } from './fun-fic/fun-fic.component';
import { LoginComponent } from './user/login/login.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { FunFicTableComponent } from './fun-fic/fun-fic-table/fun-fic-table.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { ChapterComponent } from './chapter/chapter.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    FunFicComponent,
    LoginComponent,
    RegistrationComponent,
    FunFicTableComponent,
    ChapterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { UserComponent } from './user/user.component';
import { FunFicComponent } from './fun-fic/fun-fic.component';
import { LoginComponent } from './user/login/login.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { FunFicTableComponent } from './fun-fic/fun-fic-table/fun-fic-table.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { ChapterComponent } from './chapter/chapter.component';
import { AdminComponent } from './admin/admin.component';
import {UserService} from "./service/user.service";
import {ChapterService} from "./service/chapter.service";
import {CommentService} from "./service/comment.service";
import {FunFicService} from "./service/funFic.service";
import {GenreService} from "./service/genre.service";
import {TagsService} from "./service/tags.service";



@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    FunFicComponent,
    LoginComponent,
    RegistrationComponent,
    FunFicTableComponent,
    ChapterComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ],
  providers: [UserService, ChapterService, CommentService, FunFicService, GenreService, TagsService],
  bootstrap: [AppComponent]
})
export class AppModule { }

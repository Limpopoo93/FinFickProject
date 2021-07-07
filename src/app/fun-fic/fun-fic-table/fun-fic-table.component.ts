import { Component, OnInit } from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {FunFic} from "../../model/funFic";
import {Chapter} from "../../model/chapter";
import {CommentRequestDtos} from "../../model/commentDto";
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {User} from "../../model/user";
import {CommentRequest} from "../../model/CommentRequest";
import { FunFicService } from 'src/app/service/funFic.service';
import {CommentService} from "../../service/comment.service";
import {ChapterService} from "../../service/chapter.service";

@Component({
  selector: 'app-fun-fic-table',
  templateUrl: './fun-fic-table.component.html',
  styleUrls: ['./fun-fic-table.component.css']
})
export class FunFicTableComponent implements OnInit {
  // @ts-ignore
  public funFicList: FunFic[];
  // @ts-ignore
  public chapterList: Chapter[];
  // @ts-ignore
  public commentDtoList: CommentRequestDtos[];
  public showMyMessage3 = false;
  public showMyMessage5 = false;
  public totalLength: any;
  public page: number=1;
  // @ts-ignore
  addFormComments: FormGroup;

  constructor(private funFicService: FunFicService, private commentService: CommentService, private chapterService: ChapterService) {

  }

  ngOnInit(): void {
    this.getFunFicList();
    this.addFormComments = new FormGroup({
      "textComments": new FormControl(null, [Validators.required, Validators.pattern("[^a-zA-Z]"), Validators.minLength(4), Validators.maxLength(50)]),
      "email": new FormControl(null, [Validators.required, Validators.email, Validators.minLength(4), Validators.maxLength(15)])
    })
  }
  public getFunFicList(): void {
    this.funFicService.getFunFicList().subscribe(
      (response: FunFic[]) => {
        this.funFicList = response;
        this.totalLength=this.funFicList.length;
        console.log(this.totalLength);
        this.showMyMessage3 = true;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
  public getIdChapter(id: number){
    this.chapterService.getChapterList(id).subscribe(
      (response: Chapter[]) => {
        this.chapterList = response;
        console.log(response);
        this.showMyMessage3 = false;
        this.showMyMessage5 = true;
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }
  public onCommentPush(addForm: FormGroupDirective, id: number): void {
    // @ts-ignore
    document.getElementById("clickMessage").click();
    this.commentService.addComments(addForm.value, id).subscribe(
      (response: CommentRequest) => {
        console.log(response)
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }
}

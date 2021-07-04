import { Component, OnInit } from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {FunFicService} from "../funFic.Service";
import {FunFic} from "../../model/funFic";
import {Chapter} from "../../model/chapter";
import {CommentRequestDtos} from "../../model/commentDto";
import {NgForm} from "@angular/forms";
import {User} from "../../model/user";
import {CommentRequest} from "../../model/CommentRequest";

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

  constructor(private funFicService: FunFicService) {

  }

  ngOnInit(): void {
    this.getFunFicList();
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
    this.funFicService.getChapterList(id).subscribe(
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
  public onCommentPush(addForm: NgForm, id: number): void {
    // @ts-ignore
    document.getElementById("clickMessage").click();
    this.funFicService.addComments(addForm.value, id).subscribe(
      (response: CommentRequest) => {
        console.log(response)
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }
}

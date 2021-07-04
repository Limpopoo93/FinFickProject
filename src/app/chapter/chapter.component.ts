import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.css']
})
export class ChapterComponent implements OnInit {
  public showMyMessage5 = true;

  constructor() {
  }

  ngOnInit(): void {
  }

}

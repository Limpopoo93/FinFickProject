import {FunFic} from "./funFic";
import {CommentRequestDtos} from "./commentDto";

export interface Chapter {
  id: number;
  numberChapter: number;
  nameChapter: string;
  textChapter: string;
  commentDto: Array<CommentRequestDtos>
}

import {CommentRequestDtos} from "./commentDto";

export interface Chapter {
  id: number;
  numberChapter: number;
  nameChapter: string;
  textChapter: string;
  idFunFic: number;
  commentDto: Array<CommentRequestDtos>;
  emailUser: string
  like: number;
  rating: number;
  idUser: number;
}

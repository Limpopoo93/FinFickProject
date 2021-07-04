import {User} from "./user";
import {Genre} from "./genre";
import {Tags} from "./tags";

export interface FunFic {
  id: number;
  nameFun: string;
  shortDescription: string;
  rating: number;
  like: number;
  created: Date;
  genre: String;
  tags: Array<Tags>;
  idUser: number;
}

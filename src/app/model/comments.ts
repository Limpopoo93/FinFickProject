import {User} from "./user";
import {FunFic} from "./funFic";

export interface Comments {
  id: number;
  textComment: string;
  created: Date;
  user: User;
  funFiction: FunFic;
}

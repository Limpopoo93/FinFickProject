import {Role} from "./role";

export interface User {
  id: number;
  login: string;
  email: string;
  password: string;
  nameUser: string;
  surnameUser: string;
  background: string;
  language: string;
  status: string;
  idChapter: number;
  rating: number;
  roles: string[];
  like: number;
}

export type Profile = {
  id: number;
  name: string;
  age: number;
  bio: string;
  longBio: string;
  image: string;
  gender: GenderEnum;
};

export enum GenderEnum {
  MALE = "male",
  FEMALE = "female",
  ALL = "all",
}

export interface Convos {
  [key: number]: Message[];
}

export interface Message {
  id: number;
  content: string;
  createdAt: Date;
}

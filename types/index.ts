export type Profile = {
  id: number;
  name: string;
  age: number;
  bio: string;
  image: string;
};

export interface Convos {
  [key: number]: Message[];
}

export interface Message {
  id: number;
  content: string;
  createdAt: Date;
}

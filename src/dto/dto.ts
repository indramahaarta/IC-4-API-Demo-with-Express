export interface UserInputDto {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface PostInputDto {
  title: string;
  content: string;
  creatorId: number;
}

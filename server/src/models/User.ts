export interface CreateUserDTO {
  username: string;
  email: string;
  password: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  balance: number;
  createdAt: Date;
  updatedAt: Date;
}

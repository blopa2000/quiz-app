export interface User {
  name: string;
  avatar: string;
}

export interface DataAccess {
  email: string;
  password: string;
}

export interface UserExists {
  uid: string;
  email: string | null;
}

export interface Auth {
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
  role?: string;
}

export interface  CheckUserLogin {
  name: string | null;
  email: string | null;
}

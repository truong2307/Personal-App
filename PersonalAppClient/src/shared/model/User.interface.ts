export interface UserLogin {
  email: string;
  password: string;
  token?: string;
}

export interface UserRegister {
  email: string;
  password: string,
  fullName: string,
  phoneNumber: string,
}


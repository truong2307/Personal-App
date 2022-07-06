export interface UserLogin {
  EmailOrUserName: string;
  password: string;
  token?: string;
}

export interface UserRegister {
  email: string;
  password: string,
  fullName: string,
  userName: string,
  phoneNumber: string,
}

export interface UserForAdminManagerDto {
  fullName: string,
  userName: string,
  role: string,
  email: string,
}

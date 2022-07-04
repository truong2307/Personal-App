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

export interface UserForAdminManagerDto {
  fullName: string,
  userName: string,
  role: string,
  email: string,
}

export class UserLogin {
  EmailOrUserName!: string;
  password!: string;
  token?: string;
}

export class UserRegister {
  email!: string;
  password!: string;
  fullName!: string;
  userName!: string;
  phoneNumber!: string;
}

export class UserForAdminManagerDto {
  userId!: string;
  fullName!: string;
  userName!: string;
  role!: string;
  email!: string;
}

export class UpdateUser {
  userId!: string;
  role!: string;
}

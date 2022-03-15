interface IUser {
  id: number;
  name: string;
  password: string;
  email: string;
  timestamp: string;
}

interface IUserRegister {
  name: string;
  email: string;
  password: string
}

interface IUserLogin {
  email: string;
  password: string;
}

export {IUserRegister, IUser, IUserLogin}

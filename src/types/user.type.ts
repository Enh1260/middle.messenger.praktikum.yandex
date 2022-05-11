interface ICommonUser extends Response{
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
  password: string;
}

export type TUser = Omit<ICommonUser, 'password'>

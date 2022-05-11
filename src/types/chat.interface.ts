import { TUser } from './user.type';

export interface IChat{
    id: number,
    title: string,
    avatar: string,
    unread_count: number,
    users?: TUser[],
    created_by?: number,
    last_message: {
      user: TUser,
      time: string,
      content: string
    }
  }

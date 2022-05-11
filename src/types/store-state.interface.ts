import { TUser } from './user.type';
import { IMessage } from './message.interface';
import { IChat } from './chat.interface';

export interface IStoreState{
  messages?: IMessage[];
  currentUserId?: number;
  currentChat?: IChat;
  currentUser?: TUser;
}

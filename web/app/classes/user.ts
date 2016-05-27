import {IUser} from './iuser';

export class User implements IUser {
  constructor(public username:string, public email:string,  public name: string){}
}

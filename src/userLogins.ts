export const VALID_USERS = {
  users: [
    {
      userLogin: 'test@gmail.com',
      password: 'Nu0cyjZY&7C'
    },
    {
      userLogin: 'matt@gmail.com',
      password: 'this is a v@lid password!'
    },
    {
      userLogin: 'jake@microsoft.com',
      password: 'Ev9LDHVXVm0jlVkyUpm3cK&DTxvzX@of7USM3plzoX9A'
    },
    {
      userLogin: 'john@google.com',
      password: '!tSp5*MHhzfm@I27*B@'
    }
  ]
}

export type UserAuth = { userLogin: string, password: string} | undefined

interface AuthService {
  validateUser(user: UserAuth) : boolean 
}

class DummyAuthService implements AuthService{
  validateUser(user: UserAuth) : boolean {
    console.log(user);
    return VALID_USERS.users.find(u => u.userLogin === user?.userLogin && u.password == user.password) !== undefined;
  }
}

export const userService = new DummyAuthService();
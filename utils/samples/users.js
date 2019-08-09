const 
  validUser = {
    username: 'test21',
    email: 'test21@test21.com',
    password: '123455aa',
    confirmPass: '123455aa'
  },
  invalidUser = {
    username: 'user',
    email: 'test21.com',
    password: '15aa',
    confirmPass: '123455aa'
  },
  userNotFound = {
    username: '404notFound',
    email: 'usernameNot@found.com',
    password: 'usernamenotfound'
  },
  mongoUser = {
    _id: 'test21',
    ...validUser
  },
  invalidPassword = {
    username: 'test21',
    password: 'abc123aa'
  }
  emptyUser = {};

module.exports = {
  validUser,
  invalidUser,
  userNotFound,
  mongoUser,
  emptyUser,
  invalidPassword
};

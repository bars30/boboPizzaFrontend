export const url = ' http://localhost:3000/';
export const environment = {
 login: {
    get: url + 'auth/login'
  },
  register: {
    get: url + 'auth/register'
  },
  logout: {
    get: url + 'auth/logout'
  }, 
  forgotPassword: {
    get: url + 'password/forgot-password'
  },
  resetPassword: {
    get: url + 'password/reset-password'
  },
  updateUserInfo: {
      get: url + 'users/user/update/'
  },
  getPizzas:{
      get: url + 'products/pizzas'
  },
  drinks: {
      get: url + 'products/drinks'
  },
  desserts: {
    get: url + 'products/desserts'
  }
}; 
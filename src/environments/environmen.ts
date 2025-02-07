export const url = 'http://localhost:8000/';
export const environment = {
  login: url + 'auth/login',
  register: url + 'auth/register',
  logout: url + 'auth/logout',
  forgotPassword: url + 'password/forgot-password',
  resetPassword: url + 'password/reset-password',
  updateUserInfo: url + 'users/user/update/',
  getPizzas: url + 'products/pizzas',
  drinks: url + 'products/drinks',
  desserts: url + 'products/desserts',
  breakfasts: url + 'products/breakfasts',
  snacks: url + 'products/snacks',
  addToCart: url + 'cart/add-to-cart'
};

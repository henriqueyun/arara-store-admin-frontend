const AuthService = (http) => ({
  signIn: async ({ email, password }) =>
    http.post('/login/admin', { email, password }),
});

export default AuthService;

import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = "http://localhost:3000";

const signup = async (user) => {
  try {
    const response = await axios
      .post(BASE_URL + "/user/signup", user);
    if (response.data.status) {
      toast.success(response.data.mensagem);
    } else {
      toast.error(response.data.mensagem);;
    }
  } catch {
    toast.error("Erro ao cadastrar Usuário!");
    return false;
  }
};

const login = (user) => {
  return axios
    .post(BASE_URL + "/user/login", user)
    .then((response) => {
      if (response.data) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        toast.success("Usuário logado com sucesso!");
        window.location.href = '/';
      } else {
        toast.error("Usuário ou senha inválidos!");
        return response.data;
      }
    })
    .catch(() => {
      toast.error("Usuário ou senha inválidos!");
      return false;
    });
};

const logout = () => {
  localStorage.removeItem("token")
};

const isAuthenticated = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  }
  const valid = await axios.get(`${BASE_URL}/user/getValidUser/${token}`);
  return valid;
};

const resetPassword = (email) => { 
  debugger;
  return axios
  .post(BASE_URL + "/email/sendEmail", email)
  .then((response) => {
    debugger;
    if (response.data) {
      toast.success("Email enviado com sucesso!");
      window.location.href = '/';
    } else {
      toast.error("Email não enviado!");
      return response.data;
    }
  })
  .catch(() => {
    toast.error("Email não enviado!");
    return false;
  });
}

const AuthService = {
  signup,
  login,
  logout,
  isAuthenticated,
  resetPassword
};

export default AuthService;
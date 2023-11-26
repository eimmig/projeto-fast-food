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
        localStorage.setItem("token", JSON.stringify(response.data));
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

const isAuthenticated = () => {
  return localStorage.getItem("token") ? true : false;
};

const AuthService = {
  signup,
  login,
  logout,
  isAuthenticated,
};

export default AuthService;
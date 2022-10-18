import axios from "axios";
import { User } from "types/user";

const URL = "https://fakestoreapi.com/users/";

const read = () => {
  return axios.get(URL);
};

const create = async (user: User) => {
  return axios.post(URL, user);
};

const update = async (user: User) => {
  return axios.put(URL + user.id.toString(), user);
};

const del = async (id: number) => {
  return axios.delete(URL + id.toString());
};

const userService = {
  create,
  read,
  update,
  del,
};
export default userService;

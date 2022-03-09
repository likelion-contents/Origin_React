import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "886dba6c33e264d34c0abd935132f119",
    language: "ko-KR",
  },
});

export default instance;

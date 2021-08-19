import { createContext } from "react";

const LoginContext = createContext([
  {
    isloggedIn: false,
    token: ""
  },
  () => {}
]);

export default LoginContext;

import { AxiosService } from "./axios.service";

export class AuthService extends AxiosService {
  // doDeposit = () => {
  //   // return  this.SendMessageByPost('/user/get_member')
  //   return axios
  //     .post("assets/data/deposit_list.json", { balance: balance })
  //     .then((res) => res.data);
  // };

  doLogin = (id: any, pw: any) => {
    return this.SendMessageByPost("/user/do_login?", { id: id, pw: pw });
  };

  healthCheck = () => {
    return this.SendMessageByPost("/user/user_health_check", {});
  };
}

// export function signIn({ email, password }) {
//   const user = users.find(
//     (user) => user.email === email && user.password === password
//   );
//   if (user === undefined) throw new Error();
//   return user;
// }

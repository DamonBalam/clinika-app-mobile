import { API } from "src/common/api";
import axios from "axios";
import { IResponse, IResponseAuth } from "src/services/Response";
import { IUser } from "./IUser";

class AuthDataService {
  async login(email: string, password: string): Promise<IResponseAuth<IUser>> {
    let response = await API.post("login", { data: { email, password } });
    // let response = axios.post(
    //   "https://phplaravel-1203103-4252935.cloudwaysapps.com/api/login",
    //   {
    //     email,
    //     password,
    //   }
    // );

    return response;
  }

  async logout(): Promise<IResponse<null>> {
    let response = await API.get("logout", {});
    return response;
  }

  async recover(email: string): Promise<IResponse<any>> {
    let response = await API.post("recover/password", { data: { email } });
    return response;
  }

  async updatePassword(
    email: string,
    password: string
  ): Promise<IResponse<any>> {
    let response = await API.post("recover/custom-password", {
      data: { email, password },
    });
    return response;
  }
}

export const authDataServices = new AuthDataService();

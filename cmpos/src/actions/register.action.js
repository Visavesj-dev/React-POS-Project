import { REGISTER_FETCHING, server } from "../constants";
import { httpClient } from "./../utils/HttpClient";

export const register = async (values, history) => {
  let result = await httpClient.post(server.REGISTER_URL, values);
  console.log(JSON.stringify(result.data));
  if (result.data.result == "ok") {
    history.goBack();
  } else {
    alert("Invalid username or password");
  }
};

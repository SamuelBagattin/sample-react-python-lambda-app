import axios, {AxiosInstance} from "axios";

export const client: AxiosInstance = axios.create({
    baseURL: "https://dc8h3ady12.execute-api.eu-west-1.amazonaws.com/dev",
});

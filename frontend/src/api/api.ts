import axios, {AxiosInstance} from "axios";

const client: AxiosInstance = axios.create({
    baseURL: "https://ayoxentyy1.execute-api.eu-west-1.amazonaws.com/prod",
    // baseURL: "http://localhost:5000",
});

export const getTodos = () => client.get<TodoResponse[]>("/")

export const postTodo = (todo: TodoRequest) => client.post("/", todo)

export interface TodoRequest{
    name: string
}

export interface TodoResponse{
    id: string
    name: string
}

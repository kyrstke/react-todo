import { client, ResponseAPI } from "../api/client"


export const updateTodo = async (id: string, done: boolean): Promise<ResponseAPI> => {
    const { data } = await client.put(`${id}`, { done });
    return data;
}
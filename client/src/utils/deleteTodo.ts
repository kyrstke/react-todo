import { client, ResponseAPI } from "../api/client"


export const deleteTodo = async (id: string): Promise<ResponseAPI> => {
    const { data } = await client.delete(`${id}`);
    return data;
}
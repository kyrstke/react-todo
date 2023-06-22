import { client, ResponseAPI } from "../api/client"


export const createTodo = async (text: string): Promise<ResponseAPI> => {
    const { data } = await client.post('', { text });
    return data;
}
import { client, ResponseAPI } from "../api/client"


export const getTodos = async (): Promise<ResponseAPI[]> => {
    const { data } = await client.get('');
    return data;
}
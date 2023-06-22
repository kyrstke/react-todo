import axios from 'axios';

export const client = axios.create({
    baseURL: 'http://localhost:4000/api/todos',
});

export interface ResponseAPI {
    _id: string;
    text: string;
    done: boolean;
}

export const createTodo = async (text: string): Promise<ResponseAPI> => {
    const { data } = await client.post('', { text });
    return data;
}

export const getTodos = async (): Promise<ResponseAPI[]> => {
    const { data } = await client.get('');
    return data;
}

export const updateTodo = async (id: string, done: boolean): Promise<ResponseAPI> => {
    const { data } = await client.put(`${id}`, { done });
    const todo = await data.json();
    return todo;
}

export const deleteTodo = async (id: string): Promise<ResponseAPI> => {
    const { data } = await client.delete(`${id}`);
    return data;
}
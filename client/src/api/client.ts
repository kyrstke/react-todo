import axios from 'axios';

export const client = axios.create({
    baseURL: 'http://localhost:4000/api/todos',
});

export interface ResponseAPI {
    _id: string;
    text: string;
    done: boolean;
}
import { ResponseAPI } from "../api/client";
import DeleteButton from "./DeleteButton";


interface TodoProps {
    todo: ResponseAPI;
    onCheckboxChange: (id: string, done: boolean) => void;
    onDelete: (id: string) => void;
}

export const Todo = ({ todo, onCheckboxChange, onDelete }: TodoProps) => {
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onCheckboxChange(todo._id, event.target.checked);
    };

    const handleDelete = () => {
        onDelete(todo._id);
    };

    return (
        <div className={"flex justify-between items-center"} key={todo._id}>
            <span className={"mr-5" + (todo.done ? ' text-decoration-line: line-through' : '')}>{todo.text}</span>
            <div className="flex items-center">
                <input className="mx-2" type="checkbox" checked={todo.done} onChange={handleCheckboxChange} />
                <DeleteButton id={todo._id} onDelete={handleDelete} />
            </div>
        </div>
    );
};
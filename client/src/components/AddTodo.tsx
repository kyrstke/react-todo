import { useState } from "react";

interface AddTodoProps {
    onAdd: (text: string) => void;
}

export const AddTodo = ({ onAdd }: AddTodoProps) => {
    const [text, setText] = useState("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onAdd(text);
        setText("");
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    };

    return (
        <form className="flex justify-between items-center" onSubmit={handleSubmit}>
            <input className="w-full h-8 p-2" type="text" placeholder="Type a new task..." value={text} onChange={handleChange} />
            <button className="button ml-3" type="submit">Add</button>
        </form>
    );
};
import { useEffect, useState } from "react";
import { ResponseAPI, createTodo, getTodos, updateTodo, deleteTodo } from "../api/client";
import { ErrorBoundary } from "react-error-boundary";
import { Todo } from "./Todo";
import { AddTodo } from "./AddTodo";

enum Filter {
    All = "all",
    Todo = "todo",
    Done = "done",
}

export const TodoList = () => {
    const [todos, setTodos] = useState<ResponseAPI[]>([]);
    const [checkboxes, setCheckboxes] = useState<{ [key: string]: boolean }>({});
    const [filter, setFilter] = useState<Filter>(Filter.All);

    useEffect(() => {
        getTodos()
            .then((data) => {
                setTodos(data);
                setCheckboxes(data.reduce((acc, todo) => ({ ...acc, [todo._id]: todo.done }), {}));
            });
    }, [checkboxes]);

    const handleUpdate = async (id: string, done: boolean) => {
        try {
            const updatedTodo = await updateTodo(id, done);
            setTodos(todos.map((todo) => {
                if (todo._id === updatedTodo._id) {
                    return updatedTodo;
                }
                return todo;
            }));
        } catch (error: any) {
            console.error(`Error updating todo with id ${id}: ${error.message}`);
            // Handle the error here, e.g. by displaying an error message to the user
        }
        setCheckboxes({ ...checkboxes, [id]: !checkboxes[id] });
    };

    const handleDelete = async (id: string) => {
        try {
            // Delete the todo item from the server
            await deleteTodo(id);
            // Remove the todo item from the list
            setTodos(todos.filter((todo) => todo._id !== id));
        } catch (error: any) {
            console.error(`Error deleting todo with id ${id}: ${error.message}`);
            // Handle the error here, e.g. by displaying an error message to the user
        }
    };

    const handleAdd = async (text: string) => {
        try {
            // Add the new todo item to the server
            const newTodo = await createTodo(text);
            // Add the new todo item to the list
            setTodos([...todos, newTodo]);
            setCheckboxes({ ...checkboxes, [newTodo._id]: newTodo.done });
        } catch (error: any) {
            console.error(`Error adding todo: ${error.message}`);
            // Handle the error here, e.g. by displaying an error message to the user
        }
    };

    const filteredTodos = todos.filter((todo) => {
        if (filter === Filter.Todo) {
            return !todo.done;
        } else if (filter === Filter.Done) {
            return todo.done;
        }
        return true;
    });

    return (
        <>
            <h1 className="text-5xl font-bold mb-10">Todo List</h1>
            <div className="flex justify-center gap-3">
                <button className="button" onClick={() => setFilter(Filter.All)}>All</button>
                <button className="button" onClick={() => setFilter(Filter.Todo)}>Todo</button>
                <button className="button" onClick={() => setFilter(Filter.Done)}>Done</button>
            </div>
            <ErrorBoundary fallback={<div>Something went wrong</div>}>
                <div className="my-8">
                    {!todos ? "Loading..." : filteredTodos.map((todo: ResponseAPI) => (
                        <Todo key={todo._id} todo={todo} onCheckboxChange={handleUpdate} onDelete={handleDelete} />
                    ))}
                </div>
                <AddTodo onAdd={handleAdd} />
            </ErrorBoundary>
        </>
    );
};
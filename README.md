# Overview

The code is a React component that displays a todo list. The UI has three buttons to filter the todos according to whether they are 'Todo', 'Done' or 'All'. It uses an ErrorBoundary to handle any errors that might occur while rendering this component and its children.

# Spec

The component has the following parts:

- h1 header with the title 'Todo List'.
- Three filter buttons that when clicked will update the 'filter' state of the component to 'Todo', 'Done' or 'All'.
- An ErrorBoundary wrapper that contains the Todo components.
- A list of Todo components.
- An AddTodo component at the bottom, allowing users to add new todos.

# Suggestions

Some suggestions for the code include:

- Since `filter` is initialized as 'All', the first button 'All' need not be shown as active when the component is initially rendered. Therefore we can disable it.

```jsx
<button className="button" disabled={filter === Filter.All} onClick={() => setFilter(Filter.All)}>All</button>
```

- We can add more context to the 'Loading...' message by stating that todos are being fetched.

```jsx
{!todos ? "Fetching todos..." : filteredTodos.map((todo: ResponseAPI) => (
    <Todo key={todo._id} todo={todo} onCheckboxChange={handleUpdate} onDelete={handleDelete} />
))}
```

- For better readability, we can destructure `setFilter`, `filteredTodos`, `handleUpdate`, `handleDelete` and `handleAdd` from props.

```jsx
const TodoList: React.FC<Props> = ({ setFilter, filteredTodos, handleUpdate, handleDelete, handleAdd }) => {
```

- We need to specify the type for Props to ensure that it matches what the component expects.

```jsx
type Props = {
    setFilter: React.Dispatch<React.SetStateAction<Filter>>;
    filteredTodos: ResponseAPI[];
    handleUpdate: (id: string, done: boolean) => void;
    handleDelete: (id: string) => void;
    handleAdd: (value: string) => void;
}
```

- We can add a debounce effect to the AddTodo component's input field to prevent it from rendering on every letter typed.

```jsx
<InputDebounce value={value} onValueChange={setValue} delay={300} placeholder="Add a todo..." />
```

`InputDebounce` can be a separate functional component that implements the `useEffect` hook.

```jsx
type InputDebounceProps = {
    value: string;
    onValueChange(newVal: string): void;
    delay: number;
    placeholder: string;
}

const InputDebounce: React.FC<InputDebounceProps> = ({value, onValueChange, delay, placeholder}) => {
    const [innerValue, setInnerValue] = useState(value);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (innerValue !== value) {
                onValueChange(innerValue);
            }
        }, delay);
        return () => {
            clearTimeout(timeoutId);
        };
    }, [innerValue, value, delay, onValueChange]);
    
    return <input value={innerValue} onChange={event => setInnerValue(event.target.value)} placeholder={placeholder}/>;
}
```

This ensures that the `onChange` event does not update the `value` state variable rapidly as each new letter is typed.

interface DeleteButtonProps {
    id: string;
    onDelete: (id: string) => void;
}

export default function DeleteButton({ id, onDelete }: DeleteButtonProps) {

    return (
        <button className="material-symbols-outlined scale-75" onClick={() => onDelete(id)}>
            delete
        </button>
    )
}
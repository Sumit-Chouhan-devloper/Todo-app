// TodoListItem.js
import { TrashIcon, CheckCircleIcon } from "@heroicons/react/24/solid";

interface TodoProps {
  title: string;
  isCompleted: boolean;
  id: string;
  onDelete: (id: string) => void;
   onComplete: (id: string, isCompleted: boolean) => void;
}

const TodoListItem = ({ title, isCompleted, id, onDelete ,onComplete}: TodoProps) => {
  const handleDelete = () => {
    onDelete(id);
  };
  const handleComplete = () => {
    onComplete(id, !isCompleted ,);
  };

  return (
    <div
      id={id}
      className="flex justify-between items-center transition-all px-4 hover:bg-slate-100 py-[10px] border_remove"
    >
      <p
        className={`ff_inter text-slate-500 text-sm ${
          isCompleted ? "line-through" : ""
        }`}
      >
        {title}
      </p>
      <div className="flex gap-3">
        <button
          onClick={handleDelete}
          className="text-slate-500 hover:text-red-500 duration-300 transition-all"
        >
          <TrashIcon height={24} width={24} />
        </button>
        <button  onClick={handleComplete}
            className={`text-slate-500 hover:opacity-70 transition-all ${
              isCompleted ? "!text-green-500" : " "
            }`}
          >
            <CheckCircleIcon height={24} width={24} />
          </button>
      </div>
    </div>
  );
};

export default TodoListItem;


        
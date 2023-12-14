import { TrashIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
interface TodoProps {
    title: string;
    isCompleted: boolean;
    id: string;
  }

const TodoListItem = ({ title, isCompleted, id }: TodoProps) => {
  return (
    <>
     <div
        id={id}
        className="flex justify-between items-center transition-all px-4 hover:bg-slate-100 py-[10px] border_remove"
      >
        <p
          className={`ff_inter text-slate-500 text-sm ${
            isCompleted ? "line-through" : ""
          }`} >
          {title}
        </p>
        <div className="flex gap-3">
          <button className="text-slate-500 hover:text-red-500 duration-300 transition-all">
            <TrashIcon height={24} width={24} />
          </button>
          <button
            className={`text-slate-500 hover:opacity-70 transition-all ${
              isCompleted ? "!text-green-500" : " "
            }`}
          >
            <CheckCircleIcon height={24} width={24} />
          </button>
        </div>
      </div>
    </>
  )
}

export default TodoListItem
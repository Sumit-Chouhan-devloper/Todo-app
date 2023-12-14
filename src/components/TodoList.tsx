import TodoListItem from "./TodoListItem";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useEffect, useState } from "react";
const TodoList = () => {
    type StatusValue = "Loading" | "Success" | "Error";
    const [status, setStatus] = useState<StatusValue>("Loading");
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  
  interface TodoItem {
    id: string;
    title: string;
    isCompleted: boolean;
  }
  const [newArray, setNewArray] = useState<TodoItem[]>([]);

  const getData = async () => {
    setStatus("Loading");
    const querySnapshot = await getDocs(collection(db, "latest-todo"));
    const demoArray: TodoItem[] = [];
    querySnapshot.forEach((doc) => {
      demoArray.push({ ...doc.data(), id: doc.id } as TodoItem);
    });

    setNewArray(demoArray);
    setStatus("Success");
  };
  useEffect(() => {
    getData();
  }, []);
  const setData = async () => {
    setStatus("Loading");
    if (inputValue.length === 0) {
      setError("Input value cannot be empty."); // Set an error message
    } else {
      await addDoc(collection(db, "latest-todo"), {
        title: inputValue,
        isCompleted: false,
      });
      setInputValue("");
    }
    setStatus("Success");
  };
  return (
    <>
      <div className="flex h-screen justify-center items-center">
      {status === "Loading" && (
          <div className="backdrop-blur z-10 fixed text-xl text-slate-400 w-full min-h-screen flex justify-center items-center">
            ...Loading
          </div>
        )}
        <div className="px-6 pt-6 pb-5 border border-slate-200 rounded-lg w-full mx-3 sm:!w-[480px] relative">
          <h2 className="font-semibold ff_inter text-2xl text-center pb-7">
            Todos
          </h2>
          <p className="ff_inter font-medium text-xs text-slate-400 pb-2">
            Enter Todo
          </p>
          {error && <p className="text-red-500 font-semibold text-sm ff_inter absolute right-[5%] top-[18%]">{error}</p>}
          <div className="flex justify-between items-center ps-6 py-1 pe-1 border hover:border-blue-500  border-slate-200 transition-all  rounded-lg mb-2">
            <input
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                setError("");
              }}
              className="outline-none w-full pr-2 text-slate-400"
              type="text"
              placeholder="Learn html css"
            />
            <button
              onClick={setData}
              className="bg-blue-600 hover:bg-red-500 transition-all text-white font-semibold text-sm px-6 py-3 rounded-lg"
            >
              Add
            </button>
          </div>
          
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            {newArray.map((item, index) => (
              <TodoListItem
                key={index}
                title={item.title}
                isCompleted={item.isCompleted}
                id={item.id}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoList;

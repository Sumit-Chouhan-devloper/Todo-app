// TodoList.js
import TodoListItem from "./TodoListItem";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
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
    try {
      const querySnapshot = await getDocs(collection(db, "latest-todo"));
      const demoArray: TodoItem[] = [];
      querySnapshot.forEach((doc) => {
        demoArray.push({ ...doc.data(), id: doc.id } as TodoItem);
      });
      setNewArray(demoArray);
      setStatus("Success");
    } catch (error) {
      console.error("Error fetching data:", error);
      setStatus("Error");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const setData = async () => {
    setStatus("Loading");
    if (inputValue.length === 0) {
      setError("Input value cannot be empty.");
      setStatus("Error");
    } else {
      try {
        await addDoc(collection(db, "latest-todo"), {
          title: inputValue,
          isCompleted: false,
        });
        getData();
        setInputValue("");
        setStatus("Success");
      } catch (error) {
        console.error("Error adding todo:", error);
        setStatus("Error");
      }
    }
  };

  const handleDeleteTodo = async (id: string) => {
    setStatus("Loading");
    try {
      await deleteDoc(doc(db, "latest-todo", id));
      getData();
      setStatus("Success");
    } catch (error) {
      console.error("Error deleting todo:", error);
      setStatus("Error");
    }
  };

  const handleCompleteTodo = async (id: string, isCompleted: boolean) => {
    setStatus("Loading");

    try {
      // Perform the actual update logic
      await updateDoc(doc(db, "latest-todo", id), { isCompleted });

      // Update the UI by toggling the isCompleted locally
      setNewArray((prevArray) => {
        return prevArray.map((item) =>
          item.id === id ? { ...item, isCompleted } : item
        );
      });
      getData();
      setStatus("Success");
    } catch (error) {
      console.error("Error updating todo:", error);
      setStatus("Error");
    }
  };

  return (
    <>
      <div className="flex h-screen justify-center items-center">
        {status === "Loading" && (
          <div className="backdrop-blur z-10 fixed text-xl text-slate-400 w-full min-h-screen flex justify-center items-center">
            ...Loading
          </div>
        )}
        <div className="px-6 pt-6 pb-5 border border-slate-200 rounded-lg w-full mx-3 sm:!w-[480px]">
          <h2 className="font-semibold ff_inter text-2xl text-center pb-7">
            Todos
          </h2>
          <p className="ff_inter font-medium text-xs text-slate-400 pb-2">
            Enter Todo
          </p>

          <div className="flex justify-between items-center ps-6 py-1 pe-1 border hover:border-blue-500  border-slate-200 transition-all  rounded-lg mb-2 relative">
            {error && (
              <p className="text-red-500 font-semibold text-sm ff_inter absolute right-0 top-[-45%]">
                {error}
              </p>
            )}
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
                onDelete={handleDeleteTodo}
                onComplete={handleCompleteTodo}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoList;

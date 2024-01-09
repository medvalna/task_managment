"use client";
import { cn } from "@/lib/utils";
import { ITask } from "@/types/tasks";
import { Poppins } from "next/font/google";
import { FaEdit } from "react-icons/fa";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { FormEventHandler, MouseEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import { deleteTodo, editTodo } from "@/app/apiTasks";
import React from "react";
const headingFont = Poppins({
  subsets: ["latin"],
  weight: ["400"],
});

interface TasksProps {
  task: ITask;
}
const Task: React.FC<TasksProps> = ({ task }) => {
  const router = useRouter();
  const [showDoneTask, setshowDoneTask] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [newTask, setNewTask] = useState<string>(task.text);
  const handleDeleteTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await deleteTodo(task.id);

    router.refresh();
  };
  const handleDoneTodo: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setshowDoneTask(!showDoneTask);
    console.log(showDoneTask);
  };
  const handleSaveButton: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    await editTodo(task.id, newTask);
    setShowModal(false);
    router.refresh();
  };

  const handleEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await editTodo(task.id, newTask);
    setShowModal(false);
    router.refresh();
  };

  return (
    <tr key={task.id}>
      <td
        className={cn(
          "text-left pl-5 pr-10 " +
            (showDoneTask ? "text-slate-700 line-through" : "text-black"),
          headingFont.className
        )}
      >
        {task.text}
      </td>
      <td className="flex gap-5">
        <FaEdit cursor="pointer" size={25} onClick={() => setShowModal(true)} />
        <MdCheckBoxOutlineBlank
          cursor="pointer"
          size={25}
          onClick={handleDoneTodo}
        />
        <FaRegTrashAlt cursor="pointer" size={25} onClick={handleDeleteTodo} />
        {showModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                    <h3
                      className={cn(
                        "text-3xl font-semibold",
                        headingFont.className
                      )}
                    >
                      Add new task
                    </h3>
                    <button
                      className=" text-slate-600 hover:text-black text-3xl"
                      onClick={() => setShowModal(false)}
                    >
                      <span className=" text-2xl font-semibold h-5 w-5 block">
                        x
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 flex-auto">
                    <form onSubmit={handleEditTodo}>
                      <input
                        autoFocus
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-violet-500 focus:border-2 focus:outline-none focus:ring-violet-400 focus:ring-1  block w-full p-2.5"
                      />
                    </form>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                    <button
                      className="bg-violet-500 text-white hover:bg-violet-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      onClick={handleSaveButton}
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </td>
    </tr>
  );
};
export default Task;

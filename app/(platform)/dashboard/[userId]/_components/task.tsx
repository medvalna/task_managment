"use client";
import { cn } from "@/lib/utils";
import { ITask } from "@/types/tasks";
import { Inter } from "next/font/google";
import { FaEdit } from "react-icons/fa";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { MdCheckBox } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { FormEventHandler, MouseEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import { deleteTodo, editTodo } from "@/app/(api)/apiTasks";
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_green.css';
import React from "react";
const headingFont = Inter({
  subsets: ["latin"],
  weight: ["400"],
});

interface TasksProps {
  task: ITask;
}
const Task: React.FC<TasksProps> = ({ task }) => {
  const router = useRouter();
  const [showModal, setShowModal] = React.useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("" );
  const [newTask, setNewTask] = useState<string>(task.text);
  const handleDeleteTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await deleteTodo(task.id);

    router.refresh();
  };
  const handleDoneTodo: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const date = selectedDate.split(' ');;
    const dateFin = date.slice(1, 4);
    editTodo(task.id, task.text, task.project, !task.isDone, dateFin.join(' '));
    router.refresh();
  };
  const handleSaveButton: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    const date = selectedDate.split(' ');;
    const dateFin = date.slice(1, 4);
    await editTodo(task.id, newTask, task.project, task.isDone,  dateFin.join(' '));
    setShowModal(false);
    router.refresh();
  };

  const handleEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const date = selectedDate.split(' ');;
    const dateFin = date.slice(1, 4);
    await editTodo(task.id, newTask, task.project, task.isDone,  dateFin.join(' '));
    setShowModal(false);
    router.refresh();
  };

  return (
    <li key={task.id} className="flex mb-4">
      <div className="flex w-3/4">
        {task.isDone ? (
          <MdCheckBox className = "text-violet-950" cursor="pointer" size={25} onClick={handleDoneTodo} />
        ) : (
          <MdCheckBoxOutlineBlank
          className = "text-violet-950"
            cursor="pointer"
            size={25}
            onClick={handleDoneTodo}
          />
        )}
        <div className="grid grid-cols-1 text-violet-900">
        <div
          className={cn(
            (task.isDone ? "text-violet-900 line-through" : "text-violet-900"),
            "row-span-1 text-left pl-5 pr-10 text-xl",
            headingFont.className
          )}
        >
          {task.text}
        </div>
        <div
          className={cn(
            "row-span-2 text-left pl-5 pr-10 text-violet-900 text-sm",
            headingFont.className
          )}
        >
          {task.date}
        </div>
        </div>
        
      </div>

      <div className="flex w-1/4 gap-2">
        <FaEdit className = "text-violet-950" cursor="pointer" size={25} onClick={() => setShowModal(true)} />
        <FaRegTrashAlt className = "text-violet-950" cursor="pointer" size={25} onClick={handleDeleteTodo} />
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
                      Edit task
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
                        className="mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-violet-500 focus:border-2 focus:outline-none focus:ring-violet-400 focus:ring-1  block w-full p-2.5"
                      />
                    </form>
                    <Flatpickr
                    value={selectedDate}
                    onChange={(date) => setSelectedDate(date[0].toString())}
                    options={{
                      dateFormat: 'Y-m-d',
                      // You can customize the date picker options here
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-violet-500 focus:border-2 focus:outline-none focus:ring-violet-400 focus:ring-1  block w-full p-2.5"
                  />
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
      </div>
    </li>
  );
};
export default Task;

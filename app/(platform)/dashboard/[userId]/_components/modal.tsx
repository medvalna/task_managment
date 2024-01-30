"use client";
import React, { FormEventHandler, MouseEventHandler, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { Inter } from "next/font/google";
import { addTodo, editTodo } from "@/app/(api)/apiTasks";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/airbnb.css";
import { ITask } from "@/types/tasks";
import { FaEdit } from "react-icons/fa";
const headingFont = Inter({
  subsets: ["latin"],
  weight: ["400"],
});
interface ModalProps {
  project: string;
  isEditing: boolean;
  task: ITask | null;
}
const Modal: React.FC<ModalProps> = ({ project, isEditing, task }) => {
  const router = useRouter();
  const now = new Date();
  const editDateFormat = (date: string): string => {
    const line = date.split(" ");
    const dateFin = line.slice(1, 4);
    return dateFin.join(" ");
  };
  const [selectedDate, setSelectedDate] = useState<string>(
    task ? task.date : editDateFormat(now.toUTCString())
  );
  const [showModal, setShowModal] = React.useState(false);
  const [newTask, setnewTask] = useState<string>(task ? task.text : "");

  const handleSaveButton: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    console.log(selectedDate);
    await addTodo(uuidv4(), newTask, project, editDateFormat(selectedDate));
    setnewTask("");
    //TODO: decide if we want to close modal after entering the task
    //setShowModal(false);
    router.refresh();
  };
  const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await addTodo(uuidv4(), newTask, project, editDateFormat(selectedDate));
    setnewTask("");
    //TODO: decide if we want to close modal after entering the task
    //setShowModal(false);
    router.refresh();
  };
  const handleEditButton: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    if (task)
      await editTodo(
        task.id,
        newTask,
        task.project,
        task.isDone,
        editDateFormat(selectedDate)
      );
    setShowModal(false);
    router.refresh();
  };

  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (task)
      await editTodo(
        task.id,
        newTask,
        task.project,
        task.isDone,
        editDateFormat(selectedDate)
      );
    setShowModal(false);
    router.refresh();
  };
  return (
    <>
      {isEditing ? (
        <FaEdit
          className="text-violet-950"
          cursor="pointer"
          size={25}
          onClick={() => setShowModal(true)}
        />
      ) : (
        <Button
          variant="outline"
          className={cn(
            " px-2 py-2 h-full w-auto rounded-lg text-m text-violet-950 hover:bg-violet-300 ",
            headingFont.className
          )}
          asChild
          onClick={() => setShowModal(true)}
        >
          <Plus className="text-violet-950" />
        </Button>
      )}
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
                    {isEditing ? (
                      <h3
                        className={cn(
                          "text-2xl font-semibold",
                          headingFont.className
                        )}
                      >
                        Edit Task
                      </h3>
                    ) : (
                      <h3
                        className={cn(
                          "text-2xl font-semibold",
                          headingFont.className
                        )}
                      >
                        Add New Task
                      </h3>
                    )}
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
                  <form
                    onSubmit={
                      isEditing ? handleSubmitEditTodo : handleSubmitNewTodo
                    }
                  >
                    <input
                      autoFocus
                      value={newTask}
                      onChange={(e) => setnewTask(e.target.value)}
                      type="text"
                      placeholder="Type here"
                      className="mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-violet-500 focus:border-2 focus:outline-none focus:ring-violet-400 focus:ring-1  block w-full p-2.5"
                    />
                  </form>
                  <Flatpickr
                    value={selectedDate}
                    onChange={(date) => setSelectedDate(date.toString())}
                    placeholder="Choose Date"
                    options={{
                      minDate: "today",
                      dateFormat: "Y-m-d",
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
                    onClick={isEditing ? handleEditButton : handleSaveButton}
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
    </>
  );
};

export default Modal;

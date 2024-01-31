"use client";
import React, { FormEventHandler, MouseEventHandler, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { Inter } from "next/font/google";
import { addTodoPrisma, editTodoPrisma } from "@/app/(api)/apiTasks";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/airbnb.css";
import { ITask } from "@/types/tasks";
import { FaEdit } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
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
  //const now = new Date();editDateFormat(now.toUTCString())
  const [selectedDate, setSelectedDate] = useState<Date| string | null>(
    task ? task.date : ""
  );
  const [showModal, setShowModal] = React.useState(false);
  const [newTask, setnewTask] = useState<string>(task ? task.text : "");
const dataFormatting = (data: string) => {
  const line = new Date(data);
  const newDate = new Date(line.getTime() + 2*24 * 60 * 60 * 1000);
  const formattedDate = newDate.toUTCString().split(" ").slice(0,4).join(" ");
  return formattedDate;
}
  const handleSaveButton: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    
    const data = selectedDate? dataFormatting(selectedDate.toString()) : selectedDate;
    await addTodoPrisma(uuidv4(), newTask, project, data);
    console.log("sel date:", data);
    setnewTask("");
    //TODO: decide if we want to close modal after entering the task
    //setShowModal(false);
    router.refresh();
  };
  const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    
    const data = selectedDate? dataFormatting(selectedDate.toString()) : selectedDate;
    await addTodoPrisma(uuidv4(), newTask, project, data);
    console.log("sel date:", data);
    setnewTask("");
    //TODO: decide if we want to close modal after entering the task
    //setShowModal(false);
    router.refresh();
  };
  const handleEditButton: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
   
    const data = selectedDate? dataFormatting(selectedDate.toString()) : selectedDate;
    console.log("sel date:", data);
    if (task)
      await editTodoPrisma(
        task.id,
        newTask,
        task.project,
        task.isDone,
        data,
      );
    setShowModal(false);
    router.refresh();
  };
  

  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    
    const data = selectedDate? dataFormatting(selectedDate.toString()) : selectedDate;
    console.log("sel date:", data);
    if (task)
      await editTodoPrisma(
        task.id,
        newTask,
        task.project,
        task.isDone,
        data,
      );
    setShowModal(false);
    router.refresh();
  };
  const handleClearDate: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setSelectedDate(null)
    if (task)
      await editTodoPrisma(
        task.id,
        newTask,
        task.project,
        task.isDone,
        selectedDate
      );

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
                  < >
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
                  </>
                  <button
                    className=" text-slate-600 hover:text-black text-3xl"
                    onClick={() => setShowModal(false)}
                  >
                    <RxCross1 className=" text-2xl font-semibold h-5 w-5 block"/>
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
                  <form className="flex">
                  <Flatpickr
                    value={selectedDate?new Date(selectedDate):""}
                    onChange={(date) => {
                      //console.log("before date:", selectedDate, " date: ", date, "\n date[0]: ", date[0]);
                      setSelectedDate(date[0].toUTCString().split(" ").slice(0,4).join(" "));
                      console.log("choosen date:", date[0]);
                    }}
                    placeholder={"Choose Date"}
                    options={{
                      minDate: "today",
                      enableTime: false,
                      //altInput: true,
                      //altFormat: "F j, Y",
                      //defaultDate: new Date(selectedDate!),
                      dateFormat: "Y-m-d",
                      // You can customize the date picker options here
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-violet-500 focus:border-2 focus:outline-none focus:ring-violet-400 focus:ring-1  block w-full p-2.5"
                  />
                   <RxCross1 className = "mt-2 ml-3 text-violet-900" cursor="pointer" size={25} onClick={handleClearDate} />
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

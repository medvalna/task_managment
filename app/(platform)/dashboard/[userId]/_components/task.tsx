"use client";
import { cn } from "@/lib/utils";
import { ITask } from "@/types/tasks";
import { Inter } from "next/font/google";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { MdCheckBox } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { FormEventHandler } from "react";
import { useRouter } from "next/navigation";
import { deleteTodoPrisma, editTodoPrisma } from "@/app/(api)/apiTasks";
import "flatpickr/dist/themes/material_green.css";
import React from "react";
import Modal from "./modal";
const headingFont = Inter({
  subsets: ["latin"],
  weight: ["400"],
});

interface TasksProps {
  task: ITask;
}
const Task: React.FC<TasksProps> = ({ task }) => {
  const editDateFormat = (date: Date | null | string): string => {
    if (date == null || date == undefined || date == "") {
      return "";
    }
    //console.log("DATA:", date);
    const line = date.toString().split("-");
    const dateFin = line.slice(0, 3);
    dateFin[2] = dateFin[2]?.slice(0, 2);
    //console.log("datafin:", dateFin.join("/"));
    const dateForm = new Date(dateFin.join("/"));
    const formattedDate = dateForm.toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    //console.log("dataForm:", formattedDate);
    return formattedDate;
  };
  const router = useRouter();
  const handleDeleteTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await deleteTodoPrisma(task.id);

    router.refresh();
  };
  const handleDoneTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    await editTodoPrisma(
      task.id,
      task.text,
      task.project,
      !task.isDone,
      task.date
    );
    router.refresh();
  };

  return (
    <li key={task.id} className="flex mb-4">
      <div className="flex w-3/4">
        {task.isDone ? (
          <MdCheckBox
            className="text-violet-950"
            cursor="pointer"
            size={25}
            onClick={handleDoneTodo}
          />
        ) : (
          <MdCheckBoxOutlineBlank
            className="text-violet-950"
            cursor="pointer"
            size={25}
            onClick={handleDoneTodo}
          />
        )}
        <div className="grid grid-cols-1 text-violet-900">
          <div
            className={cn(
              task.isDone ? "text-violet-900 line-through" : "text-violet-900",
              "row-span-1 text-left pl-5 pr-10 text-xl",
              headingFont.className
            )}
          >
            {task.text}
          </div>
          {task.date ? (
            <div
              className={cn(
                "flex row-span-2 text-left pl-5 pr-10 text-violet-900 text-sm",
                headingFont.className
              )}
            >
              Deadline: {editDateFormat(task.date)}
            </div>
          ) : null}

          <div
            className={cn(
              "flex row-span-2 text-left pl-5 pr-10 text-violet-900 text-sm",
              headingFont.className
            )}
          >
            Project: {task.project}
          </div>
        </div>
      </div>

      <div className="flex w-1/4 gap-2">
        <Modal project={task.project} isEditing={true} task={task} />
        <FaRegTrashAlt
          className="text-violet-950"
          cursor="pointer"
          size={25}
          onClick={handleDeleteTodo}
        />
      </div>
    </li>
  );
};
export default Task;

"use client";
import React, { FormEventHandler, MouseEventHandler, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { Poppins } from "next/font/google";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { addProject, editProject } from "@/app/(api)/apiProjects";
import { FaPen } from "react-icons/fa";
const headingFont = Poppins({
  subsets: ["latin"],
  weight: ["400"],
});
interface ModalProjectProps {
  isEditing: boolean;
  projectName: string;
  projectId: string;
  userId: string;
}
const ModalProject: React.FC<ModalProjectProps> = ({ isEditing, projectName, projectId, userId }) => {
  const router = useRouter();
  const [showModal, setShowModal] = React.useState(false);
  const [newProject, setnewProject] = useState<string>(projectName);
  const handleSaveProjButton: MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    e.preventDefault();
    await addProject(uuidv4(), newProject);
    setnewProject("");
    //TODO: decide if we want to close modal after entering the task
    setShowModal(false);
  };
  const handleSubmitNewProject: FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();
    await addProject(uuidv4(), newProject);
    setnewProject("");
    //TODO: decide if we want to close modal after entering the task
    setShowModal(false);
    router.refresh();
  };
  const handleEditProjButton: MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    e.preventDefault();
    await editProject(projectId, newProject, projectName);
    setnewProject("");
    //TODO: decide if we want to close modal after entering the task
    setShowModal(false);
    router.push(`/dashboard/${userId}/project/${projectId}?name=${newProject}&id=${projectId}`);
    router.refresh();
  };
  const handleSubmitEditProject: FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();
    await editProject(projectId, newProject, projectName);
    setnewProject("");
    //TODO: decide if we want to close modal after entering the task
    setShowModal(false);
    
    router.push(`/dashboard/${userId}/project/${projectId}?name=${newProject}&id=${projectId}`);
    router.refresh();
  };
  return (
    <>
      <Button
        variant="outline"
        className={isEditing?(cn(
          " px-3 py-3 h-full w-auto rounded-lg text-m text-violet-950 hover:bg-violet-300 ",
          headingFont.className
        )):(cn(
          " px-2 py-2 h-full w-auto rounded-lg text-m text-violet-950 hover:bg-violet-300 ",
          headingFont.className))}
        asChild
        onClick={() => setShowModal(true)}
      >
        {isEditing? (<FaPen className="text-violet-950 py-2 px-2" />) :<Plus className="text-violet-950" />}
      </Button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  {isEditing ? (
                    <h3
                      className={cn(
                        "text-2xl font-semibold",
                        headingFont.className
                      )}
                    >
                      Edit Project
                    </h3>
                  ) : (
                    <h3
                      className={cn(
                        "text-2xl font-semibold",
                        headingFont.className
                      )}
                    >
                      Add Project
                    </h3>
                  )}
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
                  <form onSubmit={isEditing?handleSubmitEditProject:handleSubmitNewProject}>
                    <input
                      autoFocus
                      value={newProject}
                      onChange={(e) => setnewProject(e.target.value)}
                      type="text"
                      placeholder="Type here"
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
                    onClick={isEditing?handleEditProjButton:handleSaveProjButton}
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

export default ModalProject;

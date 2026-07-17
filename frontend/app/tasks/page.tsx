"use client";

import { useEffect, useState } from "react";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

import TaskCard from "@/components/TaskCard";
import CreateTaskModal from "@/components/CreateTaskModal";

import {
    getTasks,
    deleteTask
} from "@/services/task";

import {
    isAdmin,
    isProjectManager
} from "@/utils/auth";


export default function TasksPage() {


    const [tasks, setTasks] = useState<any[]>([]);

    const [showModal, setShowModal] = useState(false);


    const canManageTasks =
        isAdmin() || isProjectManager();




    const loadTasks = async () => {


        try {


            const response = await getTasks();

            setTasks(response.data);


        }
        catch(error){

            console.log(error);

        }


    };





    useEffect(()=>{

        loadTasks();

    },[]);






    const handleDelete = async(id:number)=>{


        try{


            await deleteTask(id);

            loadTasks();


        }
        catch(error){

            console.log(error);

        }


    };






    return (

        <div className="
        bg-gray-100
        min-h-screen
        ">


            <Sidebar/>





            <div className="
            ml-64
            ">


                <Navbar/>






                <main className="
                p-8
                ">






                    <div className="
                    flex
                    justify-between
                    items-center
                    mb-8
                    ">




                        <div>

                            <h1 className="
                            text-3xl
                            font-bold
                            ">

                                Tasks

                            </h1>


                            <p className="
                            text-gray-500
                            mt-2
                            ">

                                Manage project tasks and assignments.

                            </p>

                        </div>





                        {
                            canManageTasks && (

                                <button


                                onClick={()=>setShowModal(true)}


                                className="
                                bg-blue-600
                                hover:bg-blue-700
                                text-white
                                px-5
                                py-3
                                rounded-xl
                                transition
                                "


                                >

                                    + New Task

                                </button>

                            )
                        }







                    </div>









                    {
                        tasks.length === 0



                        ?



                        <div className="
                        bg-white
                        rounded-xl
                        shadow
                        p-10
                        text-center
                        ">


                            <h2 className="
                            text-xl
                            font-semibold
                            ">

                                No Tasks Found

                            </h2>



                            <p className="
                            text-gray-500
                            mt-2
                            ">


                                {
                                    canManageTasks
                                    ?
                                    "Create your first task to get started."
                                    :
                                    "No tasks assigned yet."
                                }


                            </p>


                        </div>





                        :





                        <div className="
                        grid
                        grid-cols-1
                        md:grid-cols-2
                        xl:grid-cols-3
                        gap-6
                        ">



                            {

                                tasks.map((task)=>(


                                    <TaskCard


                                    key={task.id}


                                    task={task}


                                    onDelete={handleDelete}


                                    />


                                ))

                            }




                        </div>



                    }









                    {
                        canManageTasks &&
                        showModal &&



                        <CreateTaskModal


                        closeModal={()=>setShowModal(false)}


                        refreshTasks={loadTasks}


                        />


                    }






                </main>






            </div>





        </div>


    );


}
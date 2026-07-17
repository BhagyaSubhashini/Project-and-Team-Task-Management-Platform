"use client";

import Link from "next/link";

import {
    isAdmin,
    isProjectManager
} from "@/utils/auth";


export default function TaskCard({
    task,
    onDelete
}) {


    const canManage =
        isAdmin() || isProjectManager();




    return (

        <div
            className="
            bg-white
            rounded-2xl
            shadow-md
            hover:shadow-xl
            transition
            p-6
            "
        >


            <h2 className="
            text-xl
            font-bold
            text-gray-800
            "
            >

                {task.title}

            </h2>





            <p className="
            text-gray-600
            mt-3
            line-clamp-3
            ">

                {
                    task.description ||
                    "No description available."
                }

            </p>







            <div className="
            mt-5
            space-y-2
            text-sm
            text-gray-600
            ">


                <p>

                    <strong>Project:</strong>{" "}

                    {
                        task.project?.name ||
                        "Not assigned"
                    }

                </p>



                <p>

                    <strong>Assigned:</strong>{" "}

                    {
                        task.assignedUser?.name ||
                        task.assigned_user?.name ||
                        "Not assigned"
                    }

                </p>




                {
                    task.due_date && (

                        <p>

                            <strong>Due:</strong>{" "}

                            {task.due_date}

                        </p>

                    )
                }



            </div>








            <div className="
            flex
            gap-3
            mt-5
            ">



                <span
                    className={`
                    px-3
                    py-1
                    rounded-full
                    text-sm

                    ${
                        task.status === "Completed"
                        ?
                        "bg-green-100 text-green-700"
                        :
                        task.status === "In Progress"
                        ?
                        "bg-blue-100 text-blue-700"
                        :
                        "bg-yellow-100 text-yellow-700"
                    }

                    `}
                >

                    {task.status}

                </span>






                <span
                    className={`
                    px-3
                    py-1
                    rounded-full
                    text-sm

                    ${
                        task.priority === "High"
                        ?
                        "bg-red-100 text-red-700"
                        :
                        task.priority === "Medium"
                        ?
                        "bg-orange-100 text-orange-700"
                        :
                        "bg-gray-100 text-gray-700"
                    }

                    `}
                >

                    {task.priority}

                </span>



            </div>








            <div className="
            flex
            justify-between
            items-center
            mt-6
            ">




                <Link

                    href={`/tasks/${task.id}`}

                    className="
                    bg-blue-600
                    hover:bg-blue-700
                    text-white
                    px-4
                    py-2
                    rounded-lg
                    "

                >

                    View

                </Link>







                {
                    canManage && (

                        <button

                            onClick={()=>{


                                if(
                                    confirm(
                                    "Are you sure you want to delete this task?"
                                    )
                                ){

                                    onDelete(task.id);

                                }


                            }}

                            className="
                            text-red-600
                            hover:text-red-800
                            "

                        >

                            Delete

                        </button>

                    )
                }





            </div>





        </div>

    );

}
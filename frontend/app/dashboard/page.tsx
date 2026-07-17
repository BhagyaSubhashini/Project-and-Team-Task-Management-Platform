"use client";

import { useEffect, useState } from "react";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import DashboardCard from "@/components/DashboardCard";


import {
    FaProjectDiagram,
    FaTasks,
    FaUsers
} from "react-icons/fa";


import { getDashboard } from "@/services/dashboard";
import { getUser } from "@/utils/auth";



export default function Dashboard(){


    const [stats,setStats] = useState<any>(null);


    const user = getUser();





    const loadDashboard = async()=>{


        try{


            const response = await getDashboard();


            setStats(response.data);


        }
        catch(error){

            console.log(error);

        }


    };






    useEffect(()=>{


        loadDashboard();


    },[]);







    if(!stats){


        return (

            <div className="p-10">

                Loading dashboard...

            </div>

        );

    }








    return (

        <div className="
        bg-gray-100
        min-h-screen
        ">



            <Sidebar />





            <div className="
            ml-64
            ">


                <Navbar />





                <main className="
                p-8
                ">





                    {/* Welcome */}

                    <div className="mb-10">


                        <h1 className="
                        text-3xl
                        font-bold
                        ">


                            Welcome back, {user?.name || "User"} 👋


                        </h1>



                        <p className="
                        text-gray-500
                        mt-2
                        ">


                            {stats.role}


                        </p>


                    </div>










                    {/* Statistics Cards */}


                    <div className="
                    grid
                    grid-cols-1
                    md:grid-cols-3
                    gap-6
                    ">




                        {/* ADMIN ONLY USER CARD */}

                        {
                            stats.role === "Administrator" &&


                            <DashboardCard

                                title="Users"

                                value={stats.total_users ?? 0}

                                icon={
                                    <FaUsers size={30}/>
                                }

                            />

                        }





                        {/* PROJECT CARD */}

                        {

                            stats.role !== "Team Member" &&


                            <DashboardCard

                                title="Projects"

                                value={stats.total_projects ?? 0}

                                icon={
                                    <FaProjectDiagram size={30}/>
                                }

                            />

                        }







                        {/* TASK CARD */}


                        <DashboardCard

                            title="Tasks"

                            value={stats.total_tasks ?? 0}

                            icon={
                                <FaTasks size={30}/>
                            }

                        />



                    </div>









                    {/* LOWER SECTION */}


                    <div className="
                    grid
                    grid-cols-1
                    lg:grid-cols-3
                    gap-6
                    mt-10
                    ">









                        {/* TASK STATUS */}


                        <div className="
                        bg-white
                        rounded-xl
                        shadow
                        p-6
                        ">



                            <h2 className="
                            text-xl
                            font-bold
                            mb-5
                            ">

                                Task Status

                            </h2>






                            <div className="
                            space-y-4
                            ">



                                <div className="
                                flex
                                justify-between
                                ">

                                    <span>
                                        Pending
                                    </span>


                                    <span className="
                                    font-bold
                                    text-yellow-600
                                    ">

                                        {stats.pending_tasks ?? 0}

                                    </span>


                                </div>






                                <div className="
                                flex
                                justify-between
                                ">

                                    <span>
                                        In Progress
                                    </span>


                                    <span className="
                                    font-bold
                                    text-blue-600
                                    ">

                                        {stats.in_progress_tasks ?? 0}

                                    </span>


                                </div>







                                <div className="
                                flex
                                justify-between
                                ">


                                    <span>
                                        Completed
                                    </span>



                                    <span className="
                                    font-bold
                                    text-green-600
                                    ">

                                        {stats.completed_tasks ?? 0}

                                    </span>



                                </div>



                            </div>




                        </div>













                        {/* ROLE BASED DATA */}


                        <div className="
                        bg-white
                        rounded-xl
                        shadow
                        p-6
                        lg:col-span-2
                        ">





                            <h2 className="
                            text-xl
                            font-bold
                            mb-5
                            ">



                                {
                                    stats.role === "Administrator"

                                    ?

                                    "Recent Projects"


                                    :

                                    stats.role === "Project Manager"

                                    ?

                                    "My Projects"


                                    :

                                    "My Tasks"

                                }



                            </h2>









                            {/* ADMIN PROJECTS */}


                            {
                                stats.recent_projects?.map((project:any)=>(


                                    <div

                                    key={project.id}

                                    className="
                                    border-b
                                    py-4
                                    "
                                    >


                                        <h3 className="
                                        font-semibold
                                        ">

                                            {project.name}

                                        </h3>


                                        <p className="
                                        text-sm
                                        text-gray-500
                                        ">

                                            {project.status}

                                        </p>



                                    </div>


                                ))

                            }









                            {/* MANAGER PROJECTS */}


                            {
                                stats.my_projects?.map((project:any)=>(


                                    <div

                                    key={project.id}

                                    className="
                                    border-b
                                    py-4
                                    "
                                    >


                                        <h3 className="
                                        font-semibold
                                        ">

                                            {project.name}

                                        </h3>


                                        <p className="
                                        text-sm
                                        text-gray-500
                                        ">

                                            {project.status}

                                        </p>


                                    </div>


                                ))

                            }









                            {/* MEMBER TASKS */}


                            {
                                stats.my_tasks?.map((task:any)=>(


                                    <div

                                    key={task.id}

                                    className="
                                    border-b
                                    py-4
                                    "
                                    >


                                        <h3 className="
                                        font-semibold
                                        ">

                                            {task.title}

                                        </h3>



                                        <p className="
                                        text-sm
                                        text-gray-500
                                        ">

                                            {task.status}

                                        </p>



                                    </div>


                                ))

                            }









                            {
                                !stats.recent_projects?.length &&
                                !stats.my_projects?.length &&
                                !stats.my_tasks?.length &&


                                <p className="
                                text-gray-500
                                ">

                                    No data available.

                                </p>


                            }




                        </div>







                    </div>





                </main>





            </div>






        </div>


    );


}
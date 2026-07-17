"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import AddMemberModal from "@/components/AddMemberModal";

import {
    getProjectById
} from "@/services/project";


import {
    removeMember
} from "@/services/member";


import {
    isAdmin,
    isProjectManager
} from "@/utils/auth";



export default function ProjectDetails() {


    const params = useParams();


    const id = params.id as string;



    const [project,setProject] = useState<any>(null);

    const [showMemberModal,setShowMemberModal] = useState(false);



    const canManage =
        isAdmin() || isProjectManager();







    const loadProject = async()=>{


        try{


            const response = await getProjectById(id);


            setProject(response.data);


        }
        catch(error){

            console.log(error);

        }


    };








    useEffect(()=>{


        if(id){

            loadProject();

        }


    },[id]);









    const handleRemoveMember = async(memberId:number)=>{


        const confirmDelete = confirm(
            "Remove this member from project?"
        );


        if(!confirmDelete){

            return;

        }



        try{


            await removeMember(
                id,
                memberId
            );



            loadProject();


        }
        catch(error){

            console.log(error);

        }


    };









    if(!project){


        return (

            <div className="p-10">

                Loading project...

            </div>

        );

    }








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


                        <h1 className="
                        text-3xl
                        font-bold
                        ">

                            {project.name}

                        </h1>







                        {
                            canManage &&

                            <button

                            onClick={()=>setShowMemberModal(true)}

                            className="
                            bg-blue-600
                            hover:bg-blue-700
                            text-white
                            px-5
                            py-3
                            rounded-xl
                            "

                            >

                                + Add Member

                            </button>

                        }



                    </div>









                    {/* Project Details */}


                    <div className="
                    bg-white
                    rounded-xl
                    shadow
                    p-6
                    mb-8
                    ">


                        <h2 className="
                        text-xl
                        font-bold
                        mb-4
                        ">

                            Project Details

                        </h2>




                        <p className="
                        text-gray-600
                        ">

                            {
                                project.description ||
                                "No description available."
                            }

                        </p>






                        <div className="
                        mt-5
                        space-y-2
                        text-gray-700
                        ">


                            <p>
                                <strong>Status:</strong>{" "}
                                {project.status}
                            </p>



                            <p>
                                <strong>Priority:</strong>{" "}
                                {project.priority}
                            </p>



                            <p>
                                <strong>Manager:</strong>{" "}
                                {
                                    project.manager?.name ||
                                    "Not Assigned"
                                }
                            </p>


                        </div>



                    </div>









                    {/* Tasks */}


                    <div>


                        <h2 className="
                        text-2xl
                        font-bold
                        mb-5
                        ">

                            Tasks

                        </h2>





                        {
                            project.tasks?.length === 0

                            ?

                            <div className="
                            bg-white
                            rounded-xl
                            p-6
                            text-gray-500
                            ">

                                No tasks available.

                            </div>


                            :


                            <div className="
                            grid
                            grid-cols-1
                            md:grid-cols-3
                            gap-6
                            ">


                                {
                                    project.tasks?.map((task:any)=>(


                                        <div

                                        key={task.id}

                                        className="
                                        bg-white
                                        rounded-xl
                                        shadow
                                        p-5
                                        ">


                                            <h3 className="
                                            font-bold
                                            text-lg
                                            ">

                                                {task.title}

                                            </h3>




                                            <p className="
                                            text-gray-600
                                            mt-2
                                            ">

                                                {
                                                    task.description ||
                                                    "No description"
                                                }

                                            </p>





                                            <div className="
                                            mt-4
                                            flex
                                            gap-3
                                            ">


                                                <span className="
                                                bg-blue-100
                                                text-blue-700
                                                px-3
                                                py-1
                                                rounded-full
                                                text-sm
                                                ">

                                                    {task.status}

                                                </span>





                                                <span className="
                                                bg-yellow-100
                                                text-yellow-700
                                                px-3
                                                py-1
                                                rounded-full
                                                text-sm
                                                ">

                                                    {task.priority}

                                                </span>


                                            </div>



                                        </div>


                                    ))

                                }


                            </div>

                        }


                    </div>









                    {/* Team Members */}


                    <div className="
                    bg-white
                    rounded-xl
                    shadow
                    p-6
                    mt-10
                    ">


                        <h2 className="
                        text-2xl
                        font-bold
                        mb-5
                        ">

                            Team Members

                        </h2>







                        {
                            project.members?.length === 0

                            ?

                            <p className="text-gray-500">
                                No members assigned.
                            </p>


                            :


                            <div className="
                            grid
                            grid-cols-1
                            md:grid-cols-3
                            gap-5
                            ">



                                {
                                    project.members?.map((member:any)=>(



                                        <div

                                        key={member.id}

                                        className="
                                        border
                                        rounded-lg
                                        p-4
                                        relative
                                        ">


                                            <h3 className="
                                            font-bold
                                            ">

                                                {member.name}

                                            </h3>




                                            <p className="
                                            text-gray-500
                                            ">

                                                {
                                                    member.role?.name ||
                                                    "User"
                                                }

                                            </p>







                                            {
                                                canManage &&

                                                <button

                                                onClick={()=>handleRemoveMember(member.id)}

                                                className="
                                                absolute
                                                top-3
                                                right-3
                                                text-red-600
                                                hover:text-red-800
                                                text-sm
                                                "

                                                >

                                                    Remove

                                                </button>

                                            }





                                        </div>


                                    ))

                                }


                            </div>

                        }



                    </div>









                </main>





            </div>









            {
                canManage &&
                showMemberModal &&


                <AddMemberModal

                    projectId={id}

                    closeModal={()=>
                        setShowMemberModal(false)
                    }

                    refreshProject={loadProject}

                />


            }







        </div>

    );

}
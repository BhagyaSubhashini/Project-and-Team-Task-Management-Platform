"use client";

import { 
    useEffect, 
    useState 
} from "react";

import { 
    useParams,
    useRouter
} from "next/navigation";


import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";


import {
    getTaskById,
    deleteTask,
    updateTask
} from "@/services/task";


import {
    getComments,
    createComment,
    deleteComment
} from "@/services/comment";


import {
    isAdmin,
    isProjectManager,
    getUser
} from "@/utils/auth";



export default function TaskDetailsPage(){


    const params = useParams();

    const router = useRouter();


    const id = params.id;



    const [task,setTask] = useState<any>(null);

    const [comments,setComments] = useState<any[]>([]);


    const [comment,setComment] = useState("");


    const [updatingStatus,setUpdatingStatus] = useState(false);



    const currentUser = getUser();



    const canManageTask =
        isAdmin() || isProjectManager();






    const loadTask = async()=>{


        try{


            const response = await getTaskById(id);

            setTask(response.data);


        }
        catch(error){

            console.log(error);

        }


    };







    const loadComments = async()=>{


        try{


            const response = await getComments();


            const filtered =
            response.data.filter(
                (item:any)=>
                item.task_id == id
            );


            setComments(filtered);


        }
        catch(error){

            console.log(error);

        }


    };









    useEffect(()=>{


        if(id){

            loadTask();

            loadComments();

        }


    },[id]);










    const handleStatusUpdate = async(e:any)=>{


        const newStatus = e.target.value;


        try{


            setUpdatingStatus(true);



            await updateTask(
                id,
                {
                    status:newStatus
                }
            );



            loadTask();



        }
        catch(error){

            console.log(error);

        }
        finally{

            setUpdatingStatus(false);

        }


    };









    const handleCommentSubmit = async(e:any)=>{


        e.preventDefault();


        if(!comment.trim()) return;



        try{


            await createComment({

                task_id:id,

                comment:comment

            });


            setComment("");

            loadComments();


        }
        catch(error){

            console.log(error);

        }


    };









    const handleDeleteComment = async(commentId:number)=>{


        try{


            await deleteComment(commentId);


            loadComments();


        }
        catch(error){

            console.log(error);

        }


    };









    const handleDeleteTask = async()=>{


        if(
            !confirm(
                "Are you sure you want to delete this task?"
            )
        ){

            return;

        }



        try{


            await deleteTask(id);


            router.push("/tasks");


        }
        catch(error){

            console.log(error);

        }


    };









    if(!task){


        return (

            <div className="p-10">

                Loading task...

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

                            Task Details

                        </h1>





                        {
                            canManageTask && (

                                <button


                                onClick={handleDeleteTask}


                                className="
                                bg-red-600
                                hover:bg-red-700
                                text-white
                                px-5
                                py-3
                                rounded-xl
                                "

                                >

                                    Delete Task

                                </button>

                            )
                        }



                    </div>









                    <div className="
                    bg-white
                    rounded-xl
                    shadow
                    p-6
                    ">


                        <h2 className="
                        text-2xl
                        font-bold
                        ">

                            {task.title}

                        </h2>





                        <p className="
                        text-gray-600
                        mt-3
                        ">

                            {
                                task.description ||
                                "No description"
                            }

                        </p>







                        <div className="
                        mt-6
                        grid
                        md:grid-cols-2
                        gap-4
                        text-gray-700
                        ">



                            <p>

                                <b>Project:</b>{" "}

                                {
                                    task.project?.name
                                }

                            </p>



                            <p>

                                <b>Assigned To:</b>{" "}

                                {
                                    task.assigned_user?.name ||
                                    task.assignedUser?.name ||
                                    "Not assigned"
                                }

                            </p>




                            <p>

                                <b>Created By:</b>{" "}

                                {
                                    task.creator?.name
                                }

                            </p>



                            <p>

                                <b>Due Date:</b>{" "}

                                {
                                    task.due_date ||
                                    "Not set"
                                }

                            </p>


                        </div>









                        <div className="
                        flex
                        gap-3
                        mt-6
                        items-center
                        ">


                        {
                            canManageTask ? (


                                <select

                                value={task.status}

                                disabled={updatingStatus}

                                onChange={handleStatusUpdate}

                                className="
                                bg-blue-100
                                text-blue-700
                                px-3
                                py-2
                                rounded-full
                                font-medium
                                outline-none
                                "

                                >


                                    <option value="Pending">
                                        Pending
                                    </option>


                                    <option value="In Progress">
                                        In Progress
                                    </option>


                                    <option value="Completed">
                                        Completed
                                    </option>


                                </select>


                            )


                            :

                            (

                                <span className="
                                bg-blue-100
                                text-blue-700
                                px-3
                                py-1
                                rounded-full
                                ">

                                    {task.status}

                                </span>

                            )

                        }






                            <span className="
                            bg-yellow-100
                            text-yellow-700
                            px-3
                            py-1
                            rounded-full
                            ">

                                {task.priority}

                            </span>



                        </div>






                    </div>









                    <div className="
                    bg-white
                    rounded-xl
                    shadow
                    p-6
                    mt-8
                    ">



                        <h2 className="
                        text-2xl
                        font-bold
                        mb-5
                        ">

                            Comments

                        </h2>






                        <form
                        onSubmit={handleCommentSubmit}
                        className="
                        flex
                        gap-3
                        mb-6
                        "
                        >



                            <input

                            value={comment}

                            onChange={
                                e=>setComment(e.target.value)
                            }

                            placeholder="Write a comment..."

                            className="
                            flex-1
                            border
                            rounded-xl
                            px-4
                            py-3
                            outline-none
                            "

                            />



                            <button

                            className="
                            bg-blue-600
                            text-white
                            px-5
                            rounded-xl
                            "

                            >

                                Add

                            </button>



                        </form>









                        <div className="
                        space-y-4
                        "> 


                            {

                            comments.length === 0

                            ?

                            <p className="text-gray-500">

                                No comments yet.

                            </p>


                            :


                            comments.map((item:any)=>(


                                <div

                                key={item.id}

                                className="
                                border
                                rounded-xl
                                p-4
                                "

                                >


                                    <div className="
                                    flex
                                    justify-between
                                    "
                                    >


                                        <p className="font-bold">

                                            {
                                                item.user?.name
                                            }

                                        </p>





                                        {

                                        (
                                            item.user_id === currentUser?.id ||
                                            canManageTask
                                        )

                                        &&

                                        (

                                            <button

                                            onClick={()=>
                                                handleDeleteComment(item.id)
                                            }

                                            className="
                                            text-red-500
                                            text-sm
                                            "

                                            >

                                                Delete

                                            </button>

                                        )


                                        }


                                    </div>





                                    <p className="
                                    text-gray-600
                                    mt-2
                                    ">

                                        {
                                            item.comment
                                        }

                                    </p>



                                </div>


                            ))

                            }



                        </div>







                    </div>








                </main>






            </div>






        </div>


    );


}
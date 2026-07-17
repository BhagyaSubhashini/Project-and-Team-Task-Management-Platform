"use client";

import { useEffect, useState } from "react";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

import {
    getComments,
    deleteComment
} from "@/services/comment";

import {
    isAdmin,
    isProjectManager,
    getUser
} from "@/utils/auth";


export default function CommentsPage(){


    const [comments,setComments] = useState<any[]>([]);


    const user = getUser();



    const canManage =
        isAdmin() || isProjectManager();




    const loadComments = async()=>{


        try{


            const response = await getComments();


            setComments(response.data);


        }
        catch(error){

            console.log(error);

        }


    };






    useEffect(()=>{

        loadComments();

    },[]);







    const handleDelete = async(id:number)=>{


        try{


            await deleteComment(id);


            loadComments();


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




                    <h1 className="
                    text-3xl
                    font-bold
                    mb-8
                    ">

                        Comments

                    </h1>









                    {
                        comments.length === 0

                        ?


                        <div className="
                        bg-white
                        rounded-xl
                        shadow
                        p-10
                        text-center
                        text-gray-500
                        ">


                            No comments found.


                        </div>





                        :





                        <div className="
                        space-y-5
                        ">



                            {

                                comments.map((item:any)=>(


                                    <div

                                    key={item.id}

                                    className="
                                    bg-white
                                    rounded-xl
                                    shadow
                                    p-6
                                    "

                                    >




                                        <div className="
                                        flex
                                        justify-between
                                        items-center
                                        "
                                        >



                                            <div>


                                                <h2 className="
                                                font-bold
                                                text-lg
                                                ">

                                                    {
                                                        item.user?.name
                                                    }

                                                </h2>



                                                <p className="
                                                text-gray-500
                                                text-sm
                                                ">

                                                    Task:

                                                    {" "}

                                                    {
                                                        item.task?.title
                                                    }

                                                </p>



                                            </div>







                                            {

                                            (
                                                canManage ||
                                                item.user_id === user?.id
                                            )

                                            &&


                                            (

                                                <button


                                                onClick={()=>
                                                    handleDelete(item.id)
                                                }


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







                                        <p className="
                                        mt-5
                                        text-gray-700
                                        ">

                                            {
                                                item.comment
                                            }

                                        </p>







                                    </div>


                                ))

                            }





                        </div>



                    }





                </main>





            </div>





        </div>


    );


}
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

import UserCard from "@/components/UserCard";
import CreateUserModal from "@/components/CreateUserModal";

import {
    getUsers,
    deleteUser
} from "@/services/user";

import {
    isAdmin
} from "@/utils/auth";



export default function UsersPage() {


    const router = useRouter();


    const [users, setUsers] = useState<any[]>([]);

    const [showModal, setShowModal] = useState(false);



    const admin = isAdmin();





    const loadUsers = async()=>{


        try{


            const response = await getUsers();

            setUsers(response.data);


        }
        catch(error){

            console.log(error);

        }


    };







    useEffect(()=>{


        if(!admin){

            router.push("/dashboard");

            return;

        }


        loadUsers();


    },[]);








    const handleDelete = async(id:number)=>{


        try{


            await deleteUser(id);

            loadUsers();


        }
        catch(error){

            console.log(error);

        }


    };







    if(!admin){


        return null;


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

                                Users

                            </h1>


                            <p className="
                            text-gray-500
                            mt-2
                            ">

                                Manage system users and roles.

                            </p>


                        </div>







                        <button


                            onClick={()=>setShowModal(true)}


                            className="
                            bg-blue-600
                            hover:bg-blue-700
                            text-white
                            px-5
                            py-3
                            rounded-xl
                            "

                        >

                            + Add User

                        </button>




                    </div>









                    {
                        users.length === 0


                        ?


                        <div className="
                        bg-white
                        rounded-xl
                        shadow
                        p-10
                        text-center
                        text-gray-500
                        ">

                            No users found.

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

                                users.map((user)=>(


                                    <UserCard


                                        key={user.id}


                                        user={user}


                                        onDelete={handleDelete}


                                    />


                                ))

                            }



                        </div>



                    }








                    {
                        showModal &&



                        <CreateUserModal


                            closeModal={()=>setShowModal(false)}


                            refreshUsers={loadUsers}


                        />


                    }







                </main>





            </div>





        </div>


    );


}
"use client";

import {
    isAdmin
} from "@/utils/auth";


export default function UserCard({
    user,
    onDelete
}) {


    const admin = isAdmin();



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


            <div className="
            flex
            items-center
            gap-4
            ">


                <div
                    className="
                    w-12
                    h-12
                    rounded-full
                    bg-blue-600
                    text-white
                    flex
                    items-center
                    justify-center
                    font-bold
                    text-xl
                    "
                >

                    {
                        user.name?.charAt(0)
                    }

                </div>





                <div>

                    <h2
                        className="
                        text-lg
                        font-bold
                        text-gray-800
                        "
                    >

                        {user.name}

                    </h2>


                    <p className="
                    text-gray-500
                    text-sm
                    ">

                        {user.email}

                    </p>


                </div>


            </div>







            <div
                className="
                mt-5
                space-y-2
                text-sm
                text-gray-600
                "
            >

                <p>

                    <strong>Role:</strong>{" "}

                    {
                        user.role?.name ||
                        "No Role"
                    }

                </p>



                <p>

                    <strong>Phone:</strong>{" "}

                    {
                        user.phone ||
                        "Not Provided"
                    }

                </p>


            </div>







            {
                admin && (

                    <div
                        className="
                        mt-6
                        flex
                        justify-end
                        "
                    >


                        <button


                            onClick={()=>{


                                if(
                                    confirm(
                                    "Are you sure you want to delete this user?"
                                    )
                                ){

                                    onDelete(user.id);

                                }


                            }}


                            className="
                            text-red-600
                            hover:text-red-800
                            font-medium
                            "
                        >

                            Delete

                        </button>



                    </div>

                )
            }





        </div>

    );

}
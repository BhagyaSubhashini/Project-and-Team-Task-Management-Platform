"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/services/auth";


export default function LoginPage(){

    const router = useRouter();


    const [form,setForm] = useState({
        email:"",
        password:""
    });


    const [error,setError] = useState("");

    const [loading,setLoading] = useState(false);



    const handleChange = (e:any)=>{

        setForm({
            ...form,
            [e.target.name]:e.target.value
        });

    };



    const handleSubmit = async(e:any)=>{

        e.preventDefault();

        setLoading(true);
        setError("");


        try{

            const response = await login(form);


            localStorage.setItem(
                "token",
                response.data.token
            );


            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );


            router.push("/dashboard");


        }
        catch(error:any){

            setError(
                error.response?.data?.message 
                ||
                "Invalid email or password"
            );

        }
        finally{

            setLoading(false);

        }

    };



    return (

<div className="
min-h-screen
flex
items-center
justify-center
bg-gradient-to-br
from-slate-900
via-blue-900
to-indigo-900
">





<div className="
w-full
max-w-md
bg-white/10
backdrop-blur-lg
border
border-white/20
rounded-3xl
p-8
shadow-2xl
">


<div className="
text-center
mb-8
">


<div className="
mx-auto
w-20
h-20
flex
items-center
justify-center
mb-4
">

<img
src="/icon.png"
alt="TaskFlow Logo"
className="
w-16
h-16
object-contain
"
/>

</div>



<h1 className="
text-4xl
font-bold
text-white
">

TaskFlow

</h1>



<p className="
text-gray-300
mt-2
">

Project & Team Management Platform

</p>


</div>





{
error &&

<div className="
bg-red-500/20
border
border-red-400
text-red-200
p-3
rounded-lg
mb-5
text-sm
">

{error}

</div>

}





<form onSubmit={handleSubmit}>



<div className="mb-5">


<label className="
text-white
text-sm
">

Email

</label>


<input

type="email"

name="email"

value={form.email}

onChange={handleChange}

placeholder="admin@example.com"

className="
w-full
mt-2
px-4
py-3
rounded-xl
bg-white/20
text-white
placeholder-gray-300
outline-none
focus:ring-2
focus:ring-blue-400
"

/>


</div>






<div className="mb-6">


<label className="
text-white
text-sm
">

Password

</label>


<input

type="password"

name="password"

value={form.password}

onChange={handleChange}

placeholder="********"

className="
w-full
mt-2
px-4
py-3
rounded-xl
bg-white/20
text-white
placeholder-gray-300
outline-none
focus:ring-2
focus:ring-blue-400
"

/>


</div>





<button

disabled={loading}

className="
w-full
py-3
rounded-xl
bg-blue-600
hover:bg-blue-700
text-white
font-semibold
transition
"


>


{
loading
?
"Signing in..."
:
"Sign In"
}


</button>




</form>




<p className="
text-center
text-gray-300
text-sm
mt-6
">

TaskFlow Management System © 2026

</p>



</div>


</div>

    )

}
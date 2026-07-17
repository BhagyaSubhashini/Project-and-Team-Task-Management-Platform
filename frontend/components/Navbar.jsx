"use client";


export default function Navbar(){


const user =
typeof window !== "undefined"
?
JSON.parse(localStorage.getItem("user"))
:
null;



return (

<header className="
h-16
bg-white
shadow-sm
flex
items-center
justify-between
px-8
">


<h2 className="
font-semibold
text-xl
text-gray-700
">

Dashboard

</h2>



<div className="
flex
items-center
gap-3
">


<div className="
w-10
h-10
rounded-full
bg-blue-600
text-white
flex
items-center
justify-center
font-bold
">

{
user?.name?.charAt(0)
||
"A"
}

</div>



<div>

<p className="font-medium">
{
user?.name
||
"Admin"
}
</p>


<p className="text-xs text-gray-500">

{
user?.role?.name
||
"User"
}

</p>

</div>



</div>


</header>

)


}
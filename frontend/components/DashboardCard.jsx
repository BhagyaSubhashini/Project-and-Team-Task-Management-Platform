export default function DashboardCard({
title,
value,
icon
}){


return (

<div className="
bg-white
rounded-2xl
shadow-sm
p-6
border
border-gray-100
">


<div className="
text-gray-500
mb-3
">

{icon}

</div>



<h3 className="
text-gray-500
text-sm
">

{title}

</h3>


<p className="
text-3xl
font-bold
mt-2
">

{value}

</p>


</div>

)

}
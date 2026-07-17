"use client";


import {useEffect,useState} from "react";


import {
createTask
} from "@/services/task";


import {
getProjects
} from "@/services/project";


import {
getProjectMembers
} from "@/services/member";





export default function CreateTaskModal({
    closeModal,
    refreshTasks
}){


const [projects,setProjects]=useState([]);

const [members,setMembers]=useState([]);



const [form,setForm]=useState({

project_id:"",
assigned_to:"",
title:"",
description:"",
status:"Pending",
priority:"Medium",
due_date:""

});



const [loading,setLoading]=useState(false);





useEffect(()=>{

loadProjects();

},[]);






const loadProjects = async()=>{


try{


const response = await getProjects();


setProjects(response.data);



}
catch(error){

console.log(error);

}


};







const handleProjectChange = async(e)=>{


const projectId = e.target.value;



setForm({

...form,

project_id:projectId,

assigned_to:""

});



setMembers([]);



if(projectId){


try{


const response =
await getProjectMembers(projectId);



setMembers(response.data);



}
catch(error){

console.log(error);

}


}



};









const handleChange=(e)=>{


setForm({

...form,

[e.target.name]:e.target.value

});


};









const handleSubmit=async(e)=>{


e.preventDefault();



setLoading(true);



try{


await createTask({

...form,

project_id:Number(form.project_id),

assigned_to:Number(form.assigned_to)

});



refreshTasks();


closeModal();



}
catch(error){

console.log(error);

}
finally{

setLoading(false);

}


};








return (

<div className="
fixed
inset-0
bg-black/50
flex
items-center
justify-center
z-50
">



<div className="
bg-white
rounded-2xl
p-8
w-full
max-w-lg
">



<h2 className="
text-2xl
font-bold
mb-6
">

Create Task

</h2>








<form
onSubmit={handleSubmit}
className="space-y-4"
>







<select

name="project_id"

value={form.project_id}

onChange={handleProjectChange}

className="
w-full
border
p-3
rounded-lg
"

>


<option value="">

Select Project

</option>



{
projects.map(project=>(


<option

key={project.id}

value={project.id}

>

{project.name}

</option>


))

}



</select>









<select


name="assigned_to"

value={form.assigned_to}

onChange={handleChange}

disabled={!form.project_id}


className="
w-full
border
p-3
rounded-lg
disabled:bg-gray-100
"


>


<option value="">


{
!form.project_id

?

"Select project first"

:

"Assign User"

}


</option>



{
members.map(user=>(


<option

key={user.id}

value={user.id}

>


{user.name}

{
user.role?.name &&
` - ${user.role.name}`
}


</option>


))

}



</select>







{
form.project_id &&
members.length===0 &&


<p className="
text-sm
text-red-500
">

No members assigned to this project.

</p>


}









<input


name="title"


placeholder="Task title"


value={form.title}


onChange={handleChange}


className="
w-full
border
p-3
rounded-lg
"


required


/>









<textarea


name="description"


placeholder="Task description"


value={form.description}


onChange={handleChange}


className="
w-full
border
p-3
rounded-lg
"


/>









<select


name="status"


value={form.status}


onChange={handleChange}


className="
w-full
border
p-3
rounded-lg
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









<select


name="priority"


value={form.priority}


onChange={handleChange}


className="
w-full
border
p-3
rounded-lg
"


>


<option value="Low">

Low

</option>



<option value="Medium">

Medium

</option>



<option value="High">

High

</option>



</select>









<div>


<label className="
text-sm
text-gray-600
">

Due Date

</label>



<input


type="date"


name="due_date"


value={form.due_date}


onChange={handleChange}


className="
w-full
border
p-3
rounded-lg
"


/>



</div>









<div className="
flex
justify-end
gap-3
">


<button


type="button"


onClick={closeModal}


className="
px-5
py-2
bg-gray-200
rounded-lg
"


>


Cancel


</button>









<button


disabled={
loading ||
!form.project_id ||
!form.assigned_to
}


className="
px-5
py-2
bg-blue-600
text-white
rounded-lg
disabled:bg-gray-400
"


>


{

loading

?

"Creating..."

:

"Create"

}



</button>




</div>







</form>







</div>





</div>


)


}
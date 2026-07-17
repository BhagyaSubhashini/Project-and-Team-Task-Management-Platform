"use client";


import {useEffect,useState} from "react";

import {
createProject
} from "@/services/project";


import api from "@/services/api";




export default function CreateProjectModal({
    closeModal,
    refreshProjects
}){


const [managers,setManagers]=useState([]);



const [form,setForm]=useState({

name:"",
description:"",
status:"active",
priority:"medium",
start_date:"",
end_date:"",
manager_id:""

});



const [loading,setLoading]=useState(false);






useEffect(()=>{

loadManagers();

},[]);





const loadManagers=async()=>{


try{


const response = await api.get("/users");


const data = response.data.filter(

(user)=>
user.role?.name==="Project Manager"

);



setManagers(data);



}
catch(error){

console.log(error);

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


await createProject({

...form,

manager_id:
form.manager_id
?
Number(form.manager_id)
:
null


});



refreshProjects();


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
rounded-xl
p-8
w-full
max-w-lg
">


<h2 className="
text-2xl
font-bold
mb-6
">

Create Project

</h2>






<form
onSubmit={handleSubmit}
className="space-y-4"
>





<input

name="name"

placeholder="Project name"

value={form.name}

onChange={handleChange}

className="
w-full
border
p-3
rounded-lg
"

/>






<textarea

name="description"

placeholder="Description"

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


<option value="active">

Active

</option>


<option value="completed">

Completed

</option>


<option value="on hold">

On Hold

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


<option value="low">

Low

</option>


<option value="medium">

Medium

</option>


<option value="high">

High

</option>


</select>









<select

name="manager_id"

value={form.manager_id}

onChange={handleChange}

className="
w-full
border
p-3
rounded-lg
"

>


<option value="">

Select Project Manager

</option>


{
managers.map(manager=>(


<option

key={manager.id}

value={manager.id}

>

{manager.name}

</option>


))

}



</select>








<div>


<label>
Start Date
</label>


<input

type="date"

name="start_date"

value={form.start_date}

onChange={handleChange}

className="
w-full
border
p-3
rounded-lg
"

/>


</div>








<div>


<label>
End Date
</label>


<input

type="date"

name="end_date"

value={form.end_date}

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

disabled={loading}

className="
px-5
py-2
bg-blue-600
text-white
rounded-lg
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
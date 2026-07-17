"use client";


import {useEffect,useState} from "react";

import {
getUsers
} from "@/services/user";

import {
addMember
} from "@/services/member";



export default function AddMemberModal({
    projectId,
    closeModal,
    refreshProject
}){


const [users,setUsers] = useState([]);

const [selectedUser,setSelectedUser] = useState("");

const [loading,setLoading] = useState(false);





useEffect(()=>{

loadUsers();

},[]);





const loadUsers = async()=>{

try{

const response = await getUsers();

setUsers(response.data);

}
catch(error){

console.log(error);

}

};







const handleSubmit = async()=>{


if(!selectedUser)
return;



setLoading(true);



try{


await addMember(
projectId,
selectedUser
);



refreshProject();


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
max-w-md
">



<h2 className="
text-2xl
font-bold
mb-5
">

Add Team Member

</h2>





<select

value={selectedUser}

onChange={(e)=>setSelectedUser(e.target.value)}

className="
w-full
border
p-3
rounded-lg
"

>


<option value="">

Select User

</option>



{
users.map(user=>(

<option

key={user.id}

value={user.id}

>

{user.name}

-
{user.role?.name}

</option>

))

}


</select>






<div className="
flex
justify-end
gap-3
mt-6
">



<button

onClick={closeModal}

className="
px-5
py-2
rounded-lg
bg-gray-200
"

>

Cancel

</button>




<button

onClick={handleSubmit}

disabled={loading}

className="
px-5
py-2
rounded-lg
bg-blue-600
text-white
"

>

{
loading
?
"Adding..."
:
"Add Member"
}


</button>



</div>






</div>


</div>


)

}
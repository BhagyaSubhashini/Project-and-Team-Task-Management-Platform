"use client";


import {useState} from "react";


import {
createUser
} from "@/services/user";



export default function CreateUserModal({
    closeModal,
    refreshUsers
}){



const [form,setForm]=useState({

name:"",
email:"",
phone:"",
password:"",
role_id:""

});



const [loading,setLoading]=useState(false);






const handleChange=(e)=>{


setForm({

...form,

[e.target.name]:e.target.value

});


};







const handleSubmit=async()=>{


try{


setLoading(true);



await createUser(form);



refreshUsers();



closeModal();



}
catch(error){

    console.log(error.response?.data);

    alert(JSON.stringify(error.response?.data, null, 2));

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
mb-6
">

Create User

</h2>






<input

name="name"

placeholder="Full Name"

value={form.name}

onChange={handleChange}

className="
w-full
border
p-3
rounded-lg
mb-3
"

/>







<input

name="email"

placeholder="Email"

type="email"

value={form.email}

onChange={handleChange}

className="
w-full
border
p-3
rounded-lg
mb-3
"

/>







<input

name="phone"

placeholder="Phone"

value={form.phone}

onChange={handleChange}

className="
w-full
border
p-3
rounded-lg
mb-3
"

/>







<div className="mb-4">

<input

name="password"

placeholder="Password"

type="password"

value={form.password}

onChange={handleChange}

className="
w-full
border
p-3
rounded-lg
"

/>

<p className="
mt-2
text-xs
text-gray-500
">

Password must contain at least 6 characters.

</p>

</div>


<select

name="role_id"

value={form.role_id}

onChange={handleChange}

className="
w-full
border
p-3
rounded-lg
mb-5
"

>


<option value="">

Select Role

</option>


<option value="1">

Administrator

</option>


<option value="2">

Project Manager

</option>


<option value="3">

Team Member

</option>



</select>








<div className="
flex
justify-end
gap-3
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

disabled={loading || form.password.length < 6}

className={`
px-5
py-2
rounded-lg
text-white
transition

${
loading || form.password.length < 6
? "bg-gray-400 cursor-not-allowed"
: "bg-blue-600 hover:bg-blue-700"
}
`}

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






</div>



</div>


)

}
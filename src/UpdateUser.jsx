import axios from 'axios';
import React, { useState ,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

function UpdateUser() {
  const {id}=useParams()
    const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const navigate = useNavigate(); 

  useEffect(()=>{
   axios.get('http://localhost:3001/getUser/'+id)
   .then(result=>{console.log(result)
    setName(result.data.name)
    setEmail(result.data.email)
    setAge(result.data.age)
   })
   .catch(error=>console.log(error))
  },[])

  const Update =(e)=>{
    e.preventDefault();
    axios.put("http://localhost:3001/updateUser/"+id, { name, email, age })
      .then(result => {
        console.log(result);
        navigate('/'); 
      })
      .catch(error => console.log(error));
  }

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
     <div className="w-50 bg-white rounded p-3">
      <form onSubmit={Update}>
        <h2>Update User</h2>
        <div className="mb-2">
         <label htmlFor="">Name</label>
         <input type="text" placeholder="Enter Name" value={name} className="form-control" onChange={(e) => setName(e.target.value)}/>
        </div>
        <div className="mb-2">
         <label htmlFor="">Email</label>
         <input type="email" placeholder="Enter Email" value={email} className="form-control" onChange={(e) =>setEmail(e.target.value)}/>
        </div>
        <div className="mb-2">
         <label htmlFor="">Age</label>
         <input type="text" placeholder="Enter Age" value={age} className="form-control" onChange={(e) => setAge(e.target.value)}/>
        </div>
        <button className="btn btn-primary">Update</button>
      </form>
     </div>
    </div>
  )
}

export default UpdateUser


import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Tracking from '../img/time.jpeg';
import '../App.css';
function Create() {
  const navigate = useNavigate()
  const [state, setState] = useState({
    email: "",
    name: ""
  })

 const handleCallApi =async(e)=>{
  e.preventDefault()
   try{
    if(!!state.email && !!state.name){
      const {data} = await axios.post("/users",state)
      toast.success(`${data.message}. Emp Id:- ${data.user.id}`)
      navigate("/")
    }
   }
   catch(e){
    console.log(e)
   }
 }
  return (
    <>
      <div className='App'>
        <div className='image-part'>
          <img src={Tracking} alt='tracking img' />
        </div>
        <div className="create-user">
          <h4>Create User</h4>
          <form>
            <input type='text' placeholder='Name' value={state.name} onChange={(e) => setState({
              ...state,
              name: e.target.value

            })} />
            <input type='text' value={state.email} placeholder='Email' onChange={(e) => setState({
              ...state,
              email: e.target.value
            })} />
            <button className='create-user-btn' onClick={handleCallApi}>Create User</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Create;

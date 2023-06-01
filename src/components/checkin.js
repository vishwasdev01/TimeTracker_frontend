
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import moment from 'moment';
import axios from 'axios';


function Checkin() {
  const navigate = useNavigate();
  const [employeeId, setEmployeeId] = useState("")
  const fetchEmployee = async (id) => {
    try {
        const { data } = await axios.post(`/users/${id}/check_ins`,{
            check_in_time: moment().format("hh:mm A")
        })
        navigate(`/checkin/${parseInt((employeeId))}`);
    }
    catch (e) {
        console.log(e)
    }
}
  const closeModal = () => {
    if(!!employeeId){
      fetchEmployee(employeeId)
    }
  };

  return (
    <>
      <div className="modal open">
        <div className="modal-content">
          <div className="checkin-form">
            <form>
              <input placeholder="Enter Your Employee Id" type="text" value={employeeId} onChange={(e)=>setEmployeeId(e.target.value)}/>
            </form>
          </div>
          <button onClick={closeModal}>Enter</button>
        </div>
      </div>
    </>
  );
}

export default Checkin;

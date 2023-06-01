import axios from 'axios';
import moment from "moment";
import { useState } from 'react';
import Tracking from '../img/time.jpeg';
import '../App.css';

function Managment() {

  const [minDate, setMinDate] = useState('');
  const [userId, setUserId] = useState('')
  const [timeManagment, setTimeManagment] = useState("")

  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0];

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    if (selectedDate > formattedDate) {
      e.target.value = formattedDate;
    } else {
      setMinDate(selectedDate);
    }
  };

  const fetchData = async () => {
    try {
      const { data } = await axios.post(`/users/${parseInt(userId)}/total_time_spent`, {
        "date": moment(minDate).format("YY/MM/DD")
      })
      setTimeManagment(data)
    }
    catch (e) {
      console.log(e)
    }
  }


  return (
    <div className="App">
      <div className='image-part'>
        <img src={Tracking} alt='tracking img' />
      </div>
      <div className="time-box">
        <div className='employee-box'>
          <h1>Employee id:</h1>
          <input type='text' placeholder='Enter Employee Id' value={userId} onChange={(e) => setUserId(e.target.value)} />
          <input type="date" value={minDate} onChange={handleDateChange} />
          <button onClick={fetchData}>Search</button>
        </div>
        <h4>Time Management</h4>
        <div className='inner-time-box'>

          <div >
            <div>
              <div className='working-time'>
                <span className='work-text'>
                  Working Hours:
                </span>  <br />
                <span>
                  {parseInt(timeManagment.total_time_spent ?? 0)} hours {parseInt(timeManagment.minutes ?? 0)} min
                </span>
              </div>

              <p><b>Check-in Time:</b> {!!timeManagment?.user_check_ins ? moment(timeManagment?.user_check_ins[0]?.check_in_time).utc().format("hh:mm A") : 0}<span></span></p>
              <p><b>Check-out Time:</b> <span>{!!timeManagment?.user_check_outs ? moment(timeManagment?.user_check_outs[0]?.check_out_time).utc().format("hh:mm A") : 0}</span></p>
            </div>

            <div className='break-box'>
              <h5>Break time: </h5>
              {timeManagment?.user_breaks?.map((data, index) => (
                <div>
                  <h6>{index+1}st Break</h6>
                  <p><b>Check-out time:</b> <span>{moment(data.break_check_out_time).utc().format("hh:mm A")}</span></p>
                  <p><b>Check-in time:</b> <span>{moment(data.break_check_in_time).utc().format("hh:mm A")}</span></p>
                </div>

              ))}

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Managment;

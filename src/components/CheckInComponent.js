import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../App.css';
import Tracking from '../img/time.jpeg';
import axios from 'axios';
import moment from 'moment';
import { toast } from 'react-toastify';

const CheckInComponent = () => {
    const params = useParams()
    const navigate = useNavigate()
    const [state, setState] = useState({
        break_check_in_time: "",
        break_check_out_time: ""
    })

    const checkoutFun = async () => {
        try {
            if (params.id) {
                const { data } = await axios.post(`/users/${params.id}/check_outs`, {
                    check_out_time: moment().format("hh:mm A")
                })
                navigate("/")
            }
        }
        catch (e) {
            console.log(e)
        }
    }
    const breakTime = async () => {
        try {
            if (params.id) {
                const { data } = await axios.post(`/users/${params.id}/breaks`, {
                    break_check_in_time: moment(state.break_check_in_time, "HH:mm").format("hh:mm A"),
                    break_check_out_time: moment(state.break_check_out_time, "HH:mm").format("hh:mm A")
                })

                toast.success(data.message)
            }
        }
        catch (e) {
            console.log(e)
        }
    }
    return (
        <div className='App'>
            <div className='image-part'>
                <img src={Tracking} alt='tracking img' />
            </div>
            <div className='checkin-content'>
                <div className="inner-content">
                    <label>Break Time</label>
                    <div className='break-text'>
                        <span>Checkout Time</span>
                        <input type="time" value={state.break_check_out_time} onChange={(e) => setState({
                            ...state,
                            break_check_out_time: e.target.value
                        })} />
                    </div>  
                    <div className='break-text'>
                    <span>Checkin Time</span>
                    <input type="time" value={state.break_check_in_time} onChange={(e) => setState({
                        ...state,
                        break_check_in_time: e.target.value
                    })} />
                    </div>
                    <button className="break-btn" onClick={() => breakTime()}>Break</button>


                    {/* <select onChange={}>
                        <option>30 minutes</option>
                        <option>1 hour</option>
                        <option>1 hour 3o minutes</option>
                    </select> */}
                </div>
                <button className="checkout-btn" onClick={() => checkoutFun()}>Checkout</button>
            </div>
        </div>
    )
}

export default CheckInComponent
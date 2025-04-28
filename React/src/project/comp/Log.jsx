import axios from "axios";
import swal from "sweetalert";
import { getAdvertiser } from '../api/advertiser';
import './style.css';
import { useEffect, useState} from 'react';
import { setCurrentUser } from "./redux/Action";
import { useDispatch } from 'react-redux'
import { useSelector} from 'react-redux'
import { useNavigate } from "react-router-dom";
import { getAdvertiserByMailCode } from '../api/advertiser'

export const Log = () => {
    const navigate = useNavigate()

    const dis = useDispatch()

    const [formData, setFormData] = useState({
        email: '',
        code: '',
        phone: '0504120275'
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const newErrors = {};
        let isValid = true;

        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!formData.email.match(emailRegex)) {
            newErrors.email = 'אימייל לא תקין';
            isValid = false;
        }

        const passwordRegex = /^[0-9]{4,10}/;
        if (!formData.code.match(passwordRegex)) {
            newErrors.code = 'קוד לא תקין';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const [list, setList] = useState([]);
    useEffect(() => {
        getAdvertiser()
            .then(x => {
                setList(x.data);
            });
    }, []);

    
    const send = async (event) => {
        event.preventDefault();
        let has = false;

        list.forEach(item => {

            if (item.email === formData.email) {
                has = item;
            }
        });

        if (has !== false && validateForm) {
            setFormData({...formData,phone: has.phone})
            getAdvertiserByMailCode(formData)
            .then(x=>{
                localStorage.setItem("token",x.data.token)
                console.log(localStorage.getItem("token"));
                
            })
            dis(setCurrentUser(has))
            swal(`Hello ${has.email}`, 'login successfully! 😊😄😁😍', 'success')
            navigate('/Nihul')
        }
        else {
            swal('משתמש לא מזוהה במערכת', 'לחץ אישור לכניסה למערכת', 'errore')
            navigate('/LogIn')
        }

    };
    const currentUser = useSelector(Store => Store.currentUser)

    console.log(currentUser[0]);

    return (
        <div className="submit-form">
            <h4 className="submit-form__title">Login</h4>
            <form onSubmit={send} className="submit-form__fields">
                <label htmlFor="email" className="submit-form__label">User Email:*</label>
                <input
                    name="email"
                    className="submit-form__input"
                    placeholder="Input user email"
                    onChange={handleChange}
                />
                <p className="submit-form__error">{errors.email}</p>

                <label htmlFor="code" className="submit-form__label">Password:*</label>
                <input
                    name="code"
                    type="password"
                    className="submit-form__input"
                    placeholder="Input password"
                    onChange={handleChange}
                />
                <p className="submit-form__error">{errors.code}</p>

                <input type="submit" className="submit-form__submit-button" />
            </form>
        </div>
    );
}
export default Log;

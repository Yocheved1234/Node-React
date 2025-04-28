import swal from "sweetalert";
import { useEffect , useState , useSelector} from 'react';
import axios from "axios";
import { postAdvertiser } from '../api/advertiser';
import './style.css';
import { setCurrentUser } from "./redux/Action";
import { useDispatch } from 'react-redux'
import { getAdvertiser } from '../api/advertiser';
import { getAdvertiserByMailCode } from '../api/advertiser'
import { useNavigate } from 'react-router-dom';


export const LogIn = () => {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: '',
        phone: '',
        phoneEx: '',
        code: ''
    });

    let has = false;

    const [list, setList] = useState([]);

    useEffect(() => {
        getAdvertiser()
            .then(x => {
                setList(x.data);
            });
    }, []);

    list.forEach(item => {

        if (item.email === formData.email) {
            has = item;
        }
    });

    const dis = useDispatch()
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

        const phoneRegex = /^0\d([\d]{0,1})([-]{0,1})\d{7}$/;
        if (!formData.phone.match(phoneRegex)) {
            newErrors.phone = 'מספר טלפון לא תקין';
            isValid = false;
        }

        if (formData.phoneEx && !formData.phoneEx.match(phoneRegex)) {
            newErrors.phoneEx = 'מספר טלפון נוסף לא תקין';
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

    const send = async (event) => {


        event.preventDefault();
        if (validateForm() && has === false) {
            try {
                getAdvertiserByMailCode(formData)
                .then(x=>{
                    console.log(x.data.token)
                    localStorage.setItem("token",x.data.token)
                })
                const response = await postAdvertiser(formData);
                dis(setCurrentUser(formData));
                console.log('PP added:', response.data);
                navigate('/Nihul')

            }
            catch (error) {
                console.error('Error adding PP:', error.response ? error.response.data : error.message);
            }
        } else {
            if(has !== false){
                alert("משתמש קיים")
            }
            else{
                alert("בעיה בטופס")
            }
        }
    };

    return (
        <div className="submit-form">
                    <br></br><br></br>
                    <br></br><br></br>
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

                <label htmlFor="phone" className="submit-form__label">User phone:*</label>
                <input
                    name="phone"
                    className="submit-form__input"
                    placeholder="Input user phone"
                    onChange={handleChange}
                />
                <p className="submit-form__error">{errors.phone}</p>

                <label htmlFor="phoneEx" className="submit-form__label">Extra Phone:</label>
                <input
                    name="phoneEx"
                    className="submit-form__input"
                    placeholder="Input extra phone"
                    onChange={handleChange}
                />
                <p className="submit-form__error">{errors.phoneEx}</p>

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

export default LogIn;

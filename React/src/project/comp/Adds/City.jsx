import React, { useEffect, useState } from 'react';
import { getCity, postCity } from '../../api/city';
import '../style.css';
import { useNavigate } from 'react-router-dom';
import swal from "sweetalert";

export const AddCity = () => {
    const navigate = useNavigate()

    const [citys, setCitys] = useState({
        name: "",
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCitys(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    let has=true;

    // start city
    const [city, setCity] = useState([]);

    useEffect(() => {
        getCity()
            .then(x => {
                setCity(x.data);
            });
    }, []);

    city.forEach(item => {
        if (item.name === citys.name){
            has=false
        }
    })
    // end city

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (has === true) {

            try {
                const response = await postCity(citys);
                console.log('added:', response.data);
                console.log("Apartment data submitted:", citys);
                swal(`:הודעת מערכת`, 'העיר הוספה למאגר', 'success');
                navigate('/Nihul')

            }
            catch (error) {
                console.error('Error adding City:', error.response ? error.response.data : error.message);
            }
        }
        else {
            alert("יש את העיר הזאת כבר")
        }
    };

    return (
        <div>
            <h2>Add City</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={citys.name}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Add City</button>
            </form>
        </div>
    );
};
export default AddCity;


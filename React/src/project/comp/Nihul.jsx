import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { deleteApartment, getApartment } from "../api/apartment";
import './style.css';

export const Nihul = () => {
    const navigate = useNavigate();
    const currentUsere = useSelector(Store => Store.currentUser);
    const [list, setList] = useState([]);

    useEffect(() => {
        getApartment()
            .then(x => {
                setList(x.data);
            });
    }, []);

    const apartList = list.filter(x => x.advertiser && x.advertiser._id === currentUsere?._id);

    const ADDA1 = () => {
        navigate('/Add');
    };

    const ADDA2 = () => {
        navigate('/Category');
    };

    const ADDA3 = () => {
        navigate('/City');
    };

    const Nupdate = (item) => {
        navigate('/Edit', { state: { item } });
    };

    const Ndelete = async (item) => {
        try {
            const response = await deleteApartment(item._id);
            console.log('deleted:', response.data);
            console.log("Apartment data submitted:", item._id);
            swal(`:הודעת מערכת`, 'הדירה נמחקה מן המאגר', 'success');
    
            // עדכון המערך על ידי סינון הדירה שנמחקה
            setList(prevList => prevList.filter(apartment => apartment._id !== item._id));
        }
        catch (error) {
            console.error('Error adding PP:', error.response ? error.response.data : error.message);
        }
    };
    

    return (
        <div className="container">
            <br></br><br></br>
            <br></br><br></br>
            <br></br><br></br>
            <button className='submit-form__submit-button' onClick={ADDA1}>?רוצה להוסיף דירה למאגר</button>
            <br></br><br></br>
            <button className='submit-form__submit-button' onClick={ADDA2}>?רוצה להוסיף קטגוריה למאגר</button>
            <br></br><br></br>
            <button className='submit-form__submit-button' onClick={ADDA3}>?רוצה להוסיף עיר למאגר</button>
                        <div id="container">
                {apartList.map((item, index) =>
                    <div id='card' key={index}>
                        <h3>{item.name}</h3>
                        <img src={item.pic} style={{ width: '25vw', height: 'outo' }}></img><br></br>
                        {item.city?.name && <p id="p"><strong>City: </strong>{item.city.name}</p>}
                        {item.categories?.name && <p id="p"><strong>Categories: </strong>{item.categories.name}</p>}
                        <p><strong>Address:</strong> {item.address}</p>
                        <p><strong>Number of Beds:</strong> {item.numBed}</p>
                        <p><strong>Price:</strong> {item.price}</p>
                        <p><strong>Description:</strong> {item.description}</p>
                        <p><strong>Extras:</strong> {item.extras}</p>
                        <h3>for info:</h3>
                        {item.advertiser?.phone && <p id="p"><strong>Phone to contact: </strong>{item.advertiser.phone}</p>}
                        <button className="submit-form__submit-button" onClick={() => Nupdate(item)}>לעדכון פרטים✅</button>
                        <br />
                        <button className="submit-form__submit-button" onClick={() => Ndelete(item)}>למחיקה❎</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Nihul;

import React, { useEffect, useState } from 'react';
import { postApartment } from '../../api/apartment';
import { getCity } from '../../api/city';
import { getCategories, postCategories } from '../../api/categories';
import { getAdvertiser } from '../../api/advertiser';
import '../style.css';
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

export const Add = () => {
    const navigate = useNavigate()


    const [apa, setApa] = useState({
        name: "",
        address: "",
        city: "",
        categories: "",
        description: "",
        extras: "",
        numBed: "",
        price: "",
        advertiser: "",
        pic: ""
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setApa(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    //currentUser
    const currentUsere = useSelector(Store => Store.currentUser)
    //end currentUser

    // start city
    const [citi, setCiti] = useState([]);

    useEffect(() => {
        getCity()
            .then(x => {
                setCiti(x.data);
            });
    }, []);

    const cities = [];
    citi.forEach(item => {
        if (item.name !== null)
            cities.push(item.name)
    })
    // end city
    // start categories
    const [categorys, setCategorys] = useState([]);

    const category = [];
    useEffect(() => {
        getCategories()
            .then(x => {
                setCategorys(x.data);
            });
    }, []);

    categorys.forEach(item => {
        if (item.name !== null)
            category.push(item.name)
    })
    // end categorie

    // start user
    const [Alist, setAlist] = useState([]);
    const [list, setList] = useState([]);

    useEffect(() => {
        getAdvertiser()
            .then(x => {
                setAlist(x.data);
            });
    }, []);

    // עדכון ה-list לאחר ש-Alist עודכן
    useEffect(() => {
        if (currentUsere !== undefined) {
            setApa(prevState => ({
                ...prevState,
                advertiser: currentUsere._id

            }));
            const advertisers = [];
            for (let i = 0; i < Alist.length; i++) {
                if (currentUsere.email === Alist[i].email) {
                    advertisers.push(Alist[i]);
                    setList(Alist[i].apartArray);
                }
            }
            console.log(list);
        }
    }, [Alist, currentUsere]);

    // start check apartment

    let has = true;

    list.forEach(item => {
        if (item.name === apa.name && item.address === apa.address && item.city === apa.city
            && item.price === Number(apa.price)) {
            has = false;
        }
    });
    // end check apartment


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (has === true && apa.city !== "" && apa.categories !== "" && apa.numBed !== "" && apa.address !== "" && apa.name !== "") {

            try {
                const response = await postApartment(apa);
                console.log('added:', response.data);
                console.log("Apartment data submitted:", apa);
                // swal(`:הודעת מערכת`, 'הדירה הוספה למאגר', 'success');
                // navigate('/Nihul')

            }
            catch (error) {
                console.error('Error adding PP:', error.response ? error.response.data : error.message);
            }
        }
        else {
            if (has === false)
                alert("יש את הדירה הזאת כבר")
            else
                alert("חסר נתונים")

        }
    };
    if (apa.categories === "אחר")
        navigate('/Category')
    if (apa.city === "אחר")
        navigate('/City')
    return (
        <div>
                    <br></br><br></br>
                    <br></br><br></br>
                    <br></br><br></br>
            <h2>Add Apartment</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={apa.name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Address:</label>
                    <input
                        type="text"
                        name="address"
                        value={apa.address}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>City:</label>
                    <select
                        name="city"
                        value={apa.city}
                        onChange={handleChange}
                    >
                        <option value="">בחר עיר</option>
                        {cities.map(city => (
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>categories:</label>
                    <select
                        name="categories"
                        value={apa.categories}
                        onChange={handleChange}
                    >
                        <option value="">בחר קטגוריה</option>
                        {category.map(categories => (
                            <option key={categories} value={categories}>{categories}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={apa.description}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Extras:</label>
                    <textarea
                        name="extras"
                        value={apa.extras}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Number of Beds:</label>
                    <input
                        type="number"
                        name="numBed"
                        value={apa.numBed}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Price:</label>
                    <input
                        type="number"
                        name="price"
                        value={apa.price}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>picture:</label>
                    <input type="file"
                        className="styled-input"
                        accept="image/*"
                        onChange={(e) => (setApa(prevState => ({
                            ...prevState,
                            pic: URL.createObjectURL(e.target.files[0])
                        })))}>
                    </input></div>

                <button type="submit">Add Apartment</button>
            </form>
        </div>
    );
};
export default Add;


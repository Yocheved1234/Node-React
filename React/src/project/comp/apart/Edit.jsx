import React, { useEffect, useState } from 'react';
import { getApartment, patchApartment, postApartment } from '../../api/apartment';
import { getCity } from '../../api/city';
import { getCategories } from '../../api/categories';
import '../style.css';
import { useLocation, useNavigate } from 'react-router-dom';
import swal from "sweetalert";


export const Edit = () => {
    const navigate = useNavigate()

    const location = useLocation();
    const { item } = location.state || {};
    console.log(item);
    
    let app;
    if(item._id)
        app=item._id
   
    const [apa, setApa] = useState({
            name: item.name,
            description: item.description,
            categories: item.categories.name,
            numBed: item.numBed,
            extras: item.extras,
            price: item.price,
            pic: item.pic
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setApa(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
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

    // start apartment
    const [listA, setListA] = useState([]);

    const theApart = [];
    useEffect(() => {
        getApartment()
            .then(x => {
                setListA(x.data);
            });
    }, []);

    listA.forEach(item => {
        if (item._id === app){
            theApart.push(item)
        }
    })
    // end apartment

    const handleSubmit = async (event) => {
        event.preventDefault();
            try {
                const response = await patchApartment(app,apa);
                console.log('added:', response.data);
                console.log("Apartment data submitted:", apa);
                swal(`:הודעת מערכת`, 'הדירה עודקנה במאגר', 'success');
                navigate('/Nihul')

            }
            catch (error) {
                console.error('Error adding PP:', error.response ? error.response.data : error.message);
            }

    };

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
export default Edit;



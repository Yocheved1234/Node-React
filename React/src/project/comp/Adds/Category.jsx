import React, { useEffect, useState } from 'react';
import '../style.css';
import { getCategories, postCategories } from '../../api/categories';
import { useNavigate } from 'react-router-dom';
import swal from "sweetalert";

export const AddCategory = () => {
    const navigate = useNavigate()

    const [category1, setCategory1] = useState({
        name: "",
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategory1(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    let has=true;

    // start category
    const [category, setCategory] = useState([]);

    useEffect(() => {
        getCategories()
            .then(x => {
                setCategory(x.data);
            });
    }, []);

    category.forEach(item => {
        if (item.name === category1.name){
            has=false
        }
    })
    // end category

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (has === true) {

            try {
                const response = await postCategories(category1);
                console.log('Category:', response.data);
                console.log("Apartment data submitted:", category1);
                swal(`:הודעת מערכת`, 'הקטגוריה הוספה למאגר', 'success');
                navigate('/Nihul')

            }
            catch (error) {
                console.error('Error adding Category:', error.response ? error.response.data : error.message);
            }
        }
        else {
            alert("יש את הקטגורי הזאת כבר")
        }
    };

    return (
        <div>
            <h2>Add Categories</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={category1.name}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Add Categories</button>
            </form>
        </div>
    );
};
export default AddCategory;


import { useEffect, useState } from 'react';
import { bedMax, bedMin, priceMax, priceMin } from '../api/apartment';
import { getCity, getApart } from '../api/city';
import './style.css';
import { getApartCategories, getCategories } from '../api/categories';

export const All = () => {
    const [list, setList] = useState([]);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000);
    const [minBed, setMinBed] = useState(0);
    const [maxBed, setMaxBed] = useState(20);
    const [allcities, setAll] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [allCategories, setAllCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState('');

    console.log(list);
    
    useEffect(() => {
        getCategories()
            .then(x => {
                setAllCategories(x.data);
            })
            .catch(error => {
                console.error("Error fetching categories:", error);
            });
    }, []); // הוספת מערך תלותים ריק כדי שהקריאה תתבצע רק בפעם הראשונה
    
    useEffect(() => {
        if (selectedCategories) {
            getApartCategories(selectedCategories)
                .then(x => {
                    setList(x.data[0].arrayApart);
                })
                .catch(error => {
                    console.error("Error fetching apartments:", error);
                });
        } else {
            setList([]);
        }
    }, [selectedCategories]); // תלות ב-selectedCategories
    
    useEffect(() => {
        getCity()
            .then(x => {
                setAll(x.data);
            })
            .catch(error => {
                console.error("Error fetching cities:", error);
            });
    }, []); // הוספת מערך תלותים ריק
    
    useEffect(() => {
        if (selectedCity) {
            getApart(selectedCity)
                .then(x => {
                    setList(x.data[0].arrayApart);
                })
                .catch(error => {
                    console.error("Error fetching apartments:", error);
                });
        } else {
            setList([]);
        }
    }, [selectedCity]); // תלות ב-selectedCity
    
    // הוספת מערך תלותים לכל useEffect שקשור ל-maxBed, minBed, maxPrice, minPrice
    

    useEffect(() => {
        bedMax(maxBed)
            .then(x => {
                setList(x.data);
            })
            .catch(error => {
                console.error("Error fetching apartments:", error);
            });
    }, [maxBed]);

    useEffect(() => {
        bedMin(minBed)
            .then(x => {
                setList(x.data);
            })
            .catch(error => {
                console.error("Error fetching apartments:", error);
            });
    }, [minBed]);

    useEffect(() => {
        priceMax(maxPrice)
            .then(x => {
                setList(x.data);
            })
            .catch(error => {
                console.error("Error fetching apartments:", error);
            });
    }, [maxPrice]);

    useEffect(() => {
        priceMin(minPrice)
            .then(x => {
                setList(x.data);
            })
            .catch(error => {
                console.error("Error fetching apartments:", error);
            });
    }, [minPrice]);
   let t=" 0556784415"
    return (
        <div className="container">
            <div className="filter-section">
            <br></br><br></br>
            <br></br><br></br>
            <br></br><br></br>

                <h2>Filter Apartments</h2>
                <div className="price-range">
                    <span>Max Price: {maxPrice}</span>
                    <input
                        type="range"
                        id="priceRange"
                        min="0"
                        max="1000"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                    />
                    <span>Min Price: {minPrice}</span>
                    <input
                        type="range"
                        id="minPriceRange"
                        min="0"
                        max={maxPrice}
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                    />
                </div>
                <div className="bed-range">
                    <label htmlFor="minBed">Min Beds:</label>
                    <input
                        type="number"
                        id="minBed"
                        value={minBed}
                        onChange={(e) => setMinBed(e.target.value)}
                    />
                    <label htmlFor="maxBed">Max Beds:</label>
                    <input
                        type="number"
                        id="maxBed"
                        value={maxBed}
                        onChange={(e) => setMaxBed(e.target.value)}
                    />
                </div>
                <div className="city">
                    <label htmlFor="citySelect">בחר עיר:</label>
                    <select id="citySelect" value={selectedCity} onChange={
                        (e) => setSelectedCity(e.target.value)}
                    >
                        <option value="">--בחר עיר--</option>
                        {allcities.map((city, index) => (
                            <option key={index} value={city.name}>{city.name}</option>
                        ))}
                    </select>
                </div>
                <div className="categories">
                    <label htmlFor="categoriesSelect">בחר קטגוריה:</label>
                    <select id="categoriesSelect" value={selectedCategories} onChange={
                        (e) => setSelectedCategories(e.target.value)}
                    >
                        <option value="">--בחר קטגוריה--</option>
                        {allCategories.map((categories, index) => (
                            <option key={index} value={categories.name}>{categories.name}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div id="container">
                {list.map((item, index) =>
                    <div id='card' key={index}>
                        <h3>{item.name}</h3>
                        <img src={item.pic} style={{ width: '25vw', height: 'outo' }}></img><br></br>
                        {item.city?.name && <p id="p"><strong>City: </strong>{item.city.name}</p>}
                        {item.categories?.name && <p id="p"><strong>Categories: </strong>{item.categories.name}</p>}
                        <p><strong>Address:</strong> {item.address}</p>
                        <p><strong>Number of Beds:</strong> {item.numBed}</p>
                        <p><strong>Price:</strong> {item.price}</p>
                        <p><strong>Descripti+on:</strong> {item.description}</p>
                        <p><strong>Extras:</strong> {item.extras}</p>
                        <h3>for info:</h3>
                        {item.advertiser?.phone && <p id="p"><strong>Phone to contact: </strong>{item.advertiser.phone}</p>}
                    </div>
                )}
            </div>
        </div>
    );
};

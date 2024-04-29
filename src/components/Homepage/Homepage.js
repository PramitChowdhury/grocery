import React, { useState, useEffect } from 'react';
import './Homepage.css';

// Import images
import image1 from '../Media/Images/image-06.jpg';
import image2 from '../Media/Images/image-07.jpg';
import image3 from '../Media/Images/image-03.jpg';
import image4 from '../Media/Images/image-04.jpg';
import image5 from '../Media/Images/image-05.jpg';
import Navbar from '../Navbar/Navbar';

const images = [image1, image2, image3, image4, image5];

function Homepage() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 2500); // Change image every 2.5 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <Navbar />
            <div className='welcome-line'>
                <center>
                    <h1>Welcome to Grocery Store</h1>
                </center>
            </div>
            <div className="pic-ctn">
                <img
                    src={images[currentImageIndex]}
                    alt={`Image ${currentImageIndex + 1}`}
                    className="pic"
                />
            </div>
        </div>
    );
}

export default Homepage;

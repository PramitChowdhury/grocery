import Navbar from '../Navbar/Navbar';
import './AboutUs.css';
function AboutUs() {
    return (
        <div>
            <Navbar />
            <div className="container-6">
                <center>
                    <div className='welcome-line'>
                        <h1 className="heading">About Us</h1>
                        <br />
                        <b><h4><p>This is the store where you can rely on and order your Grocery requirements!</p>
                            <br />
                            <p>For any queries, please contact us at : </p>
                            <br />
                            <p>Phone no:8670199764</p>

                            <p> Email:pramitchowdhury@gmail.com</p>
                        </h4></b>
                    </div>
                </center>
            </div>
        </div>


    );
}

export default AboutUs;
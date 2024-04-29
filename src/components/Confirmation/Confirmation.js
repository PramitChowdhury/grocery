import { Link } from 'react-router-dom';
//import { Default } from 'react-toastify/dist/utils';
import Navbar from '../Navbar/Navbar';
import './Confirmation.css';
function Confirmation() {
    return (
        <div>
            <Navbar />
            <div className="container-6">
                <center>
                    <div className='welcome-line'>
                        <h1 className="heading">Your Order Is Confirmed</h1>
                        <br />
                        <b><h4><p>Thank You For Placing Your Order With Us!</p>
                            <br />

                            <br />
                            <p>To Place another order <Link to="/user-login/customer">Click Here</Link></p>
                        </h4></b>
                    </div>
                </center>
            </div>
        </div>


    );
}

export default Confirmation;
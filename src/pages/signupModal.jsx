import { Modal } from 'react-bootstrap';
import FormSignUpComponent from '../components/formSignUpComponent';
import { useAuth } from "../contexts/autoContext";
import { toast } from 'react-toastify';
import { useDarkMode } from '../contexts/darkModeContext'
import SigninModal from '../pages/signinModal';
import { useState } from 'react';


function SignupModal({show, handleClose }) {
    const { signUp } = useAuth();
    const { darkMode } = useDarkMode();
    const [showSigninModal, setShowSigninModal] = useState(false);
    const handleCloseSignin = () => setShowSigninModal(false);

    const handelFormSubmit = async (data) => {
    try {
        await signUp(data);
        toast.success("The user registered successfuliy", {theme: darkMode ? 'dark' : 'light'}); 
        handleClose();
        setShowSigninModal(true);
    } catch (error) {
        toast.error(error.response ? error.response.data : error.message, {theme: darkMode ? 'dark' : 'light'});
    }
        
};


    return (
        <>
    <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton className={darkMode ? "bg-dark text-light" : "bg-light text-dark"}>
                <Modal.Title>Sign Up</Modal.Title>
            </Modal.Header>
            <Modal.Body className={darkMode ? "bg-dark text-light" : "bg-light text-dark"}>              
                <FormSignUpComponent onSubmit = {handelFormSubmit}/>
            </Modal.Body>
        </Modal>
        
        <SigninModal show={showSigninModal} handleClose={handleCloseSignin} />
        </>
        );


}

export default SignupModal;


import { Modal } from 'react-bootstrap';
import FormEditCardModal from '../components/formEditCardModal';
import { useCards } from "../contexts/cardContext";
import { toast } from 'react-toastify';
import { useDarkMode } from '../contexts/darkModeContext';


function EditCardModal({show, handleClose, card}) {
    const { updateCard } = useCards();
    const { darkMode } = useDarkMode();

    const handelFormSubmit = async (data) => {
            try{
            await updateCard(card._id, data);
            toast.success("A new business card has been updated", {theme: darkMode ? 'dark' : 'light'}) ;                 
            handleClose();
            } catch (error) {
toast.error(error.response ? error.response.data : error.message, {theme: darkMode ? 'dark' : 'light'});
            }
    };

    return (
        <>
    <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton className={darkMode ? "bg-dark text-light" : "bg-light text-dark"}>
                <Modal.Title>Update Card</Modal.Title>
            </Modal.Header>
            <Modal.Body className={darkMode ? "bg-dark text-light" : "bg-light text-dark"}>              
                <FormEditCardModal card={card} onSubmit={handelFormSubmit}/>
            </Modal.Body>
        </Modal>
        </>
        );
        
}

export default EditCardModal;

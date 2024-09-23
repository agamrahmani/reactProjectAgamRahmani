import { Modal } from 'react-bootstrap';
import FormCardModal from '../components/formCardModal';
import { useCards } from "../contexts/cardContext";
import { toast } from 'react-toastify';
import { useDarkMode} from "../contexts/darkModeContext";


function CreateCardModal({show, handleClose }) {
    const { createCard } = useCards();
    const { darkMode } = useDarkMode();

    const handelFormSubmit = async (data) => {
            try{
            await createCard(data);
            toast.success("A new business card has been created", {theme: darkMode ? 'dark' : 'light'});                 
            handleClose();
            } catch (error) {
toast.error(error.response ? error.response.data : error.message, {theme: darkMode ? 'dark' : 'light'});
            }
    };

    return (
    <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton >
                <Modal.Title>Create Card</Modal.Title>
            </Modal.Header>
            <Modal.Body>              
                <FormCardModal onSubmit = {handelFormSubmit}/>
            </Modal.Body>
        </Modal>
        );
}

export default CreateCardModal;


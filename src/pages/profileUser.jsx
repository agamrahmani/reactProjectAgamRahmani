import { useAuth } from "../contexts/autoContext";
import { useDarkMode } from "../contexts/darkModeContext";
import { useState} from "react";
import { Modal } from 'react-bootstrap';
import FormUpdateUserModal from "../components/formUpdateUserModal";
import { toast } from 'react-toastify';


function ProfileUser() {
const { user, editUser  } = useAuth();
const { darkMode } = useDarkMode();
const [showEditUsersModal, setShowEditUserModal] = useState(false);


const handleShowEditUserModal = () => setShowEditUserModal(true);
const handleCloseEditUserModal = () => setShowEditUserModal(false);


    const handleFormSubmit = async (data) => {
            try{
            await editUser(user._id, data);
            toast.success("The user's details have been updated successfully.", {theme: darkMode ? 'dark' : 'light'}) ;                 
            handleCloseEditUserModal();
            } catch (error) {
toast.error(error.response ? error.response.data : error.message, {theme: darkMode ? 'dark' : 'light'});
            }
    };


return (
    <>
<h1>Profile User</h1>
{user && (
    <>
<p>Name: <span>{user.name.first} {user.name.middle} {user.name.last}</span></p>
<p>Phone: <span>{user.phone ? user.phone : "No phone available"}</span></p>
<p>Address:<span> {user.address.state == "not defined" ? "" : user.address.state} {user.address.country}  {user.address.city} {user.address.street} {user.address.houseNumber}</span></p>
<p>Zip: <span>{user.address.zip}</span></p>
</>)}

<button className={`btn ${darkMode ? "btn-light" : "btn-dark"}`} onClick={handleShowEditUserModal}>Edit user</button>

<Modal show={showEditUsersModal} onHide={handleCloseEditUserModal}>
            <Modal.Header closeButton className={darkMode ? "bg-dark text-light" : "bg-light text-dark"} >
                <Modal.Title>Update User</Modal.Title>
            </Modal.Header>
            <Modal.Body className={darkMode ? "bg-dark text-light" : "bg-light text-dark"}>              
                <FormUpdateUserModal user={user} onSubmit={handleFormSubmit}/>
            </Modal.Body>
        </Modal> 

    </>     
    );
}

export default ProfileUser;



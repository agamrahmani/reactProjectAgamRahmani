import "../../css/cardCommon.css"
import React from 'react';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDarkMode} from "../../contexts/darkModeContext";
import { useAuth } from "../../contexts/autoContext";
import { useCards } from '../../contexts/cardContext';
import EditCardModal from "../../pages/editCarModal"


function CardCommon ({card, onClick, initialLike}){
    const { darkMode } = useDarkMode();
    const { user } = useAuth();
    const { deleteCard, patchLike} = useCards();
    const [showEditCardsModal, setShowEditCardModal] = useState(false);
    // const [like, setLike] = useState(initialLike);
    const [like, setLike] = useState(user ? card.likes.includes(user._id) : false);


useEffect(() => {
    if (user) {
        // const likes = JSON.parse(localStorage.getItem('likes')) || {};
        // setLike(likes[user._id]?.[card._id] || false);
        setLike(card.likes.includes(user._id));
    }
}, [user, card._id]);


const handleLike = async (event) => {
    event.stopPropagation();
    try {
        await patchLike(card._id);
        const userId = user._id;
        const likes = JSON.parse(localStorage.getItem('likes')) || {};
        likes[userId] = likes[userId] || {};
        likes[userId][card._id] = !like;
        localStorage.setItem('likes', JSON.stringify(likes));
        setLike((prev) => !prev);
        const message = !like ? 
            "The card has been marked as a favorite" : 
            "The card is not marked as a favorite";
        toast.success(message, { theme: darkMode ? 'dark' : 'light' });
    } catch (error) {
        toast.error(error.response ? error.response.data : error.message, { theme: darkMode ? 'dark' : 'light' });
    }
};


    const handleDelete = async (event) => {
        event.stopPropagation();
            try{
            await deleteCard(card._id, card.bizNumber);
            toast.success("Card deleted successfully",  {theme: darkMode ? 'dark' : 'light'});                
            } catch (error) {
toast.error(error.response ? error.response.data : error.message,  {theme: darkMode ? 'dark' : 'light'});
            }
    };


const handleShowEditCardModal = () => setShowEditCardModal(true);
const handleCloseEditCardModal = () => setShowEditCardModal(false);

    const handleEdit = async (event ) => {
        event.stopPropagation();
        handleShowEditCardModal();
    }



return (
    <>
    <div onClick={onClick} className={`card crad-transition mb-3 ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`} style={{width: '100%'}}>
        <img src={card.image.url} className="card-img-top" alt={card.image.alt}  /> 
        <div className="card-header">
            <h5 className="card-title">{card.title}</h5>
            <h6 className="card-subtitle mb-2">{card.subtitle}</h6>
        </div>
        <div className="card-body">
            <p className="card-text">{card.description}</p>
        </div>
        <div className='card-footer d-flex justify-content-between'>
            <div className="d-flex justify-content-start">
                <a href={`tel:${card.phone}`} className="text-decoration-none me-2" onClick={(e)=>e.stopPropagation()}><i className="bi bi-telephone"></i></a>
                {user && <i className={like ? "bi bi-heart-fill text-danger":  "bi bi-heart text-primary"} onClick={handleLike}></i>}
            </div>
        {(user?.isAdmin || user?._id === card.user_id) && (
        <div className="d-flex">
        <i className="bi bi-trash3 text-primary me-2" onClick={handleDelete}></i>
        <i className="bi bi-pencil-square text-primary" onClick={handleEdit}></i>
        </div>
        )}
        </div>
    </div>

    {showEditCardsModal && (
        <EditCardModal show= {handleShowEditCardModal} card={card} handleClose={handleCloseEditCardModal} /> 
    )}
    </>
    );
}

export default CardCommon;







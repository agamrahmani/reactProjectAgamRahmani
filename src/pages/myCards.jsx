import { useEffect, useState } from "react";
import { useCards } from "../contexts/cardContext";
import CreateCardModal from "./createCardModal";
import CardPagination from "../components/common/cardPagination";
import { useSearch } from "../contexts/searchContext";
import Spinner from "../components/common/spinner";
import { useDarkMode } from "../contexts/darkModeContext";


function MyCards() {
    const { fetchAllMyCards, myCards } = useCards();
    const [loading, setLoading] = useState(true);
    const { searchQuery } = useSearch();
    const { darkMode } = useDarkMode();
    const filterCards = searchQuery == '' ? myCards : myCards.filter(card => card.title.toLowerCase().includes(searchQuery.toLowerCase()));


useEffect(()=>{
        const loadCards = async () =>{
            setLoading(true);
            try{
                await fetchAllMyCards();               
                
            }catch (error) {
                console.error("Faild to fetch cards:", error);
            } finally{
                setLoading(false);
            }
        }
        loadCards();
        },[]);




const [showCardModal, setShowCardModal] = useState(false);

const handleShowCardModal = () => setShowCardModal(true);
const handleCloseCardModal = () => setShowCardModal(false);

return (
    <>
    <button className={`btn btn-lg rounded-pill shadow-sm border ${darkMode ? "text-light" : "text-dark"}`} onClick={handleShowCardModal}>+</button>
    <CreateCardModal show={showCardModal} handleClose={handleCloseCardModal} />
    {loading ? (<Spinner />) :( myCards && <CardPagination cards={filterCards}/>)}
    </>     
    );
}

export default MyCards;
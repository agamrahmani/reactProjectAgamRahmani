import { useEffect } from "react";
import CardPagination from "../components/common/cardPagination";
import PageHeader from "../components/common/pageHeader";
import Logo from "../components/logo";
import { useCards } from "../contexts/cardContext";
import { useAuth } from "../contexts/autoContext";
import { useState } from "react";
import CreateCardModal from "./createCardModal";
import  Spinner  from "../components/common/spinner" ;
import { useSearch } from "../contexts/searchContext";
import { useDarkMode } from "../contexts/darkModeContext";

function Home() {

const [showCardModal, setShowCardModal] = useState(false);
const [loading, setLoading] = useState(true);

const handleShowCardModal = () => setShowCardModal(true);
const handleCloseCardModal = () => setShowCardModal(false);

    const { user  } = useAuth();
    const { cards, fetchAllCards } = useCards();
    const { searchQuery } = useSearch();
    const { darkMode } = useDarkMode();
    
useEffect(()=>{
        const loadCards = async () =>{
            setLoading(true);
            try{
                await fetchAllCards();
                
            }catch (error) {
                console.error("Faild to fetch cards:", error);
            } finally{
                setLoading(false);
            }
        }
        loadCards();
        },[]);

        const filterCards = searchQuery == '' ? cards : cards.filter(card => card.title.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <>
        <div className="container">
            <PageHeader title={<Logo />} description="Here you can see all the businesses that have added a card with details about their business." />
            {user && <button className={`btn btn-lg rounded-pill shadow-sm border ${darkMode ? "text-light" : "text-dark"}`} onClick={handleShowCardModal}>+</button>}
        </div>
        <CreateCardModal show={showCardModal} handleClose={handleCloseCardModal} />
        {loading ? (<Spinner />) :( <CardPagination cards={filterCards}/>)}
    
        </>
        
    );
}

export default Home;
import { useEffect, useState } from "react";
import { useCards } from "../contexts/cardContext";
import CardPagination from "../components/common/cardPagination";
import Spinner from "../components/common/spinner";
import { useAuth } from "../contexts/autoContext";


function FavCards() {
    const [loading, setLoading] = useState(true);
    const { cards, fetchAllCards} = useCards();
    const { user } = useAuth();
    const [likedCards, setLikedCards] = useState([]);



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

useEffect(() => {
        if (user) {
            const likes = JSON.parse(localStorage.getItem('likes')) || {};
            const likedCardIds = Object.keys(likes[user._id] || {});
            const newLikedCards = cards.filter(card => likedCardIds.includes(card._id));
            setLikedCards(newLikedCards);
        }
    }, [user, cards]); 


return (
    <>
    {loading ? (<Spinner />) :( user && <CardPagination cards={likedCards}/>)} 

    </>     
    );
}

export default FavCards;



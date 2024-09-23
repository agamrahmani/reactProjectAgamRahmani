import React, { createContext, useContext, useState, useEffect } from 'react';
import cardsService from "../services/cardService"; 
import { toast } from 'react-toastify';

export const CardsContext = createContext({
    cards: [],
    myCards: [],
    fetchAllCards: () => {},
    fetchCard: () => {},
    createCard: () => {},
    updateCard: () => {},
    deleteCard: () => {},
    patchLike: () => {},
});

export function CardsProvider({ children }) {
    const [cards, setCards] = useState([]);
    const [myCards, setMyCards] = useState([]);


    useEffect(() => {
        const loadCards = async () => {
            try {
                const response = await cardsService.getAllCards();
                setCards(response.data);
            } catch (error) {
                toast.error("Failed to fetch cards", error);
            }
        };

        loadCards();
    }, []);

    const fetchAllCards = async () => {
        try {
            const response = await cardsService.getAllCards();
            setCards(response.data);
        } catch (error) {
            console.error("Failed to fetch cards", error);
        }
    };


    const fetchCardById = async (id) =>{
        const response = await cardsService.getCardById(id);
        return response;
    }

    const createCard = async (card) => {
        try{
            const response = await cardsService.createCard(card);
            setCards(prevCards => [...prevCards, response.data]);
            setMyCards(prevCards => [...prevCards, response.data]);
        } catch (error){
            console.error("Faild to create card", error);
        }
    }

    const fetchAllMyCards = async () =>{
        try{
            const response = await cardsService.getAllMyCards();
            setMyCards(response.data);
        } catch (error){
            console.error("Faild to fetch cards", error);
        }
    }

    const updateCard = async (id, updatedCard) => {
        try {
            const response = await cardsService.updateCard(id, updatedCard);
            setCards(prevCards => prevCards.map(card =>(card._id == id? {...card, ...response.data} : card)));
            setMyCards(prevCards => prevCards.map(card =>(card._id == id? {...card, ...response.data} : card)));
        } catch (error) {
            console.error("Failed to update card", error);
            throw error;
        }
    };


    const deleteCard = async (id, bizNumber)=>{
        try{
            await cardsService.deleteCard(id, bizNumber);
            setCards(prevCards => prevCards.filter(card =>card._id !== id));
            setMyCards(prevCards => prevCards.filter(card =>card._id !== id));
        }
        catch (error){
            console.error("Failed to delete card", error);
            throw error;
        }
        }

    const patchLike = async (id)=>{
        try{
            await cardsService.likeOrUnlike(id);
            fetchAllCards();
        }
        catch (error){
            console.error("Faild to patch like or unlike", error);
            throw error;
        }
    }

    return (
        <CardsContext.Provider value={{ cards, myCards, fetchAllCards, fetchCardById, createCard, fetchAllMyCards, updateCard, deleteCard, patchLike }}>
            {children}
        </CardsContext.Provider>
    );
}

export function useCards() {
    return useContext(CardsContext);
}

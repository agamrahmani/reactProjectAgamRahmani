import httpService from "./httpsService";

export function createCard(card) {
    return httpService.post("/cards", card);
}

export function getAllCards() {
    return httpService.get("/cards");
}

export function getCardById(id) {
    return httpService.get(`/cards/${id}`);
}

export function getAllMyCards() {
    return httpService.get("/cards/my-cards");
}

export function deleteCard(id, bizNumber) {
    return httpService.delete(`/cards/${id}`, bizNumber);
}

export function updateCard(id, card) {
    return httpService.put(`/cards/${id}`, card);
}
export function likeOrUnlike(id){
    return httpService.patch(`/cards/${id}`);
}

const cardsService = {
    createCard,
    getAllCards,
    getCardById,
    getAllMyCards,
    deleteCard,
    updateCard,
    likeOrUnlike,
};

export default cardsService;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Pagination } from 'react-bootstrap';
import CardCommon from './cardCommon';
import { useAuth } from '../../contexts/autoContext';


const CardPagination = ({ cards}) => {
    // const likes = JSON.parse(localStorage.getItem('likes')) || {};
    const { user } = useAuth();
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const handelCardClick = (id) =>{
        navigate(`/card/${id}`);
    }
    const cardsPerPage = 9;

    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const validIndexOfFirstCard = Math.max(indexOfFirstCard, 0);
    const validIndexOfLastCard = Math.min(indexOfLastCard, cards.length);
    const currentCards = cards.slice(validIndexOfFirstCard, validIndexOfLastCard);


    const pageCount = Math.ceil(cards.length / cardsPerPage);
    const paginationItems = [];
    const showPages = 5; 
    const startPage = Math.max(1, currentPage - Math.floor(showPages / 2));
    const endPage = Math.min(pageCount, startPage + showPages - 1);

    if (startPage > 1) {
        paginationItems.push(
            <Pagination.Item key="prev-ellipsis" disabled>
                ...
            </Pagination.Item>
        );
    }

    if (currentPage > 1) {
        paginationItems.push(
            <Pagination.Prev key="prev" onClick={() => setCurrentPage(currentPage - 1)} />
        );
    }

    for (let i = startPage; i <= endPage; i++) {
        paginationItems.push(
            <Pagination.Item key={i} active={i === currentPage} onClick={() => setCurrentPage(i)}>
                {i}
            </Pagination.Item>
        );
    }

    if (currentPage < pageCount) {
        paginationItems.push(
            <Pagination.Next key="next" onClick={() => setCurrentPage(currentPage + 1)} />
        );
    }

    if (endPage < pageCount) {
        paginationItems.push(
            <Pagination.Item key="next-ellipsis" disabled>
                ...
            </Pagination.Item>
        );
    }

    
    return (
    <Container>
    <Row>
        {currentCards.map((card) => {
    
            const isLiked = card.likes.includes(user._id) || false;

            return (
                <Col key={card._id} xs={12} md={4} className="mb-3">
                    <CardCommon card={card} onClick={() => handelCardClick(card._id)} initialLike={isLiked} />
                </Col>
            );
        })}
    </Row>
    <Pagination className="justify-content-center mt-3">
        {paginationItems}
    </Pagination>
</Container>

    );
};

export default CardPagination;

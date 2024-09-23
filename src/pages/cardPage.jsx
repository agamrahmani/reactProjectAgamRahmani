import React from 'react';
import { useParams } from 'react-router-dom';
import { useCards } from "../contexts/cardContext";
import { Container, Row, Col } from 'react-bootstrap';
import { useEffect  } from 'react';
import { useState } from 'react';
import Spinner from '../components/common/spinner';
import { useDarkMode } from "../contexts/darkModeContext";


function CardPage() {
    const { id } = useParams();   ;
    const [currentCard, setCurrentCard] = useState(null);
    const { darkMode } = useDarkMode(); 


    const { fetchCardById } = useCards();
    useEffect(()=>{
        const fetchOneCard = async () =>{
            try{
                const res = await fetchCardById(id);
                setCurrentCard(res.data);
            }catch (error) {
                console.error("error fetching card", error);
            }
        }
        fetchOneCard();
        },[id]);




    return (
        <Container className="my-4">
            <Row className="justify-content-center">
                <Col xs={12} md={8} lg={8} xl={6}>
                {currentCard ? (
<div className={`card shadow-sm d-flex flex-cloumn my-3 ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}  style={{ height:"auto" }}>
                        <img src={currentCard.image.url} className="card-img-top" alt={currentCard.image.alt} style={{height: '200px'}}/>
                        <div className="card-header text-center">
                            <h5 className="card-title mb-0">{currentCard.title}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">{currentCard.subtitle}</h6>
                        </div>
                        <div className="card-body">
                            <ul className="list-group list-group-flush">
                                <li className={`list-group-item ${darkMode ? "list-group-item-dark": "list-group-item-light"}`}>{currentCard.description}</li>
                                <li className={`list-group-item ${darkMode ? "list-group-item-dark": "list-group-item-light"}`}>Email: {currentCard.email}</li>
                                <li className={`list-group-item ${darkMode ? "list-group-item-dark": "list-group-item-light"}`}>Phone: {currentCard.phone}</li>
                                {currentCard.web && <li className={`list-group-item ${darkMode ? "list-group-item-dark": "list-group-item-light"}`}><span>Website:</span> <a href={currentCard.web} target='_blank' rel='noopener norefrrer'>{currentCard.web}</a></li>}
                                <li className={`list-group-item ${darkMode ? "list-group-item-dark": "list-group-item-light"}`}>
                                    <i className="bi bi-geo-alt ms-2"></i> 
                                    {currentCard.address.street} {currentCard.address.houseNumber}, {currentCard.address.city} {currentCard.address.country} {currentCard.address.state && <span>{currentCard.address.state}</span>}
                                </li>
                            </ul>
                        </div>                       
                    </div>
                    ): (<Spinner />)}   


                </Col>
            </Row>
        </Container>
    );
}

export default CardPage;

  
import './InquiryPage.css';
import HistoryCard from '../components/HistoryCard';
import { useState, useEffect } from 'react';
import { cardList } from '../api/HistoryApi';
import { Carousel } from "flowbite-react";

const InquiryPage = () => {
    const [cards, setCards] = useState([]);

    const invisibleButton = (
        <span className='w-20 h-full opacity-0 cursor-pointer absolute inset-y-0' />
    );

    const handleCardDelete = async (deleteCardNo) => {
        setCards((prevCards) => prevCards.filter((card) => { card.cardNo != deleteCardNo }));
    };

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const data = await cardList();
                setCards(data);
            } catch (e) {
                console.error("fail to fetch card list", e);
            }
        };
        fetchCards();
    }, []);

    return (
        <div className="h-[600px] w-full max-w-xl mx-auto">
            <Carousel indicators={false} className="!h-full !w-full" slide={false}
                leftControl={invisibleButton} rightControl={invisibleButton}
            >
                {cards.map((card) => (
                    <HistoryCard key={card.cardNo} card={card} onDeleteSuccess={handleCardDelete} />
                ))}
            </Carousel>
        </div>
    );
};

export default InquiryPage;
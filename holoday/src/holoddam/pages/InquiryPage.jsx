import './InquiryPage.css';
import HistoryCard from '../components/HistoryCard';
import { useState, useEffect } from 'react';
import { cardList } from '../api/HistoryApi';
import { Carousel } from "flowbite-react";

const InquiryPage = () => {
    const [cards, setCards] = useState([]);
    const [currentCard, setCurrentCard] = useState(0);

    const invisibleButton = (
        <span className='w-[50px] h-full opacity-0 cursor-pointer absolute inset-y-0' />
    );

    const handleCardDelete = async (deleteCardNo) => {
        const updateCards = cards.filter(card => card.cardNo != deleteCardNo);
        setCards(updateCards);
        const cardIndex = cards.findIndex(card => card.cardNo === deleteCardNo);

        if (updateCards.length > 0) {
            if (cardIndex >= updateCards.length) {
                setCurrentCard(updateCards.length - 1);
            } else {
                setCurrentCard(cardIndex);
            }
        } else {
            setCurrentCard(0);
        }
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
            <Carousel indicators={false} slide={false}
                key={cards.length}
                className="!h-full !w-full"
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
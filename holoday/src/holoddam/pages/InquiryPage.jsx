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
        const updateCards = cards.filter(card => card.cardNo !== deleteCardNo);
        setCards(updateCards);
        if (updateCards.length === 0) {
            setCurrentCard(0);
            return;
        }
        const oldIndex = cards.findIndex(card => card.cardNo === deleteCardNo);
        let newIndex = oldIndex;
        if (oldIndex >= updateCards.length) {
            newIndex = updateCards.length - 1;
        }
        setCurrentCard(newIndex);
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
            <h1 className='head-text text-4xl mb-2'>오늘의 카드들</h1>
            <Carousel indicators={false} slide={false}
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
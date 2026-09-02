import './InquiryPage.css';
import HistoryCard from '../components/HistoryCard';
import { useState, useEffect } from 'react';
import { cardList, deleteCard } from '../api/HistoryApi';
import { Carousel } from "flowbite-react";

const InquiryPage = () => {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentCard = cards[currentIndex]

    const invisibleButton = (
        <button type='button' className='w-20 h-full opacity-0 cursor-pointer absolute inset-y-0' />
    );

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const data = await cardList();
                setCards(data);
            } catch (e) {
                console.error("fail to fetch card list", e);
            } finally {
                setLoading(false);
            }
        };
        fetchCards();
    }, []);

    return (
        <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 w-full max-w-xl mx-auto mt-10">
            <Carousel indicators={false}
                leftControl={invisibleButton} rightControl={invisibleButton}>
                {cards.map((card) => (
                    <HistoryCard key={card.cardNo} card={card} />
                ))}
            </Carousel>
        </div>
    );
};

export default InquiryPage;
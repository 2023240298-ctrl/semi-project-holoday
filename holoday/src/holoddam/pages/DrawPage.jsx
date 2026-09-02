import './DrawPage.css';
import VideoCard from '../components/VideoCard';
import { drawCard } from '../api/CardApi';
import NewsCard from '../components/NewsCard';
import BlogCard from '../components/BlogCard';
import { useState, useEffect } from 'react';
import { HiRefresh } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

const DrawPage = () => {
    const [card, setCard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isRotate, setIsRotate] = useState(false);
    const navigate = useNavigate();

    const fetchRandomCard = async () => {
        setLoading(true);
        try {
            const data = await drawCard();
            setCard(data);
        } catch (e) {
            console.error("fail to load card", e);
        } finally {
            setLoading(false);
        }
    };

    const handleRefreshClick = () => {
        if (isRotate) return;
        setIsRotate(true);
        setTimeout(() => {
            setIsRotate(false);
        }, 500);
        fetchRandomCard();
    }

    useEffect(() => {
        fetchRandomCard();
    }, []);


    return (
        <>
            <h1 className="head-text text-5xl font-bold mb-4">홀로 땜 페이지</h1>
            <div className='button-box flex flex-row justify-between w-[1000px] items-end'>
                <h2 className="holo-text text-xl text-gray-600 mb-8">혼자서도 재미있고 유익하게 시간을 때워요!</h2>
                <div className='button-container'>
                    <button type="button" className='-translate-y-[4px] head-text bg-blue-800 text-white
                    px-2 py-1 rounded-lg hover:bg-blue-700 transition-colors mr-2'
                        onClick={() => navigate('holoddam/cards')}>
                        지금까지 봤던 카드들 보러가기</button>
                    <button
                        type="button"
                        onClick={handleRefreshClick}
                        className="p-2 mb-1 text-gray-600 hover:text-gray-900 hover:bg-gray-200/60 rounded-full transition-colors"
                    >
                        <HiRefresh className={`w-5 h-5 transition-transform duration-500 ease-in-out`}
                            style={{
                                transform: isRotate ? 'rotate(-360deg)' : 'rotate(0deg)',
                                transition: isRotate ? 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)' : 'none'
                            }}
                        />
                    </button>
                </div>
            </div>
            {loading ? (
                <div className="w-full mt-48">
                    <div role="status" className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center">
                        <div className="flex items-center justify-center w-full h-48 bg-gray-200 rounded-lg sm:w-96 shrink-0">
                            <svg className="w-11 h-11 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m3 16 5-7 6 6.5m6.5 2.5L16 13l-4.286 6M14 10h.01M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z" />
                            </svg>
                        </div>

                        <div className="w-full">
                            <div className="h-3 bg-gray-200 rounded-full w-48 mb-4"></div>
                            <div className="h-2.5 bg-gray-200 rounded-full max-w-[480px] mb-2.5"></div>
                            <div className="h-2.5 bg-gray-200 rounded-full mb-2.5"></div>
                            <div className="h-2.5 bg-gray-200 rounded-full max-w-[440px] mb-2.5"></div>
                            <div className="h-2.5 bg-gray-200 rounded-full max-w-[460px] mb-2.5"></div>
                            <div className="h-2.5 bg-gray-200 rounded-full max-w-[360px]"></div>
                        </div>
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            ) : !card ? (
                <div className="w-full mt-[90px] flex flex-col items-center justify-center">
                    <h2 className="text-8xl head-text">오늘치 정보 카드를 다 봤어요!</h2>
                    <h2 className="text-8xl head-text">내일 또 만나요.</h2>
                </div>


            ) : (
                card.cardCategory == 'VIDEO' ? <VideoCard card={card} /> :
                    card.cardCategory == 'NEWS' ? <NewsCard card={card} /> :
                        <BlogCard card={card} />
            )}
            <br />
            <br />

        </>
    );
};

export default DrawPage;
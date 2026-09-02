import './NewsCard.css';
import { formatDate } from '../util/formatDate';



const NewsCard = ({ card: { cardNo, cardOriginDate, cardTitle, cardSumm, cardOriginUrl, cardImageUrl } }) => {

    return (
        <div className='news'>
            <div className='card-box-container font rounded-xl overflow-hidden'>

                <div className='title-container h-full w-[1000px] relative group flex flex-col'>

                    <div className='card-title p-4 z-0 min-h-[70px] shrink-0'>
                        <h1 className={`whitespace-pre-line ${(cardTitle?.length || 0) >= 40 ? 'card-title-forlong' : ''}`}>
                            {cardTitle && cardTitle.length > 35 ?
                                `${cardTitle.slice(0, 35)}\n${cardTitle.slice(35)}`
                                : cardTitle
                            }
                        </h1>
                    </div>

                    <div className='card-main-content w-full flex-1 pr-4 flex flex-row items-start relative'>
                        <div className='flex-1 h-full min-h-0 relative overflow-hidden'>
                            <img src={cardImageUrl} alt={cardTitle} className='w-full h-full object-cover absolute inset-0' />
                        </div>
                        <div className='card-detail self-end flex flex-col items-start pb-1 shrink-0'>
                            <div className='card-url'>
                                <a href={cardOriginUrl} className='mx-2'>링크 바로가기</a>
                            </div>
                            <div className='card-date'>
                                <h1>{formatDate(cardOriginDate)}</h1>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='card-subtitle-box'>
                    <div className='card-subtitle break-words px-6 py-4'>
                        <h1>{cardSumm}</h1>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default NewsCard;

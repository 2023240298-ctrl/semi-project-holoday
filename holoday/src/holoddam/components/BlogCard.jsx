import './BlogCard.css';
import { formatDate } from '../util/formatDate';


const BlogCard = ({ card: { cardNo, cardOriginDate, cardTitle, cardSumm, cardOriginUrl, cardImageUrl } }) => {

    return (
        <div className='blog'>
            <div className='card-box-container font rounded-xl overflow-hidden'>

                <div className='title-container h-full w-[700px] relative group flex flex-col justify-between'>

                    <div className='card-title p-4 z-0 min-h-[70px] shrink-0'>
                        <h1 className={`whitespace-pre-line ${(cardTitle?.length || 0) >= 40 ? 'card-title-forlong' : ''}`}>
                            {cardTitle && cardTitle.length > 30 ?
                                `${cardTitle.slice(0, 30)}\n${cardTitle.slice(30)}`
                                : cardTitle
                            }
                        </h1>
                    </div>

                    <div className='card-main-content flex-1 flex flex-col justify-center items-center relative'>
                        <img src={cardImageUrl} alt={cardTitle} className='absolute inset-0 w-full h-full object-cover' />

                        <div className='card-detail-box ml-auto flex flex-row w-full justify-between absolute bottom-0'>

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
                    <div className='card-subtitle mt-2 break-words w-[300px] px-2 py-4'>
                        <h1>{cardSumm}</h1>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default BlogCard;

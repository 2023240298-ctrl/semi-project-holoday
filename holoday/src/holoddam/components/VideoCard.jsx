
import './VideoCard.css';
import { formatDate } from '../util/formatDate';


const VideoCard = ({ card: { cardNo, cardOriginDate, cardTitle, cardSumm, cardOriginUrl, cardImageUrl } }) => {

    const getEmbedUrl = (url) => {
        if (!url) return '';
        const match = url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/);
        return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : url;
    };

    return (
        <div className='video'>
            <div className='card-box-container font rounded-xl overflow-hidden'>
                <div className='title-container grid relative group'>

                    <div className='card-title col-start-1 row-start-1 p-4 z-0'>
                        <h1 className={`whitespace-pre-line ${(cardTitle?.length || 0) >= 40 ? 'card-title-forlong' : ''}`}>
                            {cardTitle && cardTitle.length > 40 ?
                                `${cardTitle.slice(0, 40)}\n${cardTitle.slice(40)}`
                                : cardTitle
                            }
                        </h1>
                    </div>

                </div>

                <div className='card-main-content flex justify-center items-center'>
                    <iframe
                        src={getEmbedUrl(cardOriginUrl)} title={cardTitle}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>


                <div className='card-subtitle-box flex gap-3 flex-1'>
                    <div className='card-subtitle flex-1 min-w-0 w-[600px] ml-4 mt-2 break-words'>
                        <h1>{cardSumm}</h1>
                    </div>
                    <div className='card-detail-box ml-auto flex flex-col justify-between items-end mr-4'>

                        <div className='card-date'>
                            <h1>{formatDate(cardOriginDate)}</h1>
                        </div>
                        <div className='card-url mb-4'>
                            <a href={cardOriginUrl}>유튜브에서 영상을 시청하세요!</a>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoCard;
import { useState } from 'react';
import './VideoCard.css';


const VideoCard = ({ card: { cardNo, cardOriginDate, cardTitle, cardSumm, cardOriginUrl, cardImageUrl } }) => {

    const getEmbedUrl = (url) => {
        if (!url) return '';
        const match = url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/);
        return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : url;
    };

    return (
        <>
            <div className='card-box-container'>
                <div className='title-container grid relative group'>

                    <div className='card-title col-start-1 row-start-1 bg-gray-200 p-4 z-0'>
                        <h1 className="truncate">{cardTitle}</h1>
                    </div>
                    <div className='delete-button col-start-1 row-start-1 bg-blue-500/80 p-4 z-10 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
                        <h1 className="text-white font-bold">cardno: {cardNo}</h1>
                        <button type='button' className="text-white font-bold bg-red-500 px-2 py-1 rounded hover:bg-red-600">
                            X
                        </button>
                    </div>

                </div>

                <div className='card-main-content flex justify-center items-center'>
                    <iframe
                        src={getEmbedUrl(cardOriginUrl)} title={cardTitle} frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>


                <div className='card-subtitle-box'>
                    <div className='card-subtitle'>
                        <h1>asdf</h1>
                    </div>
                    <div className='card-detail-box'>

                        <div className='card-date'>
                            <h1>adf</h1>
                        </div>
                        <div className='card-url'>
                            <h1>asdf</h1>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default VideoCard;
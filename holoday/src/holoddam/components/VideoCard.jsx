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

                <div className='card-title'>
                    <h1>{cardTitle}</h1>
                </div>


                <div className='card-main-content'>
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
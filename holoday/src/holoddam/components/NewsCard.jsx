import { useState } from 'react';
import './NewsCard.css';


const NewsCard = () => {

    return (
        <>
            <div className='card-box-container'>

                <div className='card-title'>
                    <h1>adf</h1>
                </div>


                <div className='card-main-content'>
                    <iframe></iframe>
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

export default NewsCard;
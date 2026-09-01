



const BlogCard = ({ card: { cardNo, cardOriginDate, cardTitle, cardSumm, cardOriginUrl, cardImageUrl } }) => {

    return (
        <>
            <div className='card-box-container'>
                <div className='title-container'>
                    <div className='delete-button' hiddden>
                        <button type='button'>X</button>
                    </div>
                    <div className='card-title'>
                        <h1>{cardTitle}</h1>
                    </div>
                </div>


                <div className='card-main-content'>
                    <div>{cardSumm}</div>
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

export default BlogCard;

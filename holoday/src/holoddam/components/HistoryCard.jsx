
import { formatDate } from '../util/formatDate';




const HistoryCard = ({ card: { cardNo, cardOriginDate, cardTitle, cardSumm, cardOriginUrl, cardImageUrl } }) => {

    return (
        <div>
            <div className='delete-button col-start-1 row-start-1 bg-blue-500/80 p-4 z-10 flex justify-between items-center'>
                <h1 className="text-white font-bold">cardno: {cardNo}</h1>
                <button type='button' className="text-white font-bold bg-red-500 px-3 py-1 rounded hover:bg-red-600">
                    ×
                </button>
            </div>
        </div>
    );
};

export default HistoryCard;
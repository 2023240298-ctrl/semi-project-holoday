import { deleteCard } from '../api/HistoryApi';
import { formatDate } from '../util/formatDate';

const HistoryCard = ({ card: { cardNo, cardOriginDate, cardTitle, cardSumm, cardOriginUrl, cardImageUrl }, onDeleteSuccess }) => {

    const isAdmin = localStorage.getItem("userIsAdmin") === "true";

    const handleDelete = async (targetCardNo) => {
        if (!window.confirm("정말 삭제합니까?")) return;
        try {
            await deleteCard(cardNo);
            if (onDeleteSuccess) {
                onDeleteSuccess(targetCardNo);
            }
        } catch (e) {
            console.error("fail to delete card", e);
        }
    }

    return (
        <div className="w-full h-full bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
            <div className='bg-blue-500/80 p-4 z-10 flex justify-between items-center shrink-0'>
                <h1 className="text-white font-bold">카드 번호: {cardNo}</h1>
                {isAdmin && (
                    <button type='button' onClick={() => handleDelete(cardNo)}
                        className="text-white font-bold bg-red-500 px-3 py-1 mr-2 rounded hover:bg-red-600">
                        ×
                    </button>
                )}
            </div>

            <div className="p-4 shrink-0">
                <h1 className="font-bold text-lg">{cardTitle}</h1>
            </div>

            <div className="flex flex-row gap-4 px-4 pb-2 shrink-0 text-sm text-gray-500">
                <h1>{formatDate(cardOriginDate)}</h1>
                <a href={cardOriginUrl} className="text-blue-500 underline">원본 링크 이동!</a>
            </div>

            <div className="flex flex-col gap-2 overflow-y-auto flex-1 min-h-0 p-4">
                <div>
                    <img src={cardImageUrl} className="w-full object-cover rounded" />
                </div>
                <div>
                    <h1 className="text-gray-700 whitespace-pre-wrap">{cardSumm}</h1>
                    <br />
                </div>
            </div>
        </div>
    );
};

export default HistoryCard;
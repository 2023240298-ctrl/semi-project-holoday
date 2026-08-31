const PageComponent = ({serverData, movePage}) => {
   return (
      <div>
         {serverData.prev && (
            <button
               type="button"
               onClick={() => movePage({page: serverData.prevPage})}
            >
               이전
            </button>
         )}

         {serverData.pageNumberList.map((pageNum) => (
            <button
               type="button"
               key={pageNum}
               onClick={() => movePage({page: pageNum})}
            >
               {pageNum}
            </button>
         ))}

         {serverData.next && (
            <button
               type="button"
               onClick={() => movePage({page: serverData.nextPage})}
            >
               다음
            </button>
         )}
      </div>
   );
};

export default PageComponent;
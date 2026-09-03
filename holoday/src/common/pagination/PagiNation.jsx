import { Button } from "antd";

const PagiNation = ({serverData, movePage}) => {
   return (
      <div>
         {serverData.prev && (
            <Button
               type="text"
               size="small"
               onClick={() => movePage({page: serverData.prevPage})}
            >
               &lt;
            </Button>
         )}

         {serverData.pageNumberList.map((pageNum) => (
            <Button
               type={
                  serverData.currentPage === pageNum
                     ? "primary"
                     : "text"
               }
               style={
                  serverData.currentPage === pageNum
                        ? { backgroundColor: "#5B87B3" }
                        : {}
               }
               size="small"
               key={pageNum}
               onClick={() => movePage({page: pageNum})}
            >
               {pageNum}
            </Button>
         ))}

         {serverData.next && (
            <Button
               type="text"
               size="small"
               onClick={() => movePage({page: serverData.nextPage})}
            >
               &gt;
            </Button>
         )}
      </div>
   );
};

export default PagiNation;
import { useEffect } from "react";

import getTransactionList from "@/function/getTransactionList";
import formatDateWithTime from "@/function/formateDatewithTime";
export const fetchCurrentTransactionHook = (tournament,setBudgetData) => {
    useEffect(() => {
        getTransactionList().then((data) => {
            console.log(data,"data from get transaction")
       
   if(tournament){  
    const filteredData=data.filter(transaction => transaction.tournamentId === tournament.id)
    filteredData.forEach(transaction => {
      transaction.date = formatDateWithTime(transaction.date);
    });
    console.log(filteredData,"filtered data from get transaction")
setBudgetData(prev=>({...prev,recentTransactions:[...prev.recentTransactions,...filteredData]}))


   }    
      
      });
    }, [tournament]);
}
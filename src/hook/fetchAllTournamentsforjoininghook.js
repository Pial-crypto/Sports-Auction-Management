import { useEffect } from "react";
import fetchAllTournaments from "@/function/fetchAllTournaments";
import formatDateWithTime from "@/function/formateDatewithTime";
import { mockTournaments } from "@/constants/JoinTournament/mockData";
import { getStatus } from "@/function/handleJoinTournament";
import { positionsMap } from "@/constants/JoinTournament/positionMap";
import fetchAllReq from "@/function/getAllreq";
import storage from "@/class/storage";
export const fetchAllTournamentsforjoininghook=(setTournaments,setFilteredTournaments,setIsLoading,filterStatus)=>{
    useEffect(() => {
        const fetchData = async () => {
          try {
            setIsLoading(true);
            const response = await fetchAllTournaments();
            
            if (response && Array.isArray(response)) {


              fetchAllReq().then((data)=>{
              //  console.log(data,"data from fetch all requests")
                const allReq=data.allPlayerReq;
             //   console.log(allReq,"allReq")
               // console.log(response,"I am the response")
                const formattedData = response.map(tournament =>{
                  const hasRequested=allReq.find(req => req.tournamentId === tournament.id  && req.playerId===storage.get("user").id);
                  const isRejected=allReq.find(req => req.tournamentId === tournament.id && req.rejected===true && req.playerId===storage.get("user").id);
                  const isApproved=allReq.find(req => req.tournamentId === tournament.id && req.approved===true && req.playerId===storage.get("user").id);
                //  console.log(isApproved,"isApproved")
                  //console.log(isRejected,"isRejected")
                  //console.log(hasRequested,"hasRequested")
                 return {
                  ...tournament,
                  startDate: formatDateWithTime(tournament.tournamentDate),
                  totalTeams: tournament.numberOfTeams,
                  prizeMoney: tournament.prizeMoney,
                  entryFee: tournament.registrationFee,
                  hasRequested: hasRequested ? true : false,
                  isRejected: isRejected ? true : false,
                  isApproved: isApproved ? true : false,
                  sport: tournament.gameType.toLowerCase(),
                  status: getStatus(tournament),
                  image: (tournament.tournamenIcon=='https://example.com/icon.png' || tournament.tournamenIcon==null)?"https://images.unsplash.com/photo-1626224583764-f87db24ac4ea":tournament.tournamenIcon,
                  playerRequirements: {
                    ...tournament.playerRequirements,
                    positions: positionsMap[tournament.gameType.toLowerCase()] || []
                  }
                }
              
              });
      
                setTournaments(prev => [...formattedData, ...mockTournaments]);
                setFilteredTournaments(
                  [...formattedData, ...mockTournaments].filter(t => t.status === filterStatus)
                );

              }
            )
          
            }
          } catch (err) {
            console.error('Error fetching tournaments:', err);
            setFilteredTournaments(mockTournaments.filter(t => t.status === filterStatus));
          } finally {
            setIsLoading(false);
          }
        };
    
        fetchData();
      }, [filterStatus]);
}
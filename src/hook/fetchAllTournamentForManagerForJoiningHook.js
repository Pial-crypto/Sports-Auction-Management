import { useEffect } from "react";
import fetchAllTournaments from "@/function/fetchAllTournaments";
import formatDateWithTime from "@/function/formateDatewithTime";
import { mockTournaments } from "@/constants/JoinTournament/mockData";
import { getStatus } from "@/function/handleJoinTournament";
import { positionsMap } from "@/constants/JoinTournament/positionMap";
import fetchAllReq from "@/function/getAllreq";
import storage from "@/class/storage";
import fetchAllTeamReq from "@/function/getAllTeamReq";
export const fetchAllTournamentForManagerForJoiningHook=(setTournaments,setFilteredTournaments,setIsLoading,filterStatus)=>{
    useEffect(() => {
      console.log("I am the use effect")
        const fetchData = async () => {
          try {
            setIsLoading(true);
            const response = await fetchAllTournaments();
            
            if (response && Array.isArray(response)) {


              fetchAllTeamReq().then((data)=>{
                console.log(data,"data from fetch all team requests inside hook")
                const allReq=data.allTeamReq;
                console.log(allReq,"allReq inside hook")
                //console.log(response,"I am the response")
             //   console.log(tournament,"I am the tournament")
                const formattedData = response.map(tournament =>{

                  const hasRequested=allReq.find(req => req.tournamentId === tournament.id  && req.managerId===storage.get("user").id);
                  const isRejected=allReq.find(req => req.tournamentId === tournament.id && req.rejected===true && req.managerId===storage.get("user").id);
                  const isApproved=allReq.find(req => req.tournamentId === tournament.id && req.approved===true && req.managerId===storage.get("user").id);
                  // console.log(isApproved,"isApproved")
                  // console.log(isRejected,"isRejected")
                  // console.log(hasRequested,"hasRequested")
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
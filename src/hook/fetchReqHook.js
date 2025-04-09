import fetchAllReq from "@/function/getAllreq"
import fetchCurrentTournament from "@/function/fetchCurrentTournament"
import { useEffect } from "react"
import formatDateWithTime from "@/function/formateDatewithTime"
import fetchAllTeamReq from "@/function/getAllTeamReq"
export const fetchReqHook = (setRequests) => {
    useEffect(() => {
        fetchCurrentTournament().then((currentTournament) => {
            fetchAllReq().then((data) => {
                console.log(data)
                const allPlayerReq = data.allPlayerReq;
                
                // Map the player requests correctly
                const formattedPlayerReqs = allPlayerReq
                    .filter((req) => req.tournamentId === currentTournament.id)
                    .map((req) => ({
                        id: req.id,
                        type: 'Player Registration',
                        playerName: req.name,
                        prevTeam: req.previousTeam,
                        position: req.role,
                        playerId:req.playerId,
                        age: req.age,
                        status: req.rejected ? 'rejected' : (req.approved ? 'approved' : 'pending'),
                        experience: req.experience,
                        submittedAt: formatDateWithTime(req.createdAt),
                        additionalInfo: req.achievements,
                        tournamentId: req.tournamentId,
                        rejectionReason: req.rejectionReason
                    }));

                // Update state by combining existing requests with new ones
                setRequests(prevRequests => {
                    // Filter out any existing player requests to avoid duplicates
                    const teamRequests = prevRequests.filter(req => req.type === 'Team Registration');
                    return [...teamRequests, ...formattedPlayerReqs];
                });

            }).catch((error) => {
                console.log(error)
            })


            fetchAllTeamReq().then((data) => {
                console.log(data,"data from fetch all team req")
                const allTeamReq = data.allTeamReq;
                const formattedTeamReqs = allTeamReq
                .filter((req) => req.tournamentId === currentTournament.id)
                .map((req) => ({
                    id: req.id,
                    type: 'Team Registration',
                    teamName: req.teamName,
                  managerId:req.managerId,
                    tournamentId:req.tournamentId,
                    status: req.rejected ? 'rejected' : (req.approved ? 'approved' : 'pending'),
                    submittedAt: formatDateWithTime(req.createdAt),
                   managerName: req.managerName,
                  
                  
                  
                   previousTournaments: req.previousTournament,
                   
                    contactEmail: req.managerEmail,
                    contactPhone: req.managerNumber,
                    additionalInfo: req.teamDescription,
                }));


                setRequests(prevRequests => {
                    // Filter out any existing player requests to avoid duplicates
               console.log(formattedTeamReqs,"formatted team reqs")
                    return [...prevRequests, ...formattedTeamReqs];
                });
            }).catch((error) => {
                console.log(error)
            })

        }
    

    
    ).catch((error) => {
            console.log(error)
        })



    }, [])
}
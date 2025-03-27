import { useEffect } from "react";
import loadAllAnnouncements from "@/function/loadAllAnnouncements";
import formatDateWithTime from "@/function/formateDatewithTime";

export const fetchAllCurrentAnnouncementHook = (setAnnouncements, setError, tournament) => {
    useEffect(() => {
        loadAllAnnouncements()
            .then((data) => {
                console.log(data, "data from get all announcements");

                // Check if announcements data is valid
                if (!data || !data.announcements || data.announcements.length === 0) {
                    setError("No announcements found");
                } else {
                    if (tournament) {
                        // Filter announcements based on tournament id
                        const filteredAnnouncements = data.announcements.filter(
                            (announcement) => announcement.tournamentId === tournament.id
                        );
                        console.log(filteredAnnouncements, "filteredAnnouncements");

                        setAnnouncements(prev => [
                            ...prev, 
                            ...filteredAnnouncements.map(announcement => ({
                                ...announcement,
                                timestamp: formatDateWithTime(announcement.timestamp) // Apply formatting to each timestamp
                            }))
                        ]);
                        
                    }
                }
            })
            .catch((error) => {
                // Handle error if the promise fails
                console.error(error);
                setError("Failed to load announcements");
            });
    }, [tournament]);  // Ensure to include setAnnouncements and setError in the dependency array
};

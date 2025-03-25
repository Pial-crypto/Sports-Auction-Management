import fetchAllTournaments from "./fetchAllTournaments";
import storage from "@/class/storage";

const fetchCurrentTournament = async () => {
  const data = await fetchAllTournaments();
    const user = storage.get("user");
    const { id } = user;
    console.log(id, "id");
    return data.find((item) => {
        const status = item.status.toLowerCase();
        return (status === "active" || status === "upcoming" || status === "live") && item.createdBy === id;
    });
};
export default fetchCurrentTournament;



const   getAllAuction=async ()=> {
    try {
        const response = await fetch('/api/getAuction', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to fetch auctions');
        }

        const data = await response.json();
        return data.auctions;

    } catch (error) {
        console.error('Error fetching auctions:', error);
        throw error;
    }
}
export default getAllAuction;
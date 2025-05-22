export default async function saveBidding(biddingData) {
    try {
        const response = await fetch('/api/addBidding', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(biddingData)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to save bidding');
        }

        const data = await response.json();
        return data.bidding;

    } catch (error) {
        console.error('Error saving bidding:', error);
        throw error;
    }
}
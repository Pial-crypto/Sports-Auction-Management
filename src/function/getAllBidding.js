export default async function getAllBidding() {
    try {
        const response = await fetch('/api/getAllBidding', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to fetch biddings');
        }

        const data = await response.json();
        return data.biddings;

    } catch (error) {
        console.error('Error fetching biddings:', error);
        throw error;
    }
}
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

           // console.log('Error fetching biddings:', error);
            //throw new Error(error);
        }

        const data = await response.json();
        return data.biddings;

    } catch (error) {
        console.error('Error fetching biddings:', error);
        throw error;
    }
}
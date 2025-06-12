import { bidQueries } from '../../../lib/db-queries';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const bid = await bidQueries.createBid(req.body);
            res.status(201).json(bid);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    } else if (req.method === 'GET') {
        try {
            const { auctionId } = req.query;
            if (auctionId) {
                const highestBid = await bidQueries.getHighestBid(auctionId);
                res.status(200).json(highestBid);
            } else {
                res.status(400).json({ error: 'Auction ID is required' });
            }
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
} 
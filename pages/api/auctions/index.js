import { auctionQueries, bidQueries } from '../../../lib/db-queries';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const auction = await auctionQueries.createAuction(req.body);
            res.status(201).json(auction);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    } else if (req.method === 'GET') {
        try {
            const activeAuctions = await auctionQueries.getActiveAuctions();
            res.status(200).json(activeAuctions);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else if (req.method === 'PATCH') {
        try {
            const { auctionId, status } = req.body;
            if (auctionId && status) {
                const auction = await auctionQueries.updateAuctionStatus(auctionId, status);
                res.status(200).json(auction);
            } else {
                res.status(400).json({ error: 'Auction ID and status are required' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
} 
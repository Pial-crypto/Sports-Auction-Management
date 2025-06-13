import { userQueries } from '../../../lib/db-queries';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const user = await userQueries.createUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    } else if (req.method === 'GET') {
        try {
            const { email } = req.query;
            if (email) {
                const user = await userQueries.getUserByEmail(email);
                res.status(200).json(user);
            } else {
                res.status(400).json({ error: 'Email parameter is required' });
            }
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
} 
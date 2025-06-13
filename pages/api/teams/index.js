import { teamQueries } from '../../../lib/db-queries';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const team = await teamQueries.createTeam(req.body);
            res.status(201).json(team);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    } else if (req.method === 'GET') {
        try {
            const { teamId } = req.query;
            if (teamId) {
                const team = await teamQueries.getTeamById(teamId);
                res.status(200).json(team);
            } else {
                res.status(400).json({ error: 'Team ID is required' });
            }
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    } else if (req.method === 'PATCH') {
        try {
            const { teamId, budget } = req.body;
            if (teamId && budget) {
                const team = await teamQueries.updateTeamBudget(teamId, budget);
                res.status(200).json(team);
            } else {
                res.status(400).json({ error: 'Team ID and budget are required' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
} 
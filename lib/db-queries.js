const db = require('./db');

// User queries
const userQueries = {
    createUser: async (userData) => {
        return await db.one(
            `INSERT INTO users (username, email, password_hash, full_name, role)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING *`,
            [userData.username, userData.email, userData.password_hash, userData.full_name, userData.role]
        );
    },
    getUserById: async (userId) => {
        return await db.one('SELECT * FROM users WHERE user_id = $1', [userId]);
    },
    getUserByEmail: async (email) => {
        return await db.one('SELECT * FROM users WHERE email = $1', [email]);
    }
};

// Team queries
const teamQueries = {
    createTeam: async (teamData) => {
        return await db.one(
            `INSERT INTO teams (team_name, owner_id, budget)
             VALUES ($1, $2, $3)
             RETURNING *`,
            [teamData.team_name, teamData.owner_id, teamData.budget]
        );
    },
    getTeamById: async (teamId) => {
        return await db.one('SELECT * FROM teams WHERE team_id = $1', [teamId]);
    },
    updateTeamBudget: async (teamId, newBudget) => {
        return await db.one(
            'UPDATE teams SET budget = $1 WHERE team_id = $2 RETURNING *',
            [newBudget, teamId]
        );
    }
};

// Player queries
const playerQueries = {
    createPlayer: async (playerData) => {
        return await db.one(
            `INSERT INTO players (user_id, team_id, first_name, last_name, age, position, base_price)
             VALUES ($1, $2, $3, $4, $5, $6, $7)
             RETURNING *`,
            [playerData.user_id, playerData.team_id, playerData.first_name, 
             playerData.last_name, playerData.age, playerData.position, playerData.base_price]
        );
    },
    getPlayerById: async (playerId) => {
        return await db.one('SELECT * FROM players WHERE player_id = $1', [playerId]);
    },
    updatePlayerStatus: async (playerId, status) => {
        return await db.one(
            'UPDATE players SET status = $1 WHERE player_id = $2 RETURNING *',
            [status, playerId]
        );
    }
};

// Auction queries
const auctionQueries = {
    createAuction: async (auctionData) => {
        return await db.one(
            `INSERT INTO auctions (player_id, start_time, end_time, status)
             VALUES ($1, $2, $3, $4)
             RETURNING *`,
            [auctionData.player_id, auctionData.start_time, auctionData.end_time, auctionData.status]
        );
    },
    getActiveAuctions: async () => {
        return await db.any('SELECT * FROM auctions WHERE status = $1', ['active']);
    },
    updateAuctionStatus: async (auctionId, status) => {
        return await db.one(
            'UPDATE auctions SET status = $1 WHERE auction_id = $2 RETURNING *',
            [status, auctionId]
        );
    }
};

// Bid queries
const bidQueries = {
    createBid: async (bidData) => {
        return await db.one(
            `INSERT INTO bids (auction_id, team_id, bid_amount)
             VALUES ($1, $2, $3)
             RETURNING *`,
            [bidData.auction_id, bidData.team_id, bidData.bid_amount]
        );
    },
    getHighestBid: async (auctionId) => {
        return await db.one(
            `SELECT * FROM bids 
             WHERE auction_id = $1 
             ORDER BY bid_amount DESC 
             LIMIT 1`,
            [auctionId]
        );
    }
};

module.exports = {
    userQueries,
    teamQueries,
    playerQueries,
    auctionQueries,
    bidQueries
}; 
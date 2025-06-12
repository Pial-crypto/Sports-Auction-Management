const fetch = require('node-fetch');

async function testAPI() {
    try {
        // Test creating a user
        const userResponse = await fetch('http://localhost:3000/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: 'testuser',
                email: 'test@example.com',
                password_hash: 'testhash',
                full_name: 'Test User',
                role: 'team_owner'
            })
        });

        const userData = await userResponse.json();
        console.log('Created user:', userData);

        // Test creating a team
        const teamResponse = await fetch('http://localhost:3000/api/teams', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                team_name: 'Test Team',
                owner_id: userData.user_id,
                budget: 1000000.00
            })
        });

        const teamData = await teamResponse.json();
        console.log('Created team:', teamData);

    } catch (error) {
        console.error('Error testing API:', error);
    }
}

testAPI(); 
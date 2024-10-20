import games from "../Model/DbConfig.js"

export const createNewGame = async (request, response) => {
    const { player1Name, player2Name, winner, scores } = request.body;

    try {
        const result = await games.query(
            'INSERT INTO games("player1Name", "player2Name", "winner", "scores") VALUES ($1, $2, $3, $4) RETURNING *',
            [player1Name, player2Name, winner, scores]
        );
        response.status(201).json({ message: 'New game stored successfully!', game: result.rows[0] });
    } catch (error) {
        console.error("Error creating new game:", error);
        response.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const getAllGamesData = async (request, response) => {
    try {
        const result = await games.query('SELECT * FROM games'); // Fetch all rows from the games table

        // Check if result.rows is defined and has data
        if (!result.rows || result.rows.length === 0) {
            return response.status(200).json({ 
                message: 'No games found', 
                games: [] // Return an empty array if no games are found
            });
        }

        // Format the data
        const formattedGames = result.rows.map(game => {
            return {
                match: `${game.player1Name} vs ${game.player2Name}`,
                scores: {
                    player1: game.scores.player1, // Player 1 score
                    player2: game.scores.player2  // Player 2 score
                },
                winner: game.winner,
                tie: game.scores.tie // Include tie status
            };
        });

        response.status(200).json({ 
            message: 'Successfully fetched all games data', 
            games: formattedGames // Return the formatted data
        });
    } catch (error) {
        console.error("Error in retrieving games:", error);
        response.status(500).json({ message: "Internal server error", error: error.message });
    }
}

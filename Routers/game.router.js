import express from 'express'
import { createNewGame, getAllGamesData } from '../Controllers/game.controller.js'

const router = express.Router()

router.post('/games', createNewGame)
router.get('/get-games', getAllGamesData)

export default router
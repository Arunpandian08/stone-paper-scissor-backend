import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import gamesRouter from './Routers/game.router.js'

dotenv.config()
const app = express()

app.use(cors({
    origin: process.env.CLIENT_URL
}))

app.use(express.json())

app.use('/api', gamesRouter)

const port = process.env.PORT || 3001

app.listen(port, () => {
    console.log(`Server is Running at port - ${port}`);
})
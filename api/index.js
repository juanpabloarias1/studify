import 'dotenv/config'
import db from 'dat'
import express from 'express'
import cors from 'cors'

import { errorHandler } from './routes/helpers/index.js'
import { notesRouter, usersRouter, remindersRouter, groupsRouter, tasksRouter, homeRouter } from './routes/index.js'

db.connect(process.env.MONGO_URL).then(() => {
    console.log('connected to db')

    const server = express()

    server.use(cors())

    server.get('/', (_, res) => res.send('Hello, API!'))

    server.use('/users', usersRouter)
    server.use('/notes', notesRouter)
    server.use('/reminders', remindersRouter)
    server.use('/groups', groupsRouter)
    server.use('/tasks', tasksRouter)
    server.use('/home', homeRouter)

    server.use(errorHandler)

    server.listen(process.env.PORT, () => console.log(`API listening on port ${process.env.PORT}`))
})
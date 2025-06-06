import knex from 'knex'
import dotenv from 'dotenv'
dotenv.config()


const db = knex({
    client: 'pg',
    connection: process.env.PG_CONNECTION_STRING,
})

export default db 
//requerer express
import express from 'express'
import router from './routes/router.js'
//atribuir a uma const o objeto express
const api = express()

//informar que API podera utlizar urls 
api.use(express.urlencoded({extended:false}))
//informar que API ira utilizar json
api.use(express.json())
api.use('/api', router)

//utilizar as rotas



export default api
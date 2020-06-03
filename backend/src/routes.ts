import express from 'express'

import PointsController from './controllers/PointsContoller'
import ItemsController from './controllers/ItemsContoller'

const routes = express.Router()

const pointsContoller = new PointsController()
const itemsContoller = new ItemsController()

routes.get('/items', itemsContoller.index)
routes.post('/points', pointsContoller.create)
routes.get('/point/:id', pointsContoller.show)
routes.get('/points', pointsContoller.index)

export default routes
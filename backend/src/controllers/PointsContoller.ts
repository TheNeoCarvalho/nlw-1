import { Request, Response} from 'express'
import knex from '../database/connection'

class PointsController{
    async index(req:Request, res:Response){
        const {city, uf, items} = req.query
        const parsedItems = String(items).split(',').map(item => Number(item.trim()))

        const points = await knex('points')
                            .join('point_item', 'points.id','=', 'point_item.point_id')
                            .whereIn('point_item.item_id', parsedItems)
                            .where('city', String(city))
                            .where('uf', String(uf))
                            .distinct()
                            .select('points.*')
        
        return res.json(points)                    
         
    }

    async create(req:Request, res:Response){
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
        } = req.body
    
    
        const point = {
            image: 'image-fake',
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
        }
        
        const trx = await knex.transaction()
    
        const insertedIds = await trx('points').insert(point)
    
        const point_id = insertedIds[0]
    
        const pointItems = items.map((item_id:number) => {
            return {
                item_id,
                point_id
            }
        })
    
        await trx('point_item').insert(pointItems)

        await trx.commit()
    
        return res.json(
            {
                id: point_id,
                ...point
            }
        )
    }

    async show(req:Request, res:Response){
        const {id} = req.params
        const point = await knex('points').where('id', id).first()
        
        if(!point){
            return res.status(400).json({ message: 'Point not found'})
        }

        const items = await knex('items')
                            .join('point_item','items.id','=','point_item.item_id')
                            .where('point_item.point_id', id)
                            .select('items.title')

        return res.status(200).json({point, items})
    }
}
export default PointsController
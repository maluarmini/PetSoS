const Point = require('../models/Point');

module.exports = {
    
    async show(req,res) {
        const {id} = req.params;

        const point = await Point.findById(id)

        return res.json(point);

    },
    async index(req,res){
        const points = await Point.find();
        return res.json(points);
    },
    async store(req,res){
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
        } = req.body; 

        const image_name = req.file.filename;

        const point = await Point.create({
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            image_name,
            image_url : `http://192.168.0.5:3333/uploads/${image_name}`
        });

        return res.json(point);
    }
}
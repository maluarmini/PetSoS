const Point = require('../models/Point');

module.exports = {
    async store(req,res){
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            image_name,
        } = req.body; 
        // const image_name = req.file.filename;
        const point = await Point.create({
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            image_name,
            image_url : image_name,
        });

        return res.json(point);
    },
}
const FarmerModel = require('../models/farmer-model');
class ProductController {

    async addProduct(req, res) {
        const farmerId = req.params['farmerId'];
        const { cropName, quantity, price, status } = req.body;

        if (!cropName || !quantity || !price || !status)
            res.status(400).json({ error: "Some  field is incomplete" });

        const newProduct = {
            cropName: cropName,
            quantity: quantity,
            price: price,
            status: status

        };

        const farmer = await FarmerModel.findOne({
            farmerId: farmerId
        });
        const oldProducts = farmer.products;
        if (oldProducts) {
            oldProducts.push(newProduct);
        } else {
            res.status(400).json({
                error: "Not done"
            });
        }

       try {
        await FarmerModel.updateOne({
            farmerId
        },{
            $set: {
                products: oldProducts
            }
        });
        res.status(200).json({
            message: "Successfully added product"
        });
       } catch (err) {
        res.status(400).json({
            error: "Not done"
        });
       }




    }

    async getProducts(req, res) {
        console.log("req");
        const farmerId = req.params['farmerId'];
        const farmer = await FarmerModel.findOne({
            farmerId
        });

        console.log(farmer);
        if (!farmer) {
            return res.status(403).json({ error: "No data found" });
        }

        return res.status(200).json(farmer.products);
    }
}

module.exports = new ProductController();
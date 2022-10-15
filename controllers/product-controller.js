const Ware = require('../models/warehouse-model');
const ProductModel = require('../models/product-model');
class ProductController {

    async addProduct(req, res) {
        const farmerId = req.params['farmerId'];
        if (!farmerId) {
            res.status(400).json({ error: "Some  field is incomplete" });
        }

        const { cropName, quantity, price, status } = req.body;

        if (!cropName || !quantity || !price || !status)
            res.status(400).json({ error: "Some  field is incomplete" });

        const newProduct = {
            cropName: cropName,
            quantity: quantity,
            price: price,
            status: status

        };

        const newPrdct = new ProductModel({
            farmerId: farmerId,
            cropName: cropName,
            quantity: quantity,
            price: price,
            status: status
        });
        newPrdct.save(function(err) {
            if (err)
                return res.status(500).json({ error: 'Not done' });
            else
                return res.status(400).json({
                    error: "Successfully added product"
                });
        });

        //     const farmer = await FarmerModel.findOne({
        //         farmerId: farmerId
        //     });

        //     const oldProducts = farmer.products;
        //     if (oldProducts) {
        //         oldProducts.push(newProduct);
        //     } else {
        //         res.status(400).json({
        //             error: "Not done"
        //         });
        //     }

        //    try {
        //     await FarmerModel.updateOne({
        //         farmerId
        //     },{
        //         $set: {
        //             products: oldProducts
        //         }
        //     });
        //     res.status(200).json({
        //         message: "Successfully added product"
        //     });
        //    } catch (err) {
        //     res.status(400).json({
        //         error: "Not done"
        //     });
        //    }




    }

    async getProducts(req, res) {
        console.log("req");
        const farmerId = req.params['farmerId'];
        const product = await ProductModel.find({
            farmerId
        });

        console.log(product);
        if (!product) {
            return res.status(403).json({ error: "No data found" });
        }



        return res.status(200).json(product);
    }


    async getStored(req, res) {
        const farmerId = req.params['farmerId'];
        const warehouseId = req.params['warehouseId'];


        const farmerFilter = await ProductModel.find({
            farmerId
        });

        const result = [];
        for (let i = 0; i < farmerFilter.length; i++) {
            const prdct = farmerFilter[i];
            if (prdct.warehouseId === warehouseId) {
                result.push(prdct);
            }
        }

        // console.log(result);
        return res.status(200).json(result);
    }


    async store(req, response) {
        const { farmerId, warehouseId, cropName, quantity, price } = req.body;
        // const farmerFilter = await ProductModel.find({
        //     farmerId
        // });

        // for (let i = 0; i < farmerFilter.length; i++) {

        // }

        var myquery = { farmerId: farmerId, cropName: cropName };
        var newValues = {
            $set: {
                warehouseId: warehouseId,
                quantity: quantity,
                price: price
            }
        };

        ProductModel.updateOne(myquery, newValues, function(err, res) {
            if (err) throw err;
            // return res.status(200).json({
            //     message: "Producted Stored in warehouse"
            // });
            console.log("Product Model updated");
        });

        const prdct = {
            farmerId,
            cropName,
            quantity,
            price
        };

        console.log(warehouseId);
        const op = await Ware.findOne({
            _id: warehouseId
        });

        const oldProducts = op?.products;


        console.log(oldProducts);

        oldProducts.push(prdct);
        Ware.updateOne({
            _id: warehouseId
        }, {
            $set: {
                products: oldProducts
            }
        }, function(err, res) {
            if (err) throw err;
            response.status(200).json({
                message: "Product Stored in warehouse"
            });
            console.log("Product Model updated");
        });

    }

    async getAll(req, res) {
        const all = await ProductModel.find();
        console.log(all);

        if (!all)
            return res.status(400).json({ error: "some field is incomplete" });
        else
            res.status(200).json(all);
    }
}

module.exports = new ProductController();
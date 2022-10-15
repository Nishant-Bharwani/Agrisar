const Ware = require('../models/warehouse-model');
const ProductModel = require('../models/product-model');
const { set } = require('mongoose');
// const ProductModel = require('../models/product-model');
// const UserModel = require('../models/user-model');
// const StoredModel = require('../models/stored-model');
// const storedModel = require('../models/stored-model');

class WarehouseController {
    async addWarehouse(req, res) {
        const { name, capacity, capacityLeft, city, address, pinCode } = req.body;
        if (!name || !capacity || !capacityLeft || !city || !address || !pinCode)
            res.status(400).json({ error: "some  field is incomplete" });

        const newWarehouse = new Ware({
            name: name,
            capacity: capacity,
            capacityLeft: capacityLeft,
            city: city,
            address: address,
            pinCode: pinCode

        });
        newWarehouse.save(function(err) {
            if (err)
                return res.status(500).json({ error: 'Warehouse not saved' });
            else
                return res.status(200).json({ message: 'Warehouse Saved' });
        });

    }

    async allwarehouse(req, res) {
        const all = await Ware.find();
        console.log(all);
        if (!all)
            return res.status(400).json({ error: "some field is incomplete" });
        else
            res.status(200).json(all);
    }

    // async getWarehouses(req, res) {

    //     await StoredModel.find()

    // }

    // function onlyUnique(value, index, self) {
    //     return self.indexOf(value) === index;
    // }

    async getWarehouses(req, res) {
        const farmerId = req.params['farmerId'];
        const allProducts = await ProductModel.find({
            farmerId
        });

        console.log(allProducts.length);

        
        let unique = new Set();

        for (let i = 0; i < allProducts.length; i++ ) {
            if (allProducts[i].warehouseId !== "") {
                unique.add(allProducts[i].warehouseId);
            }
        }

        const uniqueArray = [...unique];
        console.log(uniqueArray);


        const result = [];
        let warehouse;
        for (let i = 0; i < uniqueArray.length; i++) {
            const warehouseId = uniqueArray[i];
            warehouse = await Ware.findOne({
                warehouseId: warehouseId
            });

            console.log(warehouse);
            result.push(warehouse);

        }

        return res.status(200).json(result);

    }


    // async store(req, res) {
    //     const warehouseId = req.params['id'];
    //     const { farmerId, cropName, quantity } = req.body;

    //     const warr = await Ware.findOne({ warehouseId });


    //     if (!warehouseId || !farmerId || !cropName || !quantity)
    //         res.status(400).json({ error: "some  Field is incomplete" });
    //     // { "_id" : { "$gt" : "ObjectId(\"575d0c22964ddb3b6ba41bed\")" } }
    //     const newstorehouse = new storedModel({
    //         warehouseId: warehouseId,
    //         farmerId: farmerId,
    //         cropName: cropName,
    //         quantity: quantity


    //     });
    //     console.log(newstorehouse);
    //     newstorehouse.save(function(err) {
    //         if (err)
    //             return res.status(500).json({ error: 'warehouse not saved' });
    //         else {
    //             Ware.updateOne({ _id: warehouseId }, { $set: { capacityLeft: warr.capacityLeft - quantity } }, function(err, res) {
    //                 if (err)
    //                     console.log("error");
    //                 else
    //                     console.log("not error");
    //             });

    //             return res.status(200).json({ message: 'Warehouse SAVED' });

    //         }
    //     });

    // }

    // async farm(req, res) {
    //     const farmerId = req.body.farmerId;
    //     const items = await storedModel.find({ farmerId });
    //     console.log(items);
    //     if (!items)
    //         return res.status(500).json({ error: 'items not found' });
    //     else {



    //         var prodarray = [];
    //         items.forEach((value) => {
    //             prodarray.push(value.pr);
    //         })
    //         console.log(prodarray);
    //         prodarray.forEach(async(value) => {
    //             const product = await ProductModel.findOne({ value });
    //             console.log(product);
    //         })
    //         return res.status(200).json({ message: 'items founded' });
    //     }
    // }
}

module.exports = new WarehouseController();
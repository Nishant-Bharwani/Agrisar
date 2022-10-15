const CartModel = require('../models/cart-model');

class SellController {
    async addToCart(req, res) {
        const { buyerId, farmerId, cropName, quantity, price } = req.body;

        console.log(req.body);
        const data = new CartModel({
            buyerId: buyerId,
            farmerId: farmerId,
            cropName: cropName,
            quantity: quantity,
            price: price
        });

        console.log(data);
        data.save(function(err) {
            if (err) {
                console.log(err);
                return;
            }
            return res.status(200).json({
                message: "Cart successfully updated"
            });
        });
    }

    async viewCart(req, res) {
        const buyerId = req.params['buyerId'];
        const buyerFilter = await CartModel.find({
            buyerId
        });


        return res.status(200).json(buyerFilter);


    }

}

module.exports = new SellController();
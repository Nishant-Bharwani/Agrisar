const User = require('../models/plus-model');
class plusController {
    async plusSearch(req, res) {
        const { phosphorus, photassium, nitrogen } = req.body;
        if (!phosphorus || !photassium || !nitrogen)
            res.status(400).json({ error: "some  Field is incomplete" });
        const items = ["sugarcane", "carrot", "patato", "rice", "pulses", "maze"];
        var i = 0;
        var set1 = new Set();
        var check = [0, 0, 0, 0, 0, 0];
        while (i < 6) {
            var l = Math.floor(Math.random() * 6);
            set1.add(items[l]);
            check[l] = 1;
            i = i + 1;
        }
        i = 0;
        while (i < 6) {
            if (check[i] == 0)
                set1.add(items[i]);
            i = i + 1;
        }

        console.log(set1);
    //   return res.render("agrisar-plus",{crop:set1});
         return res.status(200).json({ message: {...[...set1] } });

    }
}
module.exports = new plusController();
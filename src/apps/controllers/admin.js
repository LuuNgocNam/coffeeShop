const ProductModel = require('../models/product');
const UserModel = require('../models/user');
const HoadonModel = require('../models/hoadon');
const index = async (req, res) => {
    const totalProduct = await ProductModel.countDocuments();
    const totalUser = await UserModel.countDocuments();
    // const totalHoadon = await HoadonModel.countDocuments();
    const totalPrice = (await HoadonModel.find()).reduce((total, item) => {
        return total += parseFloat(item.price || 0)
    }, 0).toFixed(2);

    res.render('admin/dashboard', {
        totalProduct,
        totalUser,
        totalHoadon: totalPrice,
    })
}
const logout = (req, res) => {
    req.session.destroy();
    res.redirect("/admin/login", { data: {} });
}
module.exports = {
    index,
    logout,
}
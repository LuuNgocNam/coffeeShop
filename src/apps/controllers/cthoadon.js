const paginate = require("../../common/paginate");
const CthoadonModel = require("../models/cthoadon")
const fs = require('fs');
// const slug = require('slug');


const index = async (req, res) => {     //
    const id = req.query.id
    const cthoadon = await CthoadonModel.find({ "id_hd": id })
    res.render('admin/cthoadon/index', {
        cthoadon,
    })
}
const create = (req, res) => {
    res.render("admin/cthoadon/add_cthoadon", { data: {} }) //hiển thị chế độ xem với dữ liệu được chuyển đến nó bằng html
}

const store = async (req, res) => {
    const body = req.body;
    // const file = req.file;

    const cthd = {
        name: body.name,
        price: body.price,
        qty: body.qty,
        total: body.total,

    }

    // if(file){
    //     dv["thumbnail"] = "dichvu/"+file.originalname;
    //     fs.renameSync(file.path, path.resve("src/public/images/dichvu/"+file.originalname))        
    // }
    new CthoadonModel(cthd).save();
    res.redirect('/admin/cthoadon') //chuyển hướng người dùng đến một trang khác (tại thời điểm đó yêu cầu bắt đầu lại)
}

const edit = async (req, res) => {
    const id = req.params.id;
    const cthoadon = await CthoadonModel.findById(id)
    res.render('admin/cthoadon/edit_cthoadon', {
        data: {},
        cthoadon
    })
}

const update = async (req, res) => {
    const body = req.body;
    // const file = req.file;

    const cthd = {
        name: body.name,
        price: body.price,
        qty: body.qty,
        total: body.total,
    }

    // if(file){
    //     dv["thumbnail"] = "dichvu/"+file.originalname;
    //     fs.renameSync(file.path, path.resve("src/public/images/dichvu/"+file.originalname))        
    // }
    await CthoadonModel.updateOne({ _id: req.params.id }, { $set: cthd })
    res.redirect("/admin/cthoadon");
}
const del = async (req, res) => {
    const { id } = req.params;
    await CthoadonModel.deleteOne({ _id: id });
    res.redirect("/admin/cthoadon")
}
module.exports = {
    index,
    create,
    store,
    edit,
    update,
    del
}
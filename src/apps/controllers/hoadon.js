const paginate = require("../../common/paginate");
const HoadonModel = require("../models/hoadon")
const fs = require('fs');
// const slug = require('slug');
const path = require('path')


const index = async (req, res)=>{
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = limit*(page - 1)

    const totalHoadon = await HoadonModel.countDocuments();
    const totalPage = Math.ceil(totalHoadon/limit);

    const pages = paginate(page, totalPage);

    const hoadon = await HoadonModel.find().skip(skip).limit(limit).sort({_id : 1});
    res.render('admin/hoadon/index', {
        page,
        pages,
        totalPage,
        hoadon,
    })
}
const create = (req, res )=>{
    res.render("admin/hoadon/add_hoadon", {data : {}})
}

const store = async (req, res)=>{
    const body = req.body;
    // const file = req.file;

    const hd = {
        name: body.name,
        phone: body.phone,
        email: body.email,
        day: body.day,
        method: body.method,
        price: body.price,
        is_stock: body.is_stock,
    }

    // if(file){
    //     dv["thumbnail"] = "dichvu/"+file.originalname;
    //     fs.renameSync(file.path, path.resve("src/public/images/dichvu/"+file.originalname))        
    // }
    new HoadonModel(hd).save();
    res.redirect('/admin/hoadon')
}

const edit = async (req, res)=>{
    const id = req.params.id;
    const hoadon = await HoadonModel.findById(id)
    console.log(hoadon)
    res.render('admin/hoadon/edit_hoadon', {
        data : {}, 
        hoadon
    })
}

const update = async (req, res)=>{
    const body = req.body;
    // const file = req.file;

    const hd = {
        name: body.name,
        phone: body.phone,
        email: body.email,
        day: body.day,
        price: body.price,
        is_stock: body.is_stock,
    }

    // if(file){
    //     dv["thumbnail"] = "dichvu/"+file.originalname;
    //     fs.renameSync(file.path, path.resve("src/public/images/dichvu/"+file.originalname))        
    // }
    await HoadonModel.updateOne({_id : req.params.id}, {$set : hd})
    res.redirect("/admin/hoadon");
}
const del = async (req, res)=>{
    const {id} = req.params;
    await HoadonModel.deleteOne({_id : id});
    res.redirect("/admin/hoadon")
}
module.exports = {
    index,
    create,
    store,
    edit,
    update,
    del
}
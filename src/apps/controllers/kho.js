const paginate = require("../../common/paginate");
const KhoModel = require("../models/kho")
const CategoryModel = require("../models/category")
const fs = require('fs');
const path = require('path')

const index = async (req, res)=>{
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = limit*(page-1);

    const totalKho = await KhoModel.countDocuments();
    const totalPage = Math.ceil(totalKho / limit)
    const pages = paginate(page, totalPage);

    const kho = await KhoModel.find().populate({path : 'cat_id'}).skip(skip).limit(limit).sort({_id : 1}) 
    res.render('admin/kho/index', {
        page,
        totalPage,
        pages,
        kho,
    })
}
const create = async (req, res)=>{
    const category = await CategoryModel.find();
    
    res.render("admin/kho/add_kho",{
        category
    })
}
const store = (req, res)=>{
    const body = req.body;
    const file = req.file;

    const kh = {
        price: body.price,
        cat_id: body.cat_id,
        num1: body.num1,
        num2: body.num2,
        is_stock: body.is_stock,
        name: body.name,
    }

    if(file){
        kh["thumbnail"] = "kho/"+file.originalname;
        fs.renameSync(file.path, path.resolve("src/public/images/kho/"+file.originalname))
    }
    new KhoModel(kh).save();
    res.redirect('/admin/kho')
}
const edit = async (req, res)=>{
    const id = req.params.id;
    if(!id) res.redirect('/admin/kho')
    const category = await CategoryModel.find();
    const kho = await KhoModel.findById(id);
    res.render('admin/kho/edit_kho', {
        category,
        kho,
    })
}
const update = async (req, res)=>{
    const body  = req.body;
    const file = req.file;
   
    const kh = {
        price: body.price,
        cat_id: body.cat_id,
        num1: body.num1,
        num2: body.num2,
        is_stock: body.is_stock,
        name: body.name,
    }

    if(file){
        kh["thumbnail"] = 'products/'+file.originalname;
        fs.renameSync(file.path , path.resolve(`src/public/images/${kh["thumbnail"]}`));
    }
    await KhoModel.updateOne({_id : req.params.id}, {$set : kh})

    res.redirect('/admin/kho');
}
const del = async (req, res)=>{
    const id = req.params.id;
    await KhoModel.deleteOne({_id : id});
    res.redirect("/admin/kho")
}

module.exports = {
    index,
    create,
    store,
    edit,
    update,
    del
}
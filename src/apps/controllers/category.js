const paginate = require("../../common/paginate");
const CategoryModel = require("../models/category")
const fs = require('fs');
const path = require('path')


const index = async (req, res)=>{
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = limit*(page - 1)

    const totalCategory = await CategoryModel.countDocuments();
    const totalPage = Math.ceil(totalCategory/limit);

    const pages = paginate(page, totalPage);

    const categories = await CategoryModel.find().skip(skip).limit(limit).sort({_id : 1});
    res.render('admin/categories/index', {
        page,
        pages,
        totalPage,
        categories
    })
}
const create = (req, res )=>{
    res.render("admin/categories/add_category", {data : {}})
}

const store = async (req, res)=>{
    const body = req.body;
    const file = req.file;

    const ctg = {
        description: body.description,
        is_stock: body.is_stock,
        title: body.title,

    }

    if(file){
        ctg["thumbnail"] = "categories/"+file.originalname;
        fs.renameSync(file.path, path.resolve("src/public/images/categories/"+file.originalname))        
    }
    new CategoryModel(ctg).save();
    res.redirect('/admin/category')
}

const edit = async (req, res)=>{
    const id = req.params.id;
    const category = await CategoryModel.findById(id);
    res.render('admin/categories/edit_category', {
        data : {}, 
        category
    })
}

const update = async (req, res)=>{
    const body = req.body;
    const file = req.file;

    const ctg = {
        description: body.description,
        is_stock: body.is_stock,
        title: body.title,
    }

    if(file){
        ctg["thumbnail"] = "categories/"+file.originalname;
        fs.renameSync(file.path, path.resolve("src/public/images/categories/"+file.originalname))        
    }
    await CategoryModel.updateOne({_id : req.params.id}, {$set : ctg})
    res.redirect('/admin/category');
}
const del = async (req, res)=>{
    const id = req.params.id;
    await CategoryModel.deleteOne({_id : id});
    res.redirect("/admin/category")
}
module.exports = {
    index,
    create,
    store,
    edit,
    update,
    del
}
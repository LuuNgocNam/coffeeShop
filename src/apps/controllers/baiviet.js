const paginate = require("../../common/paginate");
const BaivietModel = require("../models/baiviet")
const fs = require('fs');
const slug = require('slug');
const path = require('path')


const index = async (req, res)=>{
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = limit*(page - 1)

    const totalBaiviet = await BaivietModel.countDocuments();
    const totalPage = Math.ceil(totalBaiviet/limit);

    const pages = paginate(page, totalPage);

    const baiviet = await BaivietModel.find().skip(skip).limit(limit).sort({_id : 1});
    res.render('admin/baiviet/index', {
        page,
        pages,
        totalPage,
        baiviet
    })
}
const create = (req, res )=>{
    res.render("admin/baiviet/add_baiviet", {data : {}})
}

const store = async (req, res)=>{
    const body = req.body;
    const file = req.file;

    const bv = {
        name: body.name,
        author: body.author,
        day: body.day,
        comment: body.comment,
        content: body.content,
    }

    if(file){
        bv["thumbnail"] = "baiviet/"+file.originalname;
        fs.renameSync(file.path, path.resolve("src/public/images/baiviet/"+file.originalname))        
    }
    new BaivietModel(bv).save();
    res.redirect('/admin/baiviet')
}

const edit = async (req, res)=>{
    const id = req.params.id;
    const baiviet = await BaivietModel.findById(id);
    res.render('admin/baiviet/edit_baiviet', {
        data : {}, 
        baiviet
    })
}

const update = async (req, res)=>{
    const body = req.body;
    const file = req.file;

    const bv = {
        name: body.name,
        author: body.author,
        day: body.day,
        comment: body.comment,
        content: body.content,
    }

    if(file){
        bv["thumbnail"] = "baiviet/"+file.originalname;
        fs.renameSync(file.path, path.resolve("src/public/images/baiviet/"+file.originalname))        
    }
    await BaivietModel.updateOne({_id : req.params.id}, {$set : bv})
    res.redirect('/admin/baiviet');
}
const del = async (req, res)=>{
    const {id} = req.params;
    await BaivietModel.deleteOne({_id : id});
    res.redirect("/admin/baiviet")
}
module.exports = {
    index,
    create,
    store,
    edit,
    update,
    del
}
const paginate = require("../../common/paginate");
const DichvuModel = require("../models/dichvu")
const fs = require('fs');
// const slug = require('slug');
const path = require('path')


const index = async (req, res)=>{
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = limit*(page - 1)

    const totalDichvu = await DichvuModel.countDocuments();
    const totalPage = Math.ceil(totalDichvu/limit);

    const pages = paginate(page, totalPage);

    const dichvu = await DichvuModel.find().skip(skip).limit(limit).sort({_id : 1});
    res.render('admin/dichvu/index', {
        page,
        pages,
        totalPage,
        dichvu,
    })
}
const create = (req, res )=>{
    res.render("admin/dichvu/add_dichvu", {data : {}})
}

const store = async (req, res)=>{
    const body = req.body;
    const file = req.file;

    const dv = {
        name: body.name,
        describle: body.describle,
    }

    if(file){
        dv["thumbnail"] = "dichvu/"+file.originalname;
        fs.renameSync(file.path, path.resolve("src/public/images/dichvu/"+file.originalname))        
    }
    new DichvuModel(dv).save();
    res.redirect('/admin/dichvu')
}

const edit = async (req, res)=>{
    const id = req.params.id;
    const dichvu = await DichvuModel.findById(id);
    res.render('admin/dichvu/edit_dichvu', {
        data : {}, 
        dichvu
    })
}

const update = async (req, res)=>{
    const body = req.body;
    const file = req.file;

    const dv = {
        name: body.name,
        describle: body.describle,
    }

    if(file){
        dv["thumbnail"] = "dichvu/"+file.originalname;
        fs.renameSync(file.path, path.resolve("src/public/images/dichvu/"+file.originalname))        
    }
    await DichvuModel.updateOne({_id : req.params.id}, {$set : dv})
    res.redirect("/admin/dichvu");
}
const del = async (req, res)=>{
    const {id} = req.params;
    await DichvuModel.deleteOne({_id : id});
    res.redirect("/admin/dichvu")
}
module.exports = {
    index,
    create,
    store,
    edit,
    update,
    del
}
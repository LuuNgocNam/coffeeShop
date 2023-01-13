const paginate = require("../../common/paginate");
const NhanvienModel = require("../models/nhanvien")
const fs = require('fs');
const path = require('path')


const index = async (req, res)=>{
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = limit*(page - 1)

    const totalNhanvien = await NhanvienModel.countDocuments();
    const totalPage = Math.ceil(totalNhanvien/limit);

    const pages = paginate(page, totalPage);

    const nhanvien = await NhanvienModel.find().skip(skip).limit(limit).sort({_id : 1});
    res.render('admin/nhanvien/index', {
        page,
        pages,
        totalPage,
        nhanvien,
    })
}
const create = (req, res )=>{
    res.render("admin/nhanvien/add_nhanvien", {data : {}})
}

const store = async (req, res)=>{
    const body = req.body;
    const file = req.file;

    const nv = {
        name: body.name,
        sex: body.sex,
        position: body.position,
        day: body.day,
        addr: body.addr,

    }

    if(file){
        nv["thumbnail"] = "nhanvien/"+file.originalname;
        fs.renameSync(file.path, path.resolve("src/public/images/nhanvien/"+file.originalname))        
    }
    new NhanvienModel(nv).save();
    res.redirect('/admin/nhanvien')
}

const edit = async (req, res)=>{
    const id = req.params.id;
    const nhanvien = await NhanvienModel.findById(id);
    res.render('admin/nhanvien/edit_nhanvien', {
        data : {}, 
        nhanvien
    })
}

const update = async (req, res)=>{
    const body = req.body;
    const file = req.file;

    const nv = {
        name: body.name,
        sex: body.sex,
        position: body.position,
        day: body.day,
        addr: body.addr,
    }

    if(file){
        nv["thumbnail"] = "nhanvien/"+file.originalname;
        fs.renameSync(file.path, path.resolve("src/public/images/nhanvien/"+file.originalname))        
    }
    await NhanvienModel.updateOne({_id : req.params.id}, {$set : nv})
    res.redirect('/admin/nhanvien');
}
const del = async (req, res)=>{
    const id = req.params.id;
    await NhanvienModel.deleteOne({_id : id});
    res.redirect("/admin/nhanvien")
}
module.exports = {
    index,
    create,
    store,
    edit,
    update,
    del
}
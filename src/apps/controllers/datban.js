const DatbanModel = require("../models/datban");
const paginate = require("../../common/paginate");
const index = async (req, res)=>{           //tạo arow function gồm 2 biến (req,res)
    const page = req.query.page || 1;       //lấy trang hiện tại
    const limit = req.query.limit || 10;    //lấy giới hạn
    
    const skip = limit*(page - 1);          //
    const totalDatban = await DatbanModel.countDocuments();
    const totalPage = Math.ceil(totalDatban/limit);
    
    const pages = paginate(page, totalPage);
    const datban = await DatbanModel.find().skip(skip).limit(limit).sort({_id : 1}); //tìm các dữ liệu trong model bỏ qua số lượng bằng biến skip giới hạn lấy bao nhiêu số lượng bằng biến limit và sort theo id của monggose
    res.render('admin/datban/index', {  //render ra giao diện và truyền giá trị vào
        page,
        pages,
        totalPage,
        datban  //các giá trị
    });
}
const create = (req, res )=>{
    res.render('admin/datban/add_datban', {
        data : {},
    }) //chuyen du lieu den html
}
const store = async (req, res)=>{       
    const body = req.body;  //lấy dữ liệu từ cái field (các trường trong textbox)
    const db = {
        first_name: body.fisrt_name,
        last_name: body.last_name,
        email: body.email,
        day: body.day,
        time: body.time,
        phone: body.phone,
        note: body.note,
    }
    new DatbanModel(db).save();     //lưu object db vào datbanmodel 
    res.redirect('/admin/datban')   //chuyển hướng đến giao diện
}


const edit = async (req, res)=>{    
    const id = req.params.id;   //lấy id trên router 
    const datban = await DatbanModel.findById(id); //tìm dữ liệu theo id để ra dữ liệu của idd ods
    res.render("admin/datban/edit_datban", {        //render ra giao diện
        datban,     
        data : {}           //truyền giữ liệu
    });
}
const update = async (req, res)=>{
    const body = req.body;

    const db = {
        first_name: body.fisrt_name,
        last_name: body.last_name,
        email: body.email,
        day: body.day,
        time: body.time,
        phone: body.phone,
        note: body.note,
    }
    await DatbanModel.updateOne({_id : req.params.id}, {$set : db})     //update theo id của params
    res.redirect('/admin/datban');
}

const del = async (req, res)=>{
    const {id} = req.params;
    await DatbanModel.findByIdAndDelete(id);
    res.redirect('/admin/datban');
}
module.exports = {
    index,
    create,
    store,
    edit,
    update,
    del
}
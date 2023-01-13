const express = require('express');
const router = express.Router();

// Controller - Admin
const AuthController = require("./../apps/controllers/auth");
const AdminController = require('./../apps/controllers/admin');
const CategoryController = require("./../apps/controllers/category");
const UserController = require('./../apps/controllers/user');
const KhoController = require("./../apps/controllers/kho");
const NhanvienController = require("./../apps/controllers/nhanvien");
const DatbanController = require("./../apps/controllers/datban");
const ContactController = require("./../apps/controllers/contact");
const BaiVietController = require("./../apps/controllers/baiviet")
const HoadonController = require("./../apps/controllers/hoadon")
const CthoadonController = require("./../apps/controllers/cthoadon")
const DichVuController = require("./../apps/controllers/dichvu")
const ProductController = require("./../apps/controllers/product");
const CommentController = require("./../apps/controllers/comment");
// Controller - Site
const SiteController = require("./../apps/controllers/site")
// middlewares
const AuthMiddleware = require('./../apps/middlewares/auth')
const UploadMiddleware = require('./../apps/middlewares/upload')
// Router
const ExcelController = require('./../apps/controllers/tutorial/excel.controller')
// admin  
router.get('/admin/login', AuthMiddleware.checkLogin, AuthController.login);
router.post('/admin/login', AuthMiddleware.checkLogin, AuthController.postLogin);



router.get('/admin/logout',AuthMiddleware.checkAdmin, AdminController.logout);
router.get('/admin',AuthMiddleware.checkAdmin, AdminController.index);

// product
router.get('/admin/products', AuthMiddleware.checkAdmin, ProductController.index);
router.get('/admin/products/create', AuthMiddleware.checkAdmin, ProductController.create); // cr prd
router.post('/admin/products/store',  AuthMiddleware.checkAdmin, UploadMiddleware.upload.single('thumbnail') , ProductController.store);    // post cr prd
router.get('/admin/products/edit/:id', AuthMiddleware.checkAdmin, ProductController.edit);
router.post('/admin/products/update/:id', AuthMiddleware.checkAdmin, UploadMiddleware.upload.single('thumbnail') , ProductController.update);
router.get('/admin/products/delete/:id', AuthMiddleware.checkAdmin, ProductController.del);

//hang
router.get('/admin/category/', AuthMiddleware.checkAdmin, CategoryController.index);
router.get('/admin/category/create', AuthMiddleware.checkAdmin, CategoryController.create); // cr category
router.post('/admin/category/store',  AuthMiddleware.checkAdmin, UploadMiddleware.upload.single('thumbnail') , CategoryController.store);    // post cr prd
router.get('/admin/category/edit/:id', AuthMiddleware.checkAdmin, CategoryController.edit);
router.post('/admin/category/update/:id', AuthMiddleware.checkAdmin, UploadMiddleware.upload.single('thumbnail') , CategoryController.update);
router.get('/admin/category/delete/:id', AuthMiddleware.checkAdmin, CategoryController.del);

//nhanvien
router.get('/admin/nhanvien/', AuthMiddleware.checkAdmin, NhanvienController.index);
router.get('/admin/nhanvien/create', AuthMiddleware.checkAdmin, NhanvienController.create); // cr category
router.post('/admin/nhanvien/store',  AuthMiddleware.checkAdmin, UploadMiddleware.upload.single('thumbnail') , NhanvienController.store);    // post cr prd
router.get('/admin/nhanvien/edit/:id', AuthMiddleware.checkAdmin, NhanvienController.edit);
router.post('/admin/nhanvien/update/:id', AuthMiddleware.checkAdmin, UploadMiddleware.upload.single('thumbnail') , NhanvienController.update);
router.get('/admin/nhanvien/delete/:id', AuthMiddleware.checkAdmin, NhanvienController.del);

//contact
router.get('/admin/contact/', AuthMiddleware.checkAdmin, ContactController.index);
router.get('/admin/contact/create', AuthMiddleware.checkAdmin, ContactController.create); 
router.post('/admin/category/store', AuthMiddleware.checkAdmin, ContactController.store);   
router.get('/admin/category/edit/:id', AuthMiddleware.checkAdmin, ContactController.edit);
router.post('/admin/category/update/:id', AuthMiddleware.checkAdmin, ContactController.update);
router.get('/admin/category/delete/:id', AuthMiddleware.checkAdmin, ContactController.del);

//hoadon
router.get('/admin/hoadon/', AuthMiddleware.checkAdmin, HoadonController.index);
router.get('/admin/hoadon/create', AuthMiddleware.checkAdmin, HoadonController.create); 
router.post('/admin/hoadon/store', AuthMiddleware.checkAdmin, HoadonController.store);    
router.get('/admin/hoadon/edit/:id', AuthMiddleware.checkAdmin, HoadonController.edit);
router.post('/admin/hoadon/update/:id', AuthMiddleware.checkAdmin, HoadonController.update);
router.get('/admin/hoadon/delete/:id', AuthMiddleware.checkAdmin, HoadonController.del);

//cthoadon
router.get('/admin/cthoadon', AuthMiddleware.checkAdmin, CthoadonController.index);
router.get('/admin/cthoadon/create', AuthMiddleware.checkAdmin, CthoadonController.create); 
router.post('/admin/cthoadon/store', AuthMiddleware.checkAdmin, CthoadonController.store);    
router.get('/admin/cthoadon/edit/:id', AuthMiddleware.checkAdmin, CthoadonController.edit);
router.post('/admin/cthoadon/update/:id', AuthMiddleware.checkAdmin, CthoadonController.update);
router.get('/admin/cthoadon/delete/:id', AuthMiddleware.checkAdmin, CthoadonController.del);



//kho
router.get('/admin/kho/', AuthMiddleware.checkAdmin, KhoController.index);
router.get('/admin/kho/create', AuthMiddleware.checkAdmin, KhoController.create); // cr category
router.post('/admin/kho/store',  AuthMiddleware.checkAdmin, UploadMiddleware.upload.single('thumbnail') , KhoController.store);    // post cr prd
router.get('/admin/kho/edit/:id', AuthMiddleware.checkAdmin, KhoController.edit);
router.post('/admin/kho/update/:id', AuthMiddleware.checkAdmin, UploadMiddleware.upload.single('thumbnail') , KhoController.update);
router.get('/admin/kho/delete/:id', AuthMiddleware.checkAdmin, KhoController.del);

//datban
router.get('/admin/datban', AuthMiddleware.checkAdmin, DatbanController.index);
router.get('/admin/datban/create', AuthMiddleware.checkAdmin, DatbanController.create); 
router.post('/admin/datban/store', AuthMiddleware.checkAdmin, DatbanController.store);    
router.get('/admin/datban/edit/:id', AuthMiddleware.checkAdmin, DatbanController.edit);
router.post('/admin/datban/update/:id', AuthMiddleware.checkAdmin, DatbanController.update);
router.get('/admin/datban/delete/:id', AuthMiddleware.checkAdmin, DatbanController.del);

//baiviet
router.get('/admin/baiviet', AuthMiddleware.checkAdmin, BaiVietController.index);
router.get('/admin/baiviet/create', AuthMiddleware.checkAdmin, BaiVietController.create); 
router.post('/admin/baiviet/store',  AuthMiddleware.checkAdmin, UploadMiddleware.upload.single('thumbnail') , BaiVietController.store);    // post cr prd
router.get('/admin/baiviet/edit/:id', AuthMiddleware.checkAdmin, BaiVietController.edit);
router.post('/admin/baiviet/update/:id', AuthMiddleware.checkAdmin, UploadMiddleware.upload.single('thumbnail') , BaiVietController.update);
router.get('/admin/baiviet/delete/:id', AuthMiddleware.checkAdmin, BaiVietController.del);

//dichvu
router.get('/admin/dichvu', AuthMiddleware.checkAdmin, DichVuController.index);
router.get('/admin/dichvu/create', AuthMiddleware.checkAdmin, DichVuController.create); 
router.post('/admin/dichvu/store',  AuthMiddleware.checkAdmin, UploadMiddleware.upload.single('thumbnail') , DichVuController.store);    // post cr prd
router.get('/admin/dichvu/edit/:id', AuthMiddleware.checkAdmin, DichVuController.edit);
router.post('/admin/dichvu/update/:id', AuthMiddleware.checkAdmin, UploadMiddleware.upload.single('thumbnail') , DichVuController.update);
router.get('/admin/dichvu/delete/:id', AuthMiddleware.checkAdmin, DichVuController.del);

//user 
router.get('/admin/user', AuthMiddleware.checkAdmin, UserController.index);
router.get('/admin/user/create', AuthMiddleware.checkAdmin, UserController.create); // cr user
router.post('/admin/user/store', AuthMiddleware.checkAdmin, UserController.store);    // post cr user
router.get('/admin/user/edit/:id', AuthMiddleware.checkAdmin, UserController.edit);
router.post('/admin/user/update/:id', AuthMiddleware.checkAdmin, UserController.update);
router.get('/admin/user/delete/:id', AuthMiddleware.checkAdmin, UserController.del);



//comment
router.get('/admin/comment', AuthMiddleware.checkAdmin, CommentController.index);
router.post('/admin/comment/update/:id', AuthMiddleware.checkAdmin, CommentController.update);
router.get('/admin/comment/delete/:id', AuthMiddleware.checkAdmin, CommentController.del);

///////////////////////////// site
// router.get('/')
router.get('/about', SiteController.about);
router.get('/blog-single', SiteController.blogsingle);
router.get('/blog', SiteController.baiviet);
router.get('/cart', SiteController.cart);
router.get('/checkout', SiteController.checkout);
router.get('/contact', SiteController.contact);
router.post('/addcontact', SiteController.addcontact);
router.post('/addtable', SiteController.addtable);
router.get('/', SiteController.home);
router.get('/menu', SiteController.menu);
router.get('/services', SiteController.dichvu);
router.get('/shop',SiteController.shop)
router.post('/addToCart', SiteController.addToCart)
router.get("/delCart", SiteController.delToCart)
router.post('/buyProduct',SiteController.buyProduct)


router.get('/exportExcel',ExcelController.download)



router.post("/product-:slug.:id", SiteController.comment); 
router.get("/cart1", SiteController.cart1);

router.post("/update-cart", SiteController.updateCart)
// router.post("/add-to-cart", SiteController.addToCart);

// router.post("/order", SiteController.order)
router.get("/success", SiteController.success);


router.get('/test')
module.exports = router;
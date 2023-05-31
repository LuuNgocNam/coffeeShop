const paginate = require("../../common/paginate");

const CategoryModel = require("../models/category");
const CommentModel = require("../models/comment");
const DichvuModel = require("../models/dichvu");
const BaivietModel = require("../models/baiviet");
const ProductModel = require("../models/product");
const HoadonModel = require("../models/hoadon");
const ContactModel = require("../models/contact");
const DatbanModel = require("../models/datban");
const paypal = require("../functions/paypal");

const transporter = require("../../common/transporter");
const config = require("config");
const ejs = require("ejs");
const path = require("path");
const CthoadonModel = require("../models/cthoadon");
const about = async (req, res) => {
  res.render("site/about", {
    about,
  });
};

const blogsingle = async (req, res) => {
  res.render("site/blog-single", {});
};

const baiviet = async (req, res) => {
  const baiviet = await BaivietModel.find();
  res.render("site/blog", {
    baiviet,
  });
};

const cart = async (req, res) => {
  let products = req.session.cart;
  res.render("site/cart", {
    products,
  });
};

const checkout = async (req, res) => {
  let products = req.session.cart;
  const totalPrice = products.reduce(
    (total, item) => (total += item.price * item.qty),
    0
  );
  res.render("site/checkout", {
    totalPrice,
  });
};

const contact = async (req, res) => {
  res.render("site/contact", {});
};

const addcontact = async (req, res) => {
  const body = req.body;
  const dataContact = {
    name: body.name,
    email: body.email,
    day: new Date(),
    evaluate: body.evaluate,
    note: body.note,
  };
  await ContactModel.create(dataContact);
  res.redirect("/");
};

const home = async (req, res) => {
  res.render("site/index", {});
};

const menu = async (req, res) => {
  const products = await ProductModel.find().populate("cat_id");
  res.render("site/menu", {
    products,
  });
};

const dichvu = async (req, res) => {
  const dichvu = await DichvuModel.find();
  res.render("site/services", {
    dichvu,
  });
};

const addtable = async (req, res) => {
  const body = req.body;
  const dataTable = {
    first_name: body.fisrt_name,
    last_name: body.last_name,
    email: body.email,
    day: body.day,
    time: body.time,
    phone: body.phone,
    note: body.note,
  };
  await DatbanModel.create(dataTable);
  res.redirect("/");
};

const shop = async (req, res) => {
  const products = await ProductModel.find().populate("cat_id");
  res.render("site/shop", {
    products,
  });
};

const buyProduct = async (req, res) => {
  const url = req.get("Host");
  const body = req.body;
  let products = req.session.cart;
  const totalPrice = products.reduce(
    (total, item) => (total += item.price * item.qty),
    0
  );
  let arrProd = [];
  products.forEach((item, index) => {
    arrProd.push({
      name: item.name,
      sku: "00" + (index + 1),
      price: item.price.toString(),
      currency: "USD",
      quantity: item.qty,
    });
  });
  const create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url:
        "http://" + url + `/PaySuccess?name=${body.name}&price=${totalPrice}`,
      cancel_url: "/cancel",
    },
    transactions: [
      {
        item_list: {
          items: arrProd,
        },
        amount: {
          currency: "USD",
          total: totalPrice.toString(),
        },
        description: "Coffee",
      },
    ],
  };
  paypal.paypal.payment.create(
    create_payment_json,
    async function (error, payment) {
      if (error) {
        throw error;
      } else {
        for (let i = 0; i < payment.links.length; i++) {
          const arrProduct = [];
          products.map((item) => arrProduct.push(item.id));
          const dataBill = {
            name: body.name,
            phone: body.phone,
            email: body.email,
            method: body.method,
            day: body.day,
            products: arrProduct,
            price: totalPrice,
          };
          if (payment.links[i].rel === "approval_url") {
            req.session.cart = [];
            const bill = await HoadonModel.create(dataBill);
            products.map(async (item) => {
              let dataCTHD = {
                id_hd: bill._id,
                name: item.name,
                price: item.price,
                qty: item.qty,
                total: item.qty * item.price,
              };
              await CthoadonModel.create(dataCTHD);
              const items = req.session.cart;
              const viewPath = req.app.get("views");
              if (body.method == "Đặt đồ online") {
                const html = await ejs.renderFile(
                  path.join(viewPath, "site/email.ejs"),
                  {
                    name: body.name,
                    phone: body.phone,
                    email: body.email,
                    day: body.day,
                    totalPrice: totalPrice,
                    items,
                  }
                );
                await transporter.sendMail({
                  to: body.email,
                  from: "Nghiện Coffee",
                  subject: "Xác nhận đơn hàng từ Nghiện Coffee",
                  html,
                });
              }

            });

            res.redirect(payment.links[i].href);
          }
        }
      }
    }
  );
  //   const arrProduct = [];
  //   products.map((item) => arrProduct.push(item.id));
  //   //   const body = req.body;
  //   const dataBill = {
  //     name: body.name,
  //     phone: body.phone,
  //     email: body.email,
  //     method: body.method,
  //     day: body.day,
  //     products: arrProduct,
  //     price: totalPrice,
  //   };
  //   const bill = await HoadonModel.create(dataBill);
  //   products.map(async (item) => {
  //     let dataCTHD = {
  //       id_hd: bill._id,
  //       name: item.name,
  //       price: item.price,
  //       qty: item.qty,
  //       total: item.qty * item.price,
  //     };
  //     await CthoadonModel.create(dataCTHD);
  //   });

  //   const items = req.session.cart;
  //   const viewPath = req.app.get("views");

  //   if (body.method == "Đặt đồ online") {
  //     const html = await ejs.renderFile(path.join(viewPath, "site/email.ejs"), {
  //       name: body.name,
  //       phone: body.phone,
  //       email: body.email,
  //       day: body.day,
  //       totalPrice: totalPrice,
  //       items,
  //     });
  //     await transporter.sendMail({
  //       to: body.email,
  //       from: "Nghiện Coffee",
  //       subject: "Xác nhận đơn hàng từ Nghiện Coffee",
  //       html,
  //     });
  //   }

  //   req.session.cart = [];
  //   res.redirect("/success");
};

const paySuccess = (req, res) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;
  const Price = req.query.price;
  const execute_payment_json = {
    payer_id: payerId,
    transactions: [
      {
        amount: {
          currency: "USD",
          total: Number(Price),
        },
      },
    ],
  };
  paypal.paypal.payment.execute(
    paymentId,
    execute_payment_json,
    async function (error, payment) {
      if (error) {
        console.log(error.response);
        throw error;
      } else {
        res.redirect("http://localhost:3000/");
      }
    }
  );
};

const addToCart = async (req, res) => {
  const body = req.body;
  let items = req.session.cart;
  let isUpdate = false;
  console.log(items);
  items.map((item) => {
    if (item.id == body.id) {
      isUpdate = true;
      item.qty += parseInt(1);
    }
    console.log(item);
    return item;
  });
  if (!isUpdate) {
    const product = await ProductModel.findById(body.id);
    items.push({
      id: product.id,
      name: product.name,
      price: product.price,
      img: product.thumbnail,
      qty: parseInt(1),
    });
  }
  req.session.cart = items;
  res.redirect("/cart");
};

const comment = async (req, res) => {
  const id = req.params.id;
  const full_name = req.body.full_name;
  const body = req.body.body;
  const email = req.body.email;
  const comment = {
    email: email,
    prd_id: id,
    body: body,
    full_name: full_name,
  };
  await new CommentModel(comment).save();

  res.redirect(req.path);
};

const cart1 = (req, res) => {
  let products = req.session.cart;
  const totalPrice = products.reduce(
    (total, item) => (total += item.price * item.qty),
    0
  );
  res.render("site/cart", {
    items: products,
    totalPrice,
  });
};

const delToCart = (req, res) => {
  const { id } = req.query;
  const items = req.session.cart;
  items.map((item, index) => {
    if (item.id == id) {
      items.splice(index, 1);
    }
    return item;
  });
  req.session.cart = items;
  res.redirect("/cart");
};
const updateCart = (req, res) => {
  const { products } = req.body;
  const items = req.session.cart;
  items.map((item) => {
    if (products[item.id]) {
      item.qty = parseInt(products[item.id]["qty"]);
    }
    return item;
  });
  req.session.cart = items;
  res.redirect("/cart");
};

const success = (req, res) => {
  res.render("site/index");
};

module.exports = {
  about,
  blogsingle,
  cart,
  checkout,
  contact,
  addcontact,
  addtable,
  home,
  menu,
  dichvu,
  shop,
  baiviet,
  comment,
  success,
  cart1,
  addToCart,
  delToCart,
  updateCart,
  buyProduct,
  paySuccess,
};

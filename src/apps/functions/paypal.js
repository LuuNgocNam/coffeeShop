// import * as paypal from 'paypal-rest-sdk'
const paypal = require("paypal-rest-sdk");
paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id:
    "AY_QHZtrwzdcow05u3Myf-gvViXpiWMiXBNp3CkMy27kdrY63u3OoLJAJk4YFxaoXalab6kQwJREur3M",
  client_secret:
    "EM1SaS46uwpOAM2FHN3gSbSB6pulhin5fimNjIYg-WlMJ5q2GTtxOKCsdya4XnVD23IfyXM-tako6e3a",
});

module.exports = { paypal };

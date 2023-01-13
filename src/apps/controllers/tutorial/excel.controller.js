// const db = require("../../models");
const HoadonModel = require("../../models/hoadon")
const excel = require("exceljs");

const download = (req, res) => {
    HoadonModel.find({ is_stock: req.query.is_stock }).then((objs) => {
        let hoadon = [];

        objs.forEach((obj) => {
            hoadon.push({
                name: obj.name,
                phone: obj.phone,
                email: obj.email,
                day: obj.day,
                method: obj.method,
                price: obj.price,
                is_stock: obj.is_stock ? "Đã thanh toán" : "Chưa thanh toán",
            });
        });
        let workbook = new excel.Workbook();
        let worksheet = workbook.addWorksheet("Hoadon");

        worksheet.columns = [
            { header: "name", key: "name", width: 25 },
            { header: "phone", key: "phone", width: 25 },
            { header: "email", key: "email", width: 25 },
            { header: "day", key: "day", width: 25 },
            { header: "method", key: "method", width: 25 },
            { header: "price", key: "price", width: 25 },
            { header: "is_stock", key: "is_stock", width: 25 },

        ];

        // Add Array Rows
        worksheet.addRows(hoadon);

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
            "Content-Disposition",
            "attachment; filename=" + "tutorials.xlsx"
        );

        return workbook.xlsx.write(res).then(function () {
            res.status(200).end();
        });
    });
};

module.exports = {
    download,
};
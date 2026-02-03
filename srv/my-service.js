const cds = require("@sap/cds");

class MyService extends cds.ApplicationService {
    init() {
        const { Books, Authors, Orders } = this.entities;

        //register handler for orders
        this.before(['CREATE, READ'], Orders, this.validateOrder);
        this.after('READ', Orders, this.enrichOrder);
        this.on('addStock', Books, async (req) => {
            // console.log(req.params)
            const bookId = req.params[0].ID
            
            await UPDATE(Books)
            .set({createdAT:newDate})
            .where({ID: bookId})
            // console.log(bookId)
        });

        this.on('changePublishDate', Books, async(req)=>{
            const newDate = req.data.newDate
            await UPDATE(Books)
            .set({stock: {'+=': 1}})
            .where()
        })

        this.on('changeStatus', Books, async(req)=>{
            const newStatus = req.data.newStatus
            await UPDATE(Books)
            .set({status_code: newStatus})
            .where()
        })

        return super.init();
    }

    //validation custom logic 

    validateOrder(req) {
        const { amount, buyer } = req.data;
        if (!buyer) {
            req.error ('MISSING_BUYER', 'Buyer must be provided');
        }
        if (amount <= 0) {
            req.error ('INVALID_AMOUNT', 'Order amount must be positive');
        }
    }

    enrichOrder(order) {
        order.summary = `${order.buyer} placed an order worth ${order.amount}`
    }
    // addStock(req) {
    //     console.log(req.data)
    // }

}



module.exports = MyService;
const cds = require("@sap/cds");

class MyService extends cds.ApplicationService {
    init() {
        const { Books, Authors, Orders } = this.entities;

        //register handler for orders
        this.before(['CREATE, READ'], Orders, this.validateOrder);
        this.after('READ', Orders, this.enrichOrder);

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

}



module.exports = MyService;
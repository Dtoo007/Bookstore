using { bookstore as bs } from '../db/schema';

service MyService {

     entity Books as projection on bs.Books actions {
        //custom action
        action addStock();
        action changePublishDate(newDate: Date);
        action changeStatus( @(Common : {
            ValueListWithFixedValues : true,
            Label: 'New Status',
            ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'BookStatus',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : newStatus,
                    ValueListProperty : 'code',
                },
            ],
        },
        })
        newStatus: String)
        };

     entity Authors as projection on bs.Authors;

    @requires: 'authenticate-user'
    entity Orders as projection on bs.Orders;

    entity BookStatus as projection on bs.BookStatus;

}
annotate MyService.Books with @odata.draft.enabled;
using { bookstore as bs } from '../db/schema';

service MyService {

     entity Books as projection on bs.Books;
     entity Authors as projection on bs.Authors;

    @requires: 'authenticate-user'
    entity Orders as projection on bs.Orders;

    entity BookStatus as projection on bs.BookStatus;

}
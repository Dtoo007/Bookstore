using { bookstore as bs } from '../db/schema';

service MyService {

    @readonly entity Books as projection on bs.Books;
    @readonly entity Authors as projection on bs.Authors;

    @requires: 'authenticate-user'
    entity Orders as projection on bs.Orders;

}
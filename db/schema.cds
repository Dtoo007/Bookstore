using { cuid, managed } from '@sap/cds/common';

entity Books: cuid, managed {
        title: String;
        author: Association to Authors;
        description: String(255);
        stock: Integer;
        price: Decimal(9, );
}

entity Authors: cuid, managed {
        name: String;
        books: Association to many Books;
}

entity Orders: cuid, managed {
        book: Association to Books;
        buyer: String;
        date: DateTime;
        amount: Decimal(9, 2);
}
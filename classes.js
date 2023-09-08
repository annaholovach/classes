class Book {
  constructor(title, author, isbn, price, availability) {
    // check that the properties of the object are not empty
    if (!title || !author || !isbn || !price) {
      throw new Error('All properties should be specified.');
    }

    this.title = title
    this.author = author
    this.isbn = isbn 
    this.price = price 
    this.availability = availability
  }
}

// class adds the genre property to the book
class FictionBook extends Book {
  constructor(title, author, isbn, price, availability) {
    super(title, author, isbn, price, availability);
    this.genre = 'Fiction'; 
  }
}

class NonFictionBook extends Book {
  constructor(title, author, isbn, price, availability) {
    super(title, author, isbn, price, availability);
    this.genre = 'Non-Fiction'; 
  }
}

class User {
  static incrementId = 1

  constructor(name, email) {
    // check that the properties of the object are not empty
    if (!name || !email) {
      throw new Error('All properties should be specified.');
    }

    this.name = name
    this.email = email
    // userId will be assigned automatically
    this.userId = User.incrementId++
  }
}

class Cart {
  constructor() {
    // array for adding books
    this.acticle = []
  }
  addBook(book) {
    // if the book is not available, it will not be added to the cart
    if (book.availability === 0) return 
    // add the book to the array in the basket and reduce the availability by 1
    this.acticle.push(book) && --book.availability
  }
  deleteBook(book) {
    const index = this.acticle.indexOf(book)
    if (index !== -1) {
      // remove the book from the basket and increase the availability by 1
      this.acticle.splice(index, 1) && ++book.availability
    }
  }
  calcutateTotalPrice() {
    if (this.acticle.length === 0) return 'your cart is empty'
    return this.acticle.reduce((prev, curr) => prev + curr.price, 0)
  }
}

class Order {
  constructor(user, cart) {
    // if the cart is empty, you cannot create an order
    if (cart.acticle.length === 0) {
      throw new Error('Cart cannot be empty if you want to create an order.');
    }
    this.user = user
    this.cart = cart
    this.totalPrice = this.calcutateTotalPrice()
  }
  calcutateTotalPrice() {
    return this.cart.acticle.reduce((prev, curr) => prev + curr.price, 0)
  }
}

// create book objects
const book1 = new FictionBook('The Great Gatsby', 'F. Scott Fitzgerald', '978-3-16-148410-0', 20.99, 1);
const book2 = new NonFictionBook('How to Code', 'Coder', '978-3-16-148411-0', 15.99, 1);
const book3 = new FictionBook('To Kill a Mockingbird', 'Harper Lee', '978-3-16-148412-0', 18.99, 2);
console.log(book2);

// create user objects
const user1 = new User('John Doe', 'john@example.com');
const user2 = new User('Jane Smith', 'jane@example.com');

// create carts for users
const cart1 = new Cart();
const cart2 = new Cart();

// add books to carts
cart1.addBook(book1);
cart1.addBook(book2);
cart1.deleteBook(book1)
cart1.addBook(book3)

cart2.addBook(book3);
cart2.addBook(book1)

cart1.addBook(book1)
cart2.addBook(book2)

console.log(cart1);
console.log(cart2);

// place orders
const order1 = new Order(user1, cart1);
const order2 = new Order(user2, cart2);
console.log(order1);
console.log(order2);

// interactions
console.log(`Interaction Example:`);
console.log(`${user1.name} has ${cart1.acticle.length} items in their cart.`);
console.log(`Total price in ${user1.name}'s cart: $${cart1.calcutateTotalPrice()}`);

console.log(`${user2.name} has ${cart2.acticle.length} items in their cart.`);
console.log(`Total price in ${user2.name}'s cart: $${cart2.calcutateTotalPrice()}`);

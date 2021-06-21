interface IProduct {
  title: string;
  price: number;
  description: string;

  save: () => void;
}

class Product implements IProduct {
  title: string;
  price: number;
  description: string;

  constructor(title: string, price: number, description: string) {
    this.title = title;
    this.price = price;
    this.description = description;
  }

  save(): void {
    products.push(this);
  }

  static fetchAllProducts() {
    return products;
  }
}

const products: Product[] = [
  new Product(
    "A Great Book",
    19.99,
    "A very interesting book about so many even more interesting things!"
  ),
];

export default Product;

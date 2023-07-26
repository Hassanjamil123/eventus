class Product {
    constructor(id, ownerId, title, imageUrl, description, price, location, date, category, viewCount) {
        this.id = id;
        this.ownerId = ownerId;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
        this.location = location;
        this.date = date;
        this.category = category;
        this.viewCount = viewCount;
      
    }
}

export default Product;
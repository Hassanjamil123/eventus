class Event {
    constructor(id, ownerId, title, imageUrl, description, price, location, date) {
        this.id = id;
        this.ownerId = ownerId;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
        this.location = location;
        this.date = date;
    }
}

export default Event;
export class Place {
    constructor(title, imageUri, location, id) {
        this.title = title;
        this.imageUri = imageUri;
        this.address = location.address;
        this.location = { lat: location.lat, lng: location.lng}; // { lat: 0.151141,lng:  123.923 }
        // since we're going to store data locally, we define unique ids via DATABASE
        this.id = id;
    }
}

const GOOGLE_API_KEY = '';

// Google Maps Static API to navigate and open map inside an screen from an app
    // docs: https://developers.google.com/maps/documentation/maps-static
export function getMapPreview(lat, lng) {
    const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;

    return imagePreviewUrl;
};  

//Google GeoCoding API to convert between addresses and geographic coordinates
    // docs: https://developers.google.com/maps/documentation/geocoding/requests-reverse-geocoding
export async function getAddress(lat, lng) {
    // URL to which the request should be sent
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`;

    // using fetch function to make the HTTP resquest from the google API
    const response = await fetch(url);
    // if not ok the response, send an error message
    if(!response.ok) {
        throw new Error('Failed to fetch address!')
    }
    // get the data from the response json format
    const data = await response.json();
    // from the data const, get the address from this json, that's located in this format, (see more in docs)!
    const address = data.results[0].formatted_address;
    
    return address;
}   

// run expo install expo install expo-sqlite
import * as SQLite from 'expo-sqlite';
import { Place } from '../models/place';


// create a db
const database = SQLite.openDatabase('places.db');

// function to start the basic config of db
export function init() {
    // creating a promise that we want to generate when calling the init function
    const promise = new Promise((resolve, reject) => {  
        // transaction object passed as arg which, we get automatically
        database.transaction((tx) => {
            // create a table if it doesn't exisits yet
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS places (    
                    id INTEGER PRIMARY KEY NOT NULL,
                    title TEXT NOT NULL,
                    imageUri TEXT NOT NULL,
                    address TEXT NOT NULL,
                    lat REAL NOT NULL,
                    lng REAL NOT NULL
                  )`,
                // we can pass as second arg an array of special values
                [],
                // callback if everything succeeded
                () => {
                    resolve();
                }, 
                // callback if we've an error
                (_, error) => { // '_' blank signals that I've to take this arg, but I'm not using
                    reject(error);
                }
            );
        });
    }); 
    // when the execute tries to create an table, this will return whether they've succedded or not
    return promise;
}

// funct to add place into DB
export function insertPlace(place) {
    // also wrap the function to modify the DB into a promise
    const promise = new Promise((resolve, reject) => {

        database.transaction((tx) => {
            tx.executeSql(`
                INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`, 
                [ //list of values to be added
                    place.title, 
                    place.imageUri, 
                    place.address,  
                    place.location.lat, 
                    place.location.lng
                ],
                // callback if everything succeeded
                (_, result) => {
                    // print in console the result
                    console.log(result);
                    // pass back to the promise the result
                    resolve(result);
                },
                    // callback if we've an error
                (_, error) => {
                    // pass back the promise the error when inserting
                    reject(error);
                },
            );
        });

    });
    return promise;
}

export function fetchPlaces() {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(
                // command to list all the places
                'SELECT * FROM places', 
                [], // pass nothing as variable
                // callback if everything succeeded
                (_, result) => {
                    /* THE RAW RESULT OF THE DATABASE IS:
                        WebSQLResultSet {
                            "insertId": undefined,
                            "rows": WebSQLRows {
                                "_array": Array [
                                Object {
                                    "address": "99 Grove St, San Francisco, CA 94102, USA",
                                    "id": 1,
                                    "imageUri": "file:///var/mobile/Containers/Data/Application/B3C2E886-D303-44B4-807D-EFCCB12AD7EE/Library/Caches/ExponentExperienceData/%2540anonymous%252Frn-favplaces-app-b43f1d25-885d-429c-8673-f6a97a4935da/ImagePicker/EE086B99-6267-4F5F-BEA9-4A731DAD6175.jpg",
                                    "lat": 37.777760511652666,
                                    "lng": -122.41783698642482,
                                    "title": "New place",
                                },
                                ],
                                "length": 1,
                            },
                            "rowsAffected": 0,
                            }
                    */
                    // gather all the Place objects into an array to be passed back as response
                    const places = [];
                    // iterate through the raw result and get the data as an Place object and push into arr
                    for (const dp of result.rows._array) {
                        places.push(
                            new Place(
                                dp.title,
                                dp.imageUri,
                                {
                                    address: dp.address,
                                    lat: dp.lat,
                                    lng: dp.lng
                                },
                                dp.id
                            )
                        );
                    }
                    // pass back to the promise the result with this config, as default the response
                    resolve(places);
                },
                //  callback if we've an error
                (_, error) => {
                    // pass back the promise the error when inserting
                    reject(error);
                },
            );
        });
    });
    return promise;
}

export function fetchPlaceDetails(id) {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM places WHERE id = ?', 
                [id], // pass the id to be searched
                (_, result) => {
                    // place where the one item is located in the response of query execution
                    const dbPlace = result.rows._array[0];
                    // return the item in our Place format object
                    const place = new Place(
                        dbPlace.title,
                        dbPlace.imageUri,
                        { lat: dbPlace.lat, lng: dbPlace.lng, address: dbPlace.address },
                        dbPlace.id
                    )
                    resolve(place);
                }, 
                (_, error) => {
                    reject(error);
                }
            );
        });
    });

    return promise;
}
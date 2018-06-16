/*
* OBJECT LITERALS
*
*/

var empty = {}

//The quotes around "first-name is optional"
var stooge = {
    "first-name": "Jerome",
    "last-name": "Howard"
}

var flight = {
    airline: "Oceanic",
    number: 815,
    departure: {
        IATA: "SYD",
        time: "2004-09-22 14:55",
        city: "Sydney"
    },
    arrival: {
        IATA: "LAX",
        time: "2004-09-23 10:42",
        city: "LOs Angeles"
    }
}

/*
* RETRIVAL
*
*/

console.log(stooge["first-name"])
console.log(flight.departure.IATA)
//The undefined value is produced if an attempt is made to retrieve a nonexistent member:
console.log(flight.status)

// The || operator can be used to fill in default values:
var middle = stooge["middle-name"] || "(none)"
var status = flight.status || "unknown"

console.log(middle)
console.log(status)

//Attempting to retrieve values from undefined will throw a TypeError exception.
//This can be guarded against with the && operator

console.log(flight.equipment) // undefined
//console.log(flight.equipment.model) // Throw "Type Error"
console.log(flight.equipment && flight.equipment.model) //undefined

/*
* UPDATE
*
*/

//Update existent value
stooge['first-name'] = 'Leo'

//If the object does not already have that property name, the object is augmented:

stooge['middle-name'] = 'Lester'
stooge.nickname = 'Leo'
flight.equipment = {
    model: 'Boeing 777'
}
flight.status = 'overdue'


console.log(flight)
console.log(stooge)

/*
* REFERENCE
*
* Objects are passed around by reference. They are never copied.
*/

var x = stooge
x.nickname = 'Curly'
var nick = stooge.nickname
//Nick is 'Curly because x and stooge are references to the same object'
console.log(nick)

// a, b and c each refer to a different empty object
var a  = {}, b = {}, c = {}

// a, b and c all refer to the same empty object
a = b = c = {}


/*
* PROTOTYPE
*
* Every object is linked to a prototype object from wich it can inherit properties.
* All objects created from object literals are linked to Object.prototype, 
* an object that comes standard with JavaScript.
*/








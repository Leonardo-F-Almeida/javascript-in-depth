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

//console.log(stooge["first-name"])
//console.log(flight.departure.IATA)
//The undefined value is produced if an attempt is made to retrieve a nonexistent member:
//console.log(flight.status)

// The || operator can be used to fill in default values:
var middle = stooge["middle-name"] || "(none)"
var status = flight.status || "unknown"

//console.log(middle)
//console.log(status)

//Attempting to retrieve values from undefined will throw a TypeError exception.
//This can be guarded against with the && operator

//console.log(flight.equipment) // undefined
//console.log(flight.equipment.model) // Throw "Type Error"
//console.log(flight.equipment && flight.equipment.model) //undefined

/*
* UPDATE
*
*/

//Update existent value
stooge['first-name'] = 'Leo'

// If the object does not already have that property name, the object is augmented:

stooge['middle-name'] = 'Lester'
stooge.nickname = 'Leo'
flight.equipment = {
    model: 'Boeing 777'
}
flight.status = 'overdue'


//console.log(flight)
//console.log(stooge)

/*
* REFERENCE
*
* Objects are passed around by reference. They are never copied.
*/

var x = stooge
x.nickname = 'Curly'
var nick = stooge.nickname
//Nick is 'Curly because x and stooge are references to the same object'
//console.log(nick)

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

if(typeof Object.create !== 'function'){
    Object.create = function(o){
        var F = function(){}
        F.prototype = o;
        return new F();
    }
}

var another_stooge = Object.create(stooge)

// The prototype link has no effect on updating. When we make changes to an
// object, the object´s prototype is not touched

another_stooge['first-name']    = 'Harry'
another_stooge['middle-name']   = 'Moses'
another_stooge.nickname         = 'Moe'

//console.log(another_stooge)
//console.log(stooge)

// The prototype relationship is a dynamic relationship, If we add a new property to
// a prototype, that property will immediately be visible in all objects that are based
// on that prototype

//stooge.profession = 'actor'
//console.log(another_stooge.profession) // 'actor'


/*
* REFLECTION
*
*/

//console.log(typeof flight.number)
//console.log(typeof flight.status)
//console.log(typeof flight.arrival)
//console.log(typeof flight.manifest)

// Some care must be taken because any property on the prototype chain can produce a value:

//console.log(typeof flight.toString) // 'function'
//console.log(typeof flight.constructor) // 'function'

// The other approach is to use the hasOwnProperty method, which returns trye if the
// object has a particular property. The hasOwnProperty method does not look at the
// prototype chain

//flight.hasOwnProperty('number') // true
//flight.hasOwnProperty('constructor') // false


/*
* ENUMERATION
*
*/

// For in function can loop over all of the property names in an object
// - Including functions and prototype properties that you might not be interested in -

// Using the typeof to exclude functions
var name;
for(name in another_stooge){
    if(typeof another_stooge[name] !== 'function'){
       // console.log(name,': ',another_stooge[name])
    }
}

// If you want to assure that the properties appear in a particular order,
// it is best to avoid the for in statement entirely and instead make an array
// containing the names of the properties in the correct order:

var i;
var properties = [
    'first-name',
    'middle-name',
    'last-name',
    'profession'
];

for(i = 0; i < properties.length; i += 1){
    //console.log(properties[i], ':', another_stooge[i])
}


/*
* DELETE
*
*/

//Removing a property from an object may allw a property from the prototype linkage
//to shine through:

//console.log(another_stooge.nickname) // 'Moe'

//Remove nickname from another_stooge, revealing
//the nickname of the prototype;

//delete another_stooge.nickname;

//console.log(another_stooge.nickname) // 'Curly'


/*
* GLOBAL ABATEMENT
*
*/

// One way to minimize the use of global variables is to create a single global variable
// for your application:

var MYAPP = {};

//The variable then becomes the container for your application:

MYAPP.stooge = {
    "first_name":"Joe",
    "last_name":"Howard"
}

MYAPP.flight = {
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
        city: "Los angeles"
    }
}

console.log(MYAPP)

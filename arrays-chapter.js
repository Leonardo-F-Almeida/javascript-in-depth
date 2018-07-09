/*
* ARRAY LITERALS
*/

var empty = []

var numbers = [
    'zero', 'one', 'two', 'three', 'four',
    'five', 'six', 'seven', 'eight', 'nine'
]

empty[1] // undefined
number[1] // 'one'

empty.length // 0
number.length // 10

//The object literal
var numbers_object = {
    '0': 'zero', '1': 'one', '2' : 'two', '3':'three', 
    '4': 'four', '5': 'five', '6' : 'six', '7':'seven', '8':'eight', '9':'nine'
}

// Both numbers and numbers_object are objects containing 10 properties,
// And those properties have exactly the same names and values. But there
// also significant differences. numbers inherits from Array.prototype, whereas
// numbers_object inherits from Object.prototype, so number inherits a larger set of
// useful methods. Also numbers gets the mysterious length property, while numbers_object
// does not


// Js allows an array to contain any mixture of values
var misc = [
    'string',98.6,true,false,null,undefined,
    ['nested','array'], {object:true},NaN,
    Infinity
]

misc.length // 10


/*
* LENGTH
*/

var myArray = []
myArray.length // 0


myArray[10000] = true
myArray.length //10001
// myArray contains one property


// The length can be set explicity. Making the length larger does not allocate more
// space for the array

numbers.length = 3
// number is ['zero', 'one', 'two']

// A new element can be appended to the end of an array by assigning to the array´s
// current length

number[numbers.length] = 'shi'
// numbers is ['zero', 'one', 'two', 'shi']

// It is More convenient to use the push method to accomplish the same thing:
numbers.push('go')
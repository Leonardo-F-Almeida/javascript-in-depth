/*
* ARRAY LITERALS
*/

var empty = []

var numbers = [
    'zero', 'one', 'two', 'three', 'four',
    'five', 'six', 'seven', 'eight', 'nine'
]

empty[1] // undefined
numbers[1] // 'one'

empty.length // 0
numbers.length // 10

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

numbers[numbers.length] = 'shi'
// numbers is ['zero', 'one', 'two', 'shi']

// It is More convenient to use the push method to accomplish the same thing:
numbers.push('go')


/*
* DELETE
*/

// Since JavaScript´s arrays are really objects, the delete operator can be used
// to remove elements from array:

delete numbers[2]
// numbers is ['zero', 'one', 'undefined', 'shi', 'go']

// Unfortunately, that leaves a hole in the array!
// Fortunately, JavaScript arrays have a splice method. It can do surgery on an array,
// deleting some numbers of elements and replacing them with other elements.

numbers.splice(2,1)
// numbers is ['zero', 'one', 'shi', 'go']

/*
* METHODS
*/

// JavaScript provides a set of methods for acting on arrays. The Methods
// are functions stored in Array.prototype, like Object.prototype we can augmented as well


Array.prototype.leoReduce = function (f, value) {
    var i 
    for(i = 0; i< this.length; i+= 1){
        value = f(this[i],value)
    }
    return value
}

var data = [4,8,15,16,23,42]

var add = function(a,b){
    return a+b
}

var mult = function(a,b){
    return a*b
}

var sum = data.leoReduce(add,0)
//console.log(sum)
var product = data.leoReduce(mult,1)
//console.log(product)

// Because an array is really an object, we can add methods directly to an
// individual array:

data.total = function(){
    return this.leoReduce(add,0)
}

//console.log(data.total())
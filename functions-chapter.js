/*
* Function Literal
*/

// Simple function literal

var add = function(a,b){
    return a + b
}

/*
* Method Invocation Pattern
*/

// When a function is stored as a property of an object, we call it a method.
// Methods that get their object context from this are called public methods.

var myObject = {
    value: 2,
    increment: function(inc){
        this.value += typeof inc === 'number' ? inc : 1
    }
}

myObject.increment()
//console.log(myObject.value)

myObject.increment(2)
//console.log(myObject.value)

/*
* THE FUNCTION INVOCATION PATTERN
*/

// When a function is not property of an object, then it is invoked as a function
// When a function is invoked with this patttern, 'this' is bound to the global object.
// var sum = add(3,4)

// Augment myObject with a double method

myObject.double = function(){
    // Problem: Method cannot employ an inner function to help it do its work
    // because the inner function does not share the method´s access to the object
    // as its 'this' is bound to the wrong value
    var that = this // workaround

    var helper = function(){
        that.value = add(that.value,that.value)
    }

    helper() // Invoke helper as a function
}

// Invoke double as a method.

myObject.double()
//console.log(myObject.value)


/*
* THE CONTRUCTOR INVOCATION PATTERN
*/

// Use of this style of constructor functions is not recommended

// Create a constructor function called Quo.
// It makes an object with status property.

var Quo = function(string){
    this.status = string
}

// Give all instances of Quo a public method called get_status.

Quo.prototype.get_status = function(){
    return this.status
}

// If a constructor is called without the new prefix, very bad things cam happen
// So the capitalization convention is really important
var myQuo = new Quo("confused")

//console.log(myQuo.get_status())

/*
* THE APPLY INVOCATION PATTERN
*/

var array = [3,4]
var sum = add.apply(null,array)

//console.log(sum)

var statusObject = {
    status : 'A-OK'
}

// statusObject does not inherit from Quo.prototype,
// but we can invoke the get_status method on
// statusObject even though statusObject does not have
// a get_status method.

var status = Quo.prototype.get_status.apply(statusObject)

//console.log(status)

/*
* ARGUMENTS
*/

// Make a function that adds a lot of stuff.

// Note that defining the variable sum inside of
// the function does not interfere with the sum
// defined outside of the function. The function
// only sees the inner once.

// THIS IS NOT A USEFUL PATTERN
var sumWithArgs = function(){
    var i, sum = 0

    for(i = 0; i < arguments.length; i += 1){
        sum += arguments[i]
    }

    return sum
}

//console.log(sumWithArgs(1,2,3,4,5,6))

/*
* EXCEPTIONS
*/

var add = function(a,b){
    if(typeof a !== 'number' || typeof b !== 'number'){
        throw{
            name:'TypeError',
            message:'add needs numbers'
        }
    }

    return a + b
}

// Make a try_it function that calls the new add
// function incorrectly.

var try_it = function(){
    try{
        add("seven")
    } catch(e){
        console.log(e.name,":",e.message)
    }
}

//try_it()

/*
* AUGMENTING TYPES
*/

// JavasScript allows the basic types of the language to be augmented
// adding a method to Object.prototype makes the method available to all
// objects. This also works for functions, arrays, strings, numbers,
// regular expressions and booleans

Function.prototype.method = function(name, func){
    if(!this.prototype[name]){
        this.prototype[name] = func
        return this
    }
}

Number.method('integer', function(){
    return Math[this < 0 ? 'ceil' : 'floor'](this)
})

//console.log((-10/3).integer())

String.method('trim',function(){
    return this.replace(/^\s+|\s+$/g,'')
})

console.log("      teste      ".trim())
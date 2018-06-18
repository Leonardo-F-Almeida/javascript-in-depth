/*
* Function Literal
*/

//Simple frunction literal

var add = function(a,b){
    return a + b
}

/*
* Method Invocation Pattern
*/

// When a function is stored as a property of an object, we call it a method.
// Methods that get their object context from this are called public methods.

var myObject = {
    value: 0,
    increment: function(inc){
        this.value += typeof inc === 'number' ? inc : 1
    }
}

myObject.increment()
console.log(myObject.value)

myObject.increment(2)
console.log(myObject.value)
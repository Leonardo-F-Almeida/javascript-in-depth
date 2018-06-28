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

//console.log("      teste      ".trim())

/*
* RECURSION
*/

var hanoi = function hanoi(disc,src, aux, dst){
    if(disc > 0){
        hanoi(disc -1, src, dst, aux)
        console.log('Move disc ', disc, ' from ', src, ' to ', dst)
        hanoi(disc -1, aux, src, dst)
    }
}

//hanoi(3, 'Src', 'Aux', 'dest')

// Some Languages oofer the tail recursion optimization. This means that
// if a function returns the result of invoking itself recursively,
// then the invocation is replaced with a loop, wich can significantly spped things up.
// Unfortunately, JavaScript does not currently provide tail recursion optimization.
// Functions that recurse very deeply can fail by exhausting the return stack:

// Makes a factorial function with tail recursion.
// It is tail recursive because it return the result of calling itself

var factorial = function factorial(i, a){
    a = a || 1
    if(i < 2){
        return a
    }
    return factorial(i - 1, a * i)
}

//console.log(factorial(4))

/*
* SCOPE
*/

var foo = function(){
    var a = 3, b = 5

    var bar = function(){
        var b = 7, c = 11

        // At this point, a is 3, b is 7, and c is 11
        a += b + c
        // At this point, a is 21, b is 7, and c is 11
    }

    //at this point,, a is 3, b is 5, and c is not defined

    bar()

    //At this point, a is 21, b is 5


}


/*
* CLOSURE
*/

// Instead of initializing myObject with an object literal, we will initialize my Object
// by calling a function that return an object literal. That function defines a value variable.
// That variable is always available to the increment and getValue method, but the function´s scope
// keeps it hidden from the rest of the program.
// We are not assigning a function to myObject. We are assigning the result of involking that function
var myObject = (function (){
    var value = 0

    return{
        increment: function(inc){
            value += typeof inc === 'number' ? inc : 1
        },
        getValue: function(){
            return value
        }
    }
}())


//console.log(myObject.getValue())

var quo = function(status){
    return {
        get_status : function(){
            return status
        }
    }
}

var myQuo = quo("amazed")
//console.log(myQuo.get_status())


/*
* CALLBACKS
*/


/*
* MODULE
*/

// We can use functions and closure to make modules. A module is a function or object
// that presents an interface but hides its state and implementation
// By using functions to produce modules, we can almost completely eliminate our
// use of global variables.

String.method('deentityify', function(){


    var entity = {
        quot: '"',
        lt:   '<',
        gt:   '>'
    }
    // It calls the string replace method, looking for substrings that start with '&'
    // and end with ';'. If the characters in between are in the entity table, then replace the
    // entity with the character from the table
    return function(){
        return this.replace(/&([^&;]+);/g, function(a,b){
            var r = entity[b]
            return typeof r === 'string' ? r : a
        })
    }
}())

//console.log('&lt;&quot;&gt;'.deentityify())

var serial_maker = function(){

    var prefix = ''
    var seq = 0
    return {
        set_prefix: function(p){
            prefix = String(p)
        },
        set_seq: function(s){
            seq = s
        },
        gensym: function(){
            var result = prefix + seq
            seq += 1
            return result
        }
    }
}

var seqer = serial_maker()
seqer.set_prefix("huseet")
seqer.set_seq(23434)
var unique = seqer.gensym()

/*
* CASCADE
*/

// Some method do not have a return value. For Example, it is typical for methods that set
// or change the state of an object to return nothing. if we have those methods return this
// instead of undefined, we can enable cascades.

getElement('myBoxDiv') 
    .move(350,150)
    .width(100)
    .height(100)
    .color('red')
    .border('10px outset')
    .padding('4px')
    .appendText('Please stand by')

// Each of those methods returns the object, so the result of invocation can be used for
// the next invocation.

/*
* CURRY
*/

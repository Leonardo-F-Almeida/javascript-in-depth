/*
* OBJECT SPECIFIERS
*/

// It sometimes happens that a constructor is given a very large number of parameters,
// it can be more friendlier if we write the constructor to accept a single object specifier.
// The objects can now be listed in any order

/* EX:
var myObject = maker({
    first: f,
    last: l,
    middle: m,
    state: s,
    city: c
})*/

/*
* PROTOTYPAL
*/

// A new object can inherit the properties of an old object

var myMammal = {
    name: 'Herb the Mammal',
    get_name: function(){
        return this.name
    },
    says: function(){
        return this.saying || ''
    }
}

//Once we have the object that we like, we can make more instances with the Object.

var myCat = Object.create(myMammal)
myCat.name = 'Henry'
myCat.saying = 'meow'
myCat.get_name = function(){
    return this.says() + ' ' + this.name
}
console.log(myCat.get_name())
// Book 2: this & Object prototypes


#########################################################
// Ch 1: this or That?

* What the heck is the 'this' keyword in JS?

------------------------------------------------
-------------------Why this?--------------------
------------------------------------------------

---
// example code of why this

function identify() {
  return this.name.toUpperCase();
}

function speak() {
  var greeting = "Hello, I'm " + identify.call(this);
  print(greeting);
}

var me = {
  name: "Oliver"
};

var you = {
  name: "Reader"
};

identify.call(me);      // OLIVER
identify.call(you);     // READER

speak.call(me);         // Hello, I'm OLIVER
speak.call(you);        // Hello, I'm READER
---

* code allows 'identify()' and 'speak()' functions
    -> to be reused against multiple context objects (me and you)

------------------------------------------------
----------------this confusion------------------
------------------------------------------------

* this does NOT refer to the function itself

* this is NOT used to store state (values in properties)
      -> between function calls

* lets see how this does NOT get reference to calling function

---
// example code to show how this does not allow self-calling function

function foo(num) {
  print("foo: " + num);

  this.count++;
}

foo.count = 0;

for (var i=0; i<10; i++) {
  if (i > 5) {
    foo(i);
  }
}

print(foo.count);       // 0
---

* foo.count still = 0

* a '.count' property is being added
      -> but solely to 'this'

* the 'this.count' is not a pointer to the function

* remember: you can always do this cool thing...

---
// example code of importance of naming functions

function foo() {
  foo.count = 4;
}
---

* alternative to not using this keyword

---
// example code of avoiding this

function foo(num) {
  print("foo: " + num);
  foo.count++;
}

foo.count = 0;

for (var i=0; i<10; i++) {
  if (i > 5) {
    foo(i);
  }
}

print(foo.count);       // 4
---

* but above example sidesteps an understanding of this

* Lets embrace this -> force this to point at foo function...

---
// example code forcing this to point at foo function

function foo(num) {
  print("foo: " + num);
  this.count++;
}

foo.count = 0;

foo (var i=0; i<10; i++) {
  if (i > 5) {
    foo.call(foo, i);
  }
}

print(foo.count);       // 4
---

* call() ensures that we point at foo function itself

------------------------------------------------
--------------the Scope of this-----------------
------------------------------------------------

* this does not refer to the lexical scope of a function

* the following code shows how this is used to attempt
      -> to implicitly refer to the lexical scope of a function
      -> NOTE : does not work. this fails!

---
// example code of this failing to implicitly refer lexical scope of function

function foo() {
  var a = 2;
  this.bar();
}

function bar() {
  print(this.a);
}

foo();      // ReferenceError: a is not defined
---

* there is no bridge to lookup lexical scope with this

* you cannot access lexical scope of foo() from bar()

* you cannot access lexical scope of bar() from foo()

------------------------------------------------
---------------so what is this?-----------------
------------------------------------------------

* this is a runtime binding

* this has everything to do with how a function is called

* when a function is invoked, activation record (execution context)
      -> is created

* activation record tells us where function was called (call-stack)

* activation record also tells us how function was invoked

------------------------------------------------
---------------------Review---------------------
------------------------------------------------

* this is NOT a reference to a function

* this is NOT a reference to the lexical scope of a function

* this is a binding made when a function is invoked

* what this references is determined by call-site where function is called

#########################################################
// Ch 2: this all makes sense now!

* this is a binding made for each function invocation
      -> based entirely on call-site (how function is called)

------------------------------------------------
-------------------Call-Site--------------------
------------------------------------------------

* Call-Site = location in code where function is called

* to understand where a function is called from (call-site)

      -> usually need to understand the call-stack

* call-stack = stack of functions that have been called


---
// example code showing call-stack and call-site

function baz() {
  // call-stack = 'baz'
  print("baz");
  bar();    // call-site for 'bar'
}

function bar() {
  // call-stack = 'baz', 'bar'
  print("bar");
  foo();    // call-site for 'foo'
}

function foo() {
  // call-stack = 'baz', 'bar', 'foo'
  print("foo");
}

baz();      // call-site for 'baz'
---

* visualize a call-stack = stack functions as they are called

* also, use debugger tools in browser to see call-stack

* use 'debugger;'

------------------------------------------------
---------------Nothing but rules----------------
------------------------------------------------

// review

* call-site determines where this will point during execution

* call-site has 4 defining rules

----------------

* 4 rules at call-site

1. Default binding -> catch all rule

2. Implicit binding

3. Explicit binding

4. new binding

----------------
1. Default binding:

---
// example code of default binding

function foo() {
  print(this.a);
}

var a = 2;
foo();    // 2
---

* global scope var == global-object properties with same name

* global scope has 'a' and calls 'foo()'

* this within foo() referes to call-site = global scope

=> this is an example of default binding


NOTE -> could use 'strict mode' to prevent implicit passing...

---
// example code of strict mode anti-implicit

function foo() {
  "use strict";

  print(this.a);
}

var a = 2;

foo();      // TypeError: 'this' is 'undefined'
---

* however strict mode only effects implicit use of global scope

* strict mode does nothing within the actual foo() function...

---
// example code of strict mode irrelevance in foo() call

function foo() {
  print(this.a);
}

var a = 2;

(function() {
  "use strict";

  foo();        // 2
})();
---

* global space is non-strict, this a is in global-scope

* also, since global space is non-strict, foo() gets
      this == global scope (which has a)

----------------
2. Implicit binding:

* if call-site has context object

---
// example code of implicit binding -> context object

function foo() {
  print(this.a);
}

var obj = {
  a: 2,
  foo: foo
};

obj.foo();      // 2
---

* obj is an object with references to declaration of foo()

* obj also owns 'a'

* when line 'obj.foo()' is called it executes 'foo()'
      with object reference to obj

* object reference to obj with var and function references 'a' and 'foo()'

* foo() is executed from obj-scope

* so 'this.a' in foo == 'obj.a'

this is IMPLICIT BINDING!

* however, only last obect property in reference chain matters

---
// example code of object property chain

function foo() {
  print(this.a);
}

var obj2 = {
  a: 42,
  foo: foo
};

var obj1 = {
  a: 2,
  obj2: obj2
};

obj1.obj2.foo();      // 42 (not '2' from obj1)
---

* obj1 has implicit binding of 'a' and 'obj2' property references

* obj2 has implicit binding of 'a' and 'foo' property references


----------------
Implicitly lost:

* sometimes implicitly bound call-site can be lost

---
// example code of implicit bind being lost

function foo() {
  print(this.a);
}

var obj = {
  a: 2,
  foo: foo
};

var bar = obj.foo;

var a = "oopppss, global";

bar();        // "oopppss, global"
---

* call-site is what matters for binding and this

* bar() is the call-site, not obj

* so even though bar calls obj.foo...

* bar is call-site which has this == global

* this is a fallback to default binding

---
// example code of implicit loss with callbacks

function foo() {
  print(this.a);
}

function doFoo(fn) {
  // 'fn' is another reference to 'foo'
  fn();
}

var obj = {
  a: 2,
  foo: foo
};

var a = "oopppss, global";

doFoo(obj.foo);     // "oopppss, global"
---

* parameter passing is implicit assignment

* implicit assignment of function = implicit reference assignment

* same call-site / implicit binding lost for callbacks

---
// example code of implicit binding loss with callbacks

function foo() {
  print(this.a);
}
var obj = {
  a: 2,
  foo: foo
};

var a = "ooppsss, global";

setTimeout(obj.foo, 100);       // "oopppsss, global"
---

* setTimeout(func, var) is a function that is the call-site for
    its higher-order function

* since callback is call-site, and NOT context object...
      -> loses implicit binding

* can also force change this reference (what this points to)
      -> can 'fix' this by making this static


----------------
3. Explicit Binding:

* implicit binding = use obj to include reference to function
      -> which imdirectly (implicitly) binds this to object

* can also force a function call to use a particular object for this binding

* all JS functions have call(...) and apply(...)

* both call(...) and apply(...) are passed whatever object will be this
      as first parameters

---
// example code of how to use call() and apply()

function foo() {
  print(this.a);
}

var obj = {
  a: 2
};

foo.call(obj);      // 2
---

* call(obj) explicitly makes 'obj' the 'this' for foo() and then executes its

* but explicit binding can still suffer from intended 'this' binding

-----------
Hard binding:

* a variation pattern around explicit binding to avoid loss of intended this

---
// example code of hard binding

function foo() {
  print(this.a);
}

var obj = {
  a: 2
};

var bar = function() {
  foo.call(obj);
};

bar();                     // 2
setTimeout(bar, 100);      // 2

// hard-bound 'bar' can no longer have 'this' overridden

bar.call(window);         // 2
---

* bar() internally calls foo.call(obj);

* bar() is forcibly invoking foo with obj binding for this

* this binding is explicit and strong = hard binding

---
// example code of hard-binding to create a pass-thru for arguments

function foo(something) {
  print(this.a, something);
  return this.a + something;
}

var obj = {
  a: 2
};

var bar = function() {
  return foo.apply(obj, arguments);
};

var b = bar(3);   // 2 3
print(b);         // 5
---

* another way to express this hard-binding pass-thru pattern
      -> use helper function

---
// example code of hard-binding to create a pass-thru for args

function foo(something) {
  print(this.a, something);
  return this.a + something;
}

// simple 'bind' helper
function bind(fn, obj) {
  return function() {
    return fn.apply(obj, arguments);
  };
}

var obj = {
  a: 2
};

var bar = bind(foo, obj);

var b = bar(3);                 // 2 3
print(b);                       // 5
---

* use of helper function to hard-bind obj-scope as this to whatever fn

* this pattern is super common -> now built in!

* Function.prototype.bind = built in helper function = .bind()

---
// example code of built in helper bind function

function foo(something) {
  print(this.a, something);
  return this.a + something;
}

var obj = {
  a: 2
};

// bind(...) helper function
var bar = foo.bind(obj);  // obj = specified this for foo(...)

var b = bar(3);           // 2 3
print(b);                 // 5
---

* bind(...) returns a new function that is hardcoded
        -> to call original function w this context set as specified


----------------
API call "contexts":

* many libraries have a 'context' parameter

* context parameters designate this for function call
        -> just like using helper bind(...)

---
// example code of API context calls

function foo(el) {
  print(el, this.id);
}

var obj = {
  id: "awesome"
};

[1, 2, 3].forEach(foo, obj);
// give 'obj' as 'this' for 'foo(...)'
---


----------------
4. new Binding:

* 'new' keyword in object-oriented languages calls an instance of class
      -> this is a constructor
      -> constructor of class is called when new instance of class is initialized

* 'new' in JS...

* 'new' in JS has NO connection to class-oriented functionality

* in JS, constructors = function called with new operator in front

* constructors in JS are not attached to classes

* constructure in JS do not instantiate a class

* there is no "constructor function" in JS

* rather, JS has "constructor calls of functions"

---
// example code demonstrating the 'new' keyword

function foo(a) {
  this.a = a;
}

var bar = new foo(2);
print(bar.a);           // 2
---

* 'new foo(...)' = constructs new object
      -> and sets that new object as the 'this' for foo(...)

* so 'new' creates a new object that is the context for 'this'...

------------------------------------------------
--------------Everything in Order---------------
------------------------------------------------

* this binding happens in order

* default binding is the last one (lowest form of binding) = fallback

* which is more precedent: implicit bindind or explicit binding?

---
// example code showing precedence of implicit vs explicit binding

function foo() {
  print(this.a);
}

var obj1 = {
  a: 2,
  foo: foo
};

var obj2 = {
  a: 3,
  foo: foo
};

obj1.foo();             // 2
obj2.foo();             // 3

obj1.foo.call(obj2);    // 3
obj2.foo.call(obj1);    // 2
---

* explicit binding takes precedence over implicit binding

* so where does 'new Binding' come into this?

---
// example code showing precedence of new, explicit, and implicit

function foo(something) {
  this.a = something;
}

var obj1 = {
  foo: foo
};

var obj2 = {};

obj1.foo(2);

print(obj1.a);            // 2

obj1.foo.call(obj2, 3);
print(obj2.a);            // 3

var bar = new obj1.foo(4);
print(obj1.a);            // 2
print(bar.a);             // 4
---

*  What does the above tell us about precedence for binding?

------------------------------------------------
---------Review: Everything in Order------------
------------------------------------------------

* explicit binding takes precedence over implicit binding

* implicit: obj with a = 2; call foo() from obj and give 'a' reference

* explicit: use call() on foo() with obj as param

* new binding: more precedent than implicit

---
// example code showing binding precedence

function foo(something) {
  this.a = something;
}

var obj1 = {
  foo: foo
};

var obj2 = {};

// implicit binding
obj1.foo(2);

console.log(obj1.a);    // 2

// explicit -> use of FUNC.call(params)
obj1.foo.call(obj2, 3);
console.log(obj2.a);    // 3

// new binding
var bar = new obj1.foo(4);
console.log(obj1.a);    // 2  <- implicit (from before)
console.log(bar.a);     // 4  <- new took over implicit
---

...

* so hard-binding (explicit is a type of hard binding)
    -> would seem to have more precedence than new binding...

---
// example code comparing hard-binding (explicit) to new binding

function foo(something) {
  this.a = something;
}

var obj1 = {};

var bar = foo.bind(obj1);
bar(2);
console.log(obj1.a);          // 2

var baz = new bar(3);
console.log(obj1.a);          // 2
console.log(baz.a);           // 3
---

* bind(...) = hard-binding -> is explicit binding
    -> FUNCTION.prototype.bind(...) = creates wrapper function
        that ignores 'this' binding and manually sets a 'this'

* in above code...

* bar has reference to foo with this = obj1
    -> this is explicit = hard-binding

* then we pass bar the value '2'

* 2 is passed as the 'something' (and thus = a) for the foo reference
    -> which has this = obj1

* so obj1.a = 2

* baz = new object that wants to be = this

* but baz is a new object of bar, which has this = obj1

* even though bar had obj1 hard-bound as = this (explicit)...
    -> 'new' binding competes and wins

* baz.a = 3, instead of = 2 like you would expect with hard-binding


------------------------------------------------
---------------Determining this-----------------
------------------------------------------------

* summarize rules for determining this from a function call-site

1. Is function called with new? (NEW BINDING)

        var bar = new foo();

2. Is function called with call or apply? (EXPLICIT)

        var bar = foo.call(obj2);

3. Is function called with a context? (IMPLICIT)

        var bar = obj1.foo();

4. Else, default. (DEFAULT)

        var bar = foo();


------------------------------------------------
--------------Binding Exceptions----------------
------------------------------------------------

// IGNORE THIS

* passing call(...) with null == default binding

---
// example code with passing call() null

function foo() {
  console.log(this.a);
}

var a = 2;

foo.call(null);     // 2
---

* null provides us a way to not care about the this

* however, this could have horrible consequences with third-party libraries


// SAFER THIS

* creating empty, nondelegated objects = DMZ
    -> de-militarized zone

* DMZ object can be given any this we dont care about
    -> that way there is no danger with this referencing global or something

* we can use opt+o to create the ø variable name
    -> ø = mathematical symbol for empty set

* Although we can create an empty object with:
      var obj = {};

        -> the {} delegate obj as Object.prototype

* Object.create(null) -> creates an empty object that is not delegated

---
// example code on making a completely empty object & non-delegated

function foo(a,b) {
  console.log("a:" + a + ", b:" + b);
}

// our DMZ empty object
var ø = Object.create(null);

// spreading out array as parameter
foo.apply(ø, [2,3]);

// currying with 'bind(...)'
var bar = foo.bind(ø, 2);
bar(3);
---


// INDIRECTION

* indirect references to function = default binding applies

---
// example code of indirect reference to function

function foo() {
  print(this.a);
}

var a = 2;
var o = {a: 3, foo: foo};
var p = {a: 4};

o.foo();              // 3
(p.foo = o.foo)();    // 2
---


// SOFTENING BINDING

* hard binding prevents fallback to default binding
    -> by forcing binding to specific this

NOTE -> new keyword is the only way to override hard binding!

* but hard binding is not flexible...
    -> prevents manual this override with either implicit binding
          or subsequent explicit binding

* soft binding utility emulates a way to have alternative default binding
    -> but still leaves function able to be
    implicitly or explicitly this bound

---
// example code of soft binding utility

if (!Function.prototype.softBind) {

    Function.prototype.softBind = function(obj) {

        // going to check the current 'this'
        var fn = this;
        // contains all arguments except first one ...
        var curried = [].slice.call(arguments, 1);
        // however, it is not good to slice on argument!
        var bound = function bound() {
            return fn.apply((!this ||
                        (typeof window !== "undefined" &&
                          this === window) ||
                        (typeof global !== "undefined" &&
                          this === global))
                        ? obj : this,
                        curried.concat.apply(curried, arguments));
                  };
            };
        bound.prototype = Object.create(fn.prototype);
        return bound;
    };
}
---

MANY NOTES HERE
* arguments = local var to every function

* arguments var is NOT array

* to convert arguments into an array...

      var args = Array.prototype.slice.call(arguments);

* slice on arguments prevents optimization...workaround?
    -> workaround is to loop through arguments (for it bb)

------------------------------------------------
---------Review: Binding Exceptions-------------
------------------------------------------------

Use of null:
  * apply() used for spreading out arrays of values as parameters
      to function call
  * bind() can curry parameters

  -> apply() and bind() require a this binding as first parameter

  -> functions using apply() and bind() may not care about this
      - so placeholder is needed...thus, null

dangers with null:
  * apply() and bind() with function call that makes a this reference
      -> (like a 3rd party library)
      -> may reference or mutate global object

safer this (than null):
  * var ø = Object.create(null);
      -> nothing object that will never be global

indirection:
  * indirect references to function calls use default binding

softening binding:
  * hard binding prevents function call to use default binding
      -> force bind this
      -> hard binding only overridden by 'new' keyword
  * but: hard binding reduces flexibility of a function
      -> prevents this override with implicit binding
          or subsequent hard binding

soft binding:
  * different default binding (not global or undefined)
  * but function can still be manually this-bound via implicit or explicit

  ---
  // example code of soft binding utility

  if (!Function.prototype.softBind) {

      Function.prototype.softBind = function(obj) {

          // going to check the current 'this'
          var fn = this;
          // contains all arguments except first one ...
          var curried = [].slice.call(arguments, 1);
          // however, it is not good to slice on argument!
          var bound = function bound() {
              return fn.apply((!this ||
                          (typeof window !== "undefined" &&
                            this === window) ||
                          (typeof global !== "undefined" &&
                            this === global))
                          ? obj : this,
                          curried.concat.apply(curried, arguments));
                    };
              };
          bound.prototype = Object.create(fn.prototype);
          return bound;
      };
  }
  ---

  * if this of function at call-time is global or undefined
      -> apply() is handed 'this' as first parameter
  * else if this of function at call-time is NOT global / undefined
      -> apply() is handed 'obj' as first parameter

------------------------------------------------
-----------------Lexical this-------------------
------------------------------------------------

ES6 introduced the arrow-function

* arrow-function =>
    -> adopt this from enclosing scope (function or global)

---
// example code of how fat arrow works

function foo() {
  // return an arrow function
  return (a) => {
    // 'this' here is lexically inherited from 'foo()'
    console.log(this.a);
  };
}

var obj1 = {
  a: 2
};

var obj2 = {
  a: 3
};

var bar = foo.call(obj1);
bar.call(obj2);   // 2, not 3!
---

* arrow-function scope cannot be overriden
    -> even with 'new' !

* common use cases with arrow-function == call backs

---
// example code of using arrow-function

function foo() {
  setTimeout(() => {
    // this = lexically inherited from foo()
    console.log(this.a);
  }, 100);
}

var obj = {
  a: 2
};

foo.call(obj);
---

* arrow-function can provide alternative to bind() on function to ensure this

    -> but arrow-function is sort of avoiding this in favor of lexical scoping

* there is a non arrow-function way to do the same thing...

---
// example code of non-arrow-function way to do same thing

function foo() {
  var self = this;  // lexical capture of this
  setTimeout(function() {
    console.log(self.a);
  }, 100);
}

var obj = {
  a: 2
};

foo.call(obj);    // 2
---

* 'self = this' and arrow-function
      -> both avoid bind() / avoid this scoping in favor of lexical scoping

* can use lexical scoping or this scoping...
      -> probably not good to mix and use both

------------------------------------------------
---------------------Review---------------------
------------------------------------------------

Determining this requires finding direct call-site

Four rules applied at call-site:

1. Called with new? use new constructed object

2. Called with call() or apply() or bind()? Explicit binding

3. Called with context object owning the call? this = context object

4. Default: undefined in strict mode, global object otherwise

  * to safely ignore this, use: var ø = Object.create(null);

  * a 5. rule = arrow-function
      -> gets scope from enclosing function call

#########################################################
// Ch 3: Objects

------------------------------------------------
---------------------Syntax---------------------
------------------------------------------------

Two forms of objects

1. Declarative (literal)

    var myObj = {
      key: value
    };

2. Constructed

    var myObj = new Object();
    myObj.key = value;

------------------------------------------------
----------------------Type----------------------
------------------------------------------------

Six primary language types of JS:

1. string
2. number
3. boolean
4. null
5. undefined
6. object

= six simple primitives

* Complex primitives = few special object subtypes
    -> function = subtype of object (callable object)

// Built-in Objects

Various object subtypes:

  - String
  - Number
  - Boolean
  - Object
  - Function
  - Array
  - Date
  - RegExp
  - Error

* these are all built-in functions
    -> not actual types

------------------------------------------------
------------------Review: Type------------------
------------------------------------------------

A few types in JS...

// Simple primitives
  * few types of simple primities in JS
    1. string
    2. boolean
    3. number
    4. null
    5. undefined

    NOTE -> null is sometimes incorrectly referred to as object
        because: > typeof null = object
            - however, this is a mistake on the side of the language

  * misconception: "everything in JS = object"
    -> not true; e.g. string / boolean / number / null / undefined != object

// Complex primities
  * few special object subtypes called complex primitives

  * function -> subtype of object (a callable object)
      -> functions in JS == first class
          i.e. normal objects w callable behavior

  * arrays -> subtype of object (w extra behavior)

// Built-in objects
  * built-in object = collection of complex primitives (i.e. object subtypes)

  * some share names with simple primitives...
      -> however, their relationship is more complicated

  * few types of built-in objects in JS
  1. String
  2. Number
  3. Boolean
  4. Object
  5. Function
  6. Array
  7. Date
  8. RegExp
  9. Error

  * these built-in objects have appearance of being actual types
      -> similar to classes

      -> however, simply built-in functions

  * each built-in function (since function = callable object)
      -> can be used with new constructor

  ---
  // example code of how to use built-in objects as new constructors

  /* without new constructor */
  var strPrimitive = "I am a string";
  typeof strPrimitive;                      // "string"
  strPrimitive instanceof String;           // false

  /* so strPrimitive = string (simple primitive)...
      but strPrimitive != String (built-in object) */

  var strObject = new String("I am a String");
  typeof strObject;                         // "object"
  strObject instanceof String;              // true

  /* strObject is not a string (simple primitive)...
      but it is a String (built-in object)...
        can be treated as an object */

  /* inspect the object sub-type */
  Object.prototype.toString.call(strObject);      // [object String]
  ---

* strPrimitive = "I am a string"
    -> this is not an object...
    -> is a primtitive literal (simple primitive)
    -> and is immutable value

* using strObject (built-in type == object)
    -> allows operations to be performed on string
    -> e.g. checking length, accessing individual character contents

NOTE -> how come you can access a primitive literal like an object though?

Example:

      ---
      // example code of using a primitive literal like an object

      var strPrimitive = "I am a string";

      /* is a string primitive (literal) */
      typeof strPrimitive;      // 'string'

      /* but using object operations on it? */
      strPrimitive.length;      // 13
      str.Primitive[3];         // 'm'

      /* still a string primitive (literal) */
      typeof strPrimitive;      // 'string'
      ---

      * JS does a super freaky thing here!

      * JS will automatically coerce the string primitive
          into an object when necessary

      * the JS engine does the automatic coercion

* all of these built-in objects are really object wrappers...

* null and undefined only have their primitive values (no object wrappers)

* Date only has object form, no literal counterpart

* Object, Array, Function, and RegExp = objects
    -> regardless of literal vs constructed forms used


------------------------------------------------
--------------------Contents--------------------
------------------------------------------------

* contents of object = values stored at specific locations (i.e. properties)

* however, contents is an illusion...

    -> engine stores in implementation-dependent ways
        * not necessarily in object container

    -> but, engine DOES store property names
        * property names = pseudo-pointers (i.e. references)
            to where values are stored

---
// example code showing how engine stores property names as references

var myObject = {
  a: 2
};

myObject.a;       // 2
myObject["a"];    // 2
---

* 'a' is a reference to a value
    -> this reference is stored in the object, not the actual value

* '.a' = property access

* '["a"]' = key access

NOTE -> property names in objects are always string literals
    * will be converted to string literals if you do not give it one

// Computed Property Names

* new feature in ES6...

- - - - - - - - - - - - - - - - - - - - -
        ---
        // example code showing Computed Property Names

        var prefix = "foo";

        var myObject = {
          [prefix + "bar"]: "hello",
          [prefix + "baz"]: "world"
        };

        myObject["foobar"];       // hello
        myObject["foobaz"];       // world
        ---
- - - - - - - - - - - - - - - - - - - - -

// Property Versus Method

* in many languages, certain functions can belong to certain objects
    -> this would be methods of a class

* however, in JS, functions never belong to objects

* so a "property access" != "method access"
    -> because the object in question does not 'own' any functions (i.e. methods)

- - - - - - - - - - - - - - - - - - - - -
        ---
        // example code demonstrating non-method status of functions in objects

        function foo() {
          console.log("foo");
        }

        var someFoo = foo;      // var reference to 'foo'

        var myObject = {
          someFoo: foo
        };

        foo;                    // function foo() {...}

        someFoo;                // function foo() {...}

        myObject.someFoo;       // function foo() {...}
        ---
- - - - - - - - - - - - - - - - - - - - -

* it appears that myObject (object) has function (i.e. method) called foo
    -> but then foo is a function that occurs independent of myObject
        so...can not be 'owned' by object

* 'someFoo' and 'myObject.someFoo' are two separate references to same function

* so "function" == "method" in JS

          * even declaring a function expression as part of object literal
              -> does not make function belong to the object
- - - - - - - - - - - - - - - - - - - - -
          ---
          // example code showing how object literal does not 'own' function

          var myObject = {
            foo: function foo() {
              console.log("foo");
            }
          };

          var someFoo = myObject.foo;

          someFoo;          // function foo() {...}

          myObject.foo;     // function foo() {...}
          ---
- - - - - - - - - - - - - - - - - - - - -
          * two separate references to the same function...
              -> one in object
              -> one in global scope

          * two different references to the same value ( = foo() {...})

// Arrays

* Arrays are objects with [] access form used
    -> but assume numeric indexing

* bc numeric indexing = values are stored in locations called indices
- - - - - - - - - - - - - - - - - - - - -
      ---
      // example code showing how arrays work

      var myArray = ["foo", 42, "bar"];

      myArray.length;             // 3

      myArray[0];                 // "foo"

      myArray[2];                 // "bar"
      ---
- - - - - - - - - - - - - - - - - - - - -
* since Arrays in JS = objects...

    -> can add properties onto the array

- - - - - - - - - - - - - - - - - - - - -
      ---
      // example code showing how to add properties onto an array object

      var myArray = ["foo", 42, "bar"];

      myArray.baz = "baz";

      myArray.length;       // 3

      myArray.baz;          // "baz"
      ---

      * adding the named property did NOT change length of array

    -> however, if adding a property to an array that is a number...

      ---
      // example code showing adding a number as a property to an array

      var myArray = ["foo", 42, "bar"];

      myArray["3"] = "baz";

      myArray.length;     // 4

      myArray[3];         // "baz"
      ---
- - - - - - - - - - - - - - - - - - - - -

// quick review before deplicating object section....

Review of Ch. 2 'this all makes sense now :)'

  * to determine value of this...
      1- was call-site called with new?
            if so, use newly constructed object as this
      2- was call-site called with call() or apply() or bind()?
            if so, use specified object in those functions (explicit)
      3- was call-site called with a context object owning the call?
            if so, context object is this (implicit)
      4- none of the above?
            if so, default => undefined in strict mode, global otherwise

  * Caution with invoking default binding...
      -> if / when accidenttally invoked can switch to global scope

  * use of blank objects for null (to avoid accidenttally defaul binding)
      var ø = Object.create(null);
        -> empty / blank object with empty scope

Review of Ch. 3 (so far) 'Objects':

  * JS does not have methods...

  * objects do not own a method...

  * all 'methods' within an object are really just references
  that can also be invoked / called outside of that object ^__^ wow!

// deplicating objects

How do you duplicate an entire object in JS?

Well - what exactly should be duplicated?

- - - - - - - - - - - - - - - - - - - - -
            ---
            // example code showing failures in copying an object

            function anotherFunction() {...}

            var anotherObject = {
              c: true
            };

            var anotherArray = [];

            var myObject = {
              a: 2,
              b: anotherObject,       // reference (not copy)
              c: anotherArray,        // reference (not copy)
              d: anotherFunction      // reference (not copy)
            };

            anotherArray.push(anotherObject, myObject);
            ---

- - - - - - - - - - - - - - - - - - - - -
* shallow vs deep copy?
    -> shallow:
        * would copy value of 'a'
        * would copy over references to 'b', 'c', 'd'

    -> deep:
        * would duplicate myObject AND anotherObject and anotherArray
        ...BUT !
            -> then anotherArray has references to anotherObject and myObject
                  * so they should be duplicated rather than referenced...
                      BUT -> we have circular references and it keeps going

        * ^^^ this makes a true deep copy in JS nearly impossible

// Shallow Copy of Object with ES6

New object property to shallow copy in ES6

 -> Object.assign(...)

- - - - - - - - - - - - - - - - - - - - -
          ---
          // example code using new Object.assign(...) property

          function anotherFunction() {...}

          var anotherObject = {
            c: true
          };

          var anotherArray = [];

          var myObject = {
            a: 2,
            b: anotherObject,               // reference
            c: anotherArray,                // reference
            d: anotherFunction              // reference
          };

          var newObj = Object.assign({}, myObject);

          newObj.a;                         // 2 -> copy
          newObj.b === anotherObject;       // true -> same refernece
          newObj.c === anotherArray;        // true -> same reference
          newObj.d === anotherFunction;     // true -> same reference
          ---
- - - - - - - - - - - - - - - - - - - - -

// Property Descriptors

All properties are described in terms of property descriptor

* ex. distinction between charactersitics of properties
    may be read-only or not
- - - - - - - - - - - - - - - - - - - - -
          ---
          // example code showing property descriptors

          var myObject = {
            a: 2
          };

          Object.getOwnPropertyDescriptor(myObject, "a");
          ---

          Output:
            * value: 2 ,
            * writable: true,
            * enumerable: true,
            * configurable: true

- - - - - - - - - - - - - - - - - - - - -
property descriptor = data descriptor

* object has property 'a'

* 'a' has 'value', 'writable', 'enumerable', and 'configurable' descriptors

* can add or modify existing properties

- - - - - - - - - - - - - - - - - - - - -
          ---
          // example code showing adding / modifying property descriptors

          var myObject = {};

          Object.defineProperty(myObject, "a", {
            value: 2,
            writable: true,
            configurable: true,
            enumerable: true
          });

          myObject.a;   // 2
          ---
- - - - - - - - - - - - - - - - - - - - -

* ^ example of how to explicitly add / modify property of myObject

// Writable

* can prevent value from being re-wrote

* ex. if 'writable: false,' than cannot change 'value: 2'

// Configurable

* if property is configurable...
    -> can modify descriptor definition

- - - - - - - - - - - - - - - - - - - - -
              ---
              // example code showing using configurable descriptors

              var myObject = {
                a: 2
              };

              myObject.a = 3;
              myObject.a;           // 3

              Object.defineProperty(myObject, "a", {
                value: 4,
                writable: true,
                configurable: false,
                enumerable: true
              });

              myObject.a;          // 4
              myObject.a = 5;
              myObject.a;          // 5

              Object.defineProperty(myObject, "a", {
                value: 6,
                writable: true,
                configurable: true,
                enumerable: true
              });       // TypeError
              ---

      * since 'configurable: false' cannot change any properties of object

      * setting 'configurable' to 'false' is a one-way action!
- - - - - - - - - - - - - - - - - - - - -

if configurable = false...
    -> cannot use 'delete' to remove existing property

* delete
    -> removes object properties directly
    -> if object being deleted on is last reference to object/function...
        * then deleting removes reference (last reference since last object)
        * now unreferenced object/function can be garbage-collected

    -> but, delete is not tool to free up allocated memory (like in C)
        * delete is just object property removal
            ...except it will free up mem indirectly (if delete last reference)

// Enumerable

* if set to false, property will not show up in enumerations (like for loops)
    -> property can be accessed and used normally other than enumerations

// Immutability

How to prevent property / object from being able to be changed?

* all following immutability methods are shallow
    -> only affect direct object, not references etc

    myImmutableObject.foo;      // [1,2,3]
    myImmutableObject.foo.push(4);
    myImmutableObject.foo;      // [1,2,3,4]

* methods to make property immutable:
    1. Object Constant
    2. Prevent extensions
    3. Seal
    4. Freeze

    /* 1. Object Constant */

    - if 'writable' and 'configurable' == false...
        -> property cannot be changed, redefined, or deleted

- - - - - - - - - - - - - - - - - - - - -
              ---
              // example code of immutable property

              var myObject = {};

              Object.defineProperty(myObject, "FAVORITE_NUMBER", {
                value: 42,
                writable: false,
                configurable: false
              });
              ---
- - - - - - - - - - - - - - - - - - - - -

    /* 2. Prevent extensions */

    - prevent object from having new properties added to it:

    Object.preventExtensions(myObject);

    /* 3. Seal */

    - will seal an object, prevents extensions and sets 'configurable' to false

    Object.seal(...)

    - cannot add properties. Cannot reconfigure or delete properties.
    - YOU CAN STILL MODIFY VALUES

    /* 4. Freeze */

    - similar to Object.seal(...) but also sets "writable" to false

    Object.freeze(...)

    - highest level of immutability!
        * prevents any change to object itself
        * prevents any change to properties of object

// [[Get]]

* subtle but important detail about how property accesses are performed

- - - - - - - - - - - - - - - - - - - - -
                ---
                // example code showing how [[Get]] works

                var myObject = {
                  a: 2
                };

                myObject.a;         // 2
                ---

                * 'myObject.a' = property access
                    -> will perform a [[Get]] operation on 'myObject'

                * if 'a' is found, returns value of 'a'

                * if 'a' is NOT found...
                    -> will return value 'undefined'
- - - - - - - - - - - - - - - - - - - - -

* so if a property access occurs on a property an object does not have...
      -> will return 'undefined' instead of 'ReferenceError'

* NOTE -> can set a property 'a' to 'undefined'
      -> then can use property access on 'a' and 'b' ('b' is not a property)

      [[Get]] will return 'undefined' for both 'a' and 'b'
            * even though 'a' is there
            * even though 'b' is not there

// [[Put]]

* change in behabior of [[Put]] based on several factors...
      MOST IMPORTANT -> whether or not property is within object

* if property is present in object...[[Put]] will check:
      1. is property accesor descriptor? If so, call setter...
      2. is property data descriptor with 'writable: false'?
          If so, throw TypeError
      3. Otherwise, set value to existing property as normal


// Getters and Setters

* the default [[Put]] and [[Get]] completely control how values are
    set to existing or new properties (or retrieved from existing properties)

* Getters and Setters provide a property-specific way to override
    [[Put]] and [[Get]]

* if / when define a property to have either a getter or setter...
      -> becomes an 'accessor descriptor' (as opposed to 'data descriptor')

      * accessor descriptor
          -> 'value' and 'writable' are ignored
          -> instead, JS uses 'set' and 'get'

- - - - - - - - - - - - - - - - - - - - -
                ---
                // example code showing use of accessor descriptors

                var myObject = {
                    // define getter for 'a'
                    get a() {
                        return 2;
                    }
                };

                Object.defineProperty(
                    myObject,             // target
                    "b",                  // property name
                    {
                        // define getter for 'b'
                        get: function() { return this.a * 2; },
                        // make sure 'b' shows up as object property
                        enumerable: true
                    }
                );

                myObject.a;               // 2
                myObject.b;               // 4
                ---

                * properties 'a' and 'b' do not hold values
                      -> instead, properties are direct calls to function

                * but properties that are accessor descriptors
                      should also have 'setters'

                * 'Get' ~ [[Get]]
                * 'Set' ~ [[Put]]

                ---
                // example code showing use of set and get (accessor descriptors)

                var myObject = {
                    // define getter for 'a'
                    get a() {
                        return this._a_;
                    },

                    // define setter for 'a'
                    set a(val) {
                        this._a_ = val * 2;
                    }
                };

                myObject.a = 2;

                myObject.a;         // 4
                ---

                * use of '_a_' is purely convention

                * we are storing 'a' into another property called '_a_'
                      -> nothing else happening here...

                      -> nothing magical with 'this._a_'
                            * this referes to the caller (myObject)
                              and storing 'a' (accessor descriptor) into '_a_'
- - - - - - - - - - - - - - - - - - - - -

// Existence

If 'myObject' has property 'a: undefined' and no property 'b'...

  * myObject.a    ==    undefined
  * myObject.b    ==    undefined

  -> how to distinguish from these two undefined properties??

- - - - - - - - - - - - - - - - - - - - -
                ---
                // example code showing existance checking

                var myObject = {
                    a: 2
                };

                ("a" in myObject);              // true
                ("b" in myObject);              // false

                myObject.hasOwnProperty("a");   // true
                myObject.hasOwnProperty("b");   // false
                ---

                * 'in' checks property of object
                    AND higher level of [[Prototype]] chain object traversal

                * 'hasOwnProperty(...)' checks ONLY properties of object
- - - - - - - - - - - - - - - - - - - - -

      * lets examine enumerable property descriptor characters
          in closer detail

- - - - - - - - - - - - - - - - - - - - -
                ---
                // example code examining enumerable property in closer detail

                var myObject = {};

                Object.defineProperty(
                    myObject,
                    "a",
                    {enumerable: true, value: 2}
                );

                Object.defineProperty(
                    myObject,
                    "b",
                    {enumerable: false, value: 3}
                );

                myObject.b;                     // 3
                ("b" in myObject);              // true
                myObject.hasOwnProperty("b");   // true

                for (var k in myObject) {
                    console.log(k, myObject[k]);
                }
                // "a" 2
                ---

                * "b" is "enumerable: false"
                    -> is a property of 'myObject'
                    -> but will not show up in for loops

                * another example of enumerable and noneumerable properties...

                ---
                // example code distinguishing enumerable from nonenumerable

                var myObject = {};

                Object.defineProperty(
                    myObject,
                    "a",
                    {enumerable: true, value: 2}
                );

                Object.defineProperty(
                    myObject,
                    "b",
                    {enumerable: false, value: 3}
                );

                myObject.propertyIsEnumerable("a");   // true
                myObject.propertyIsEnumerable("b");   // false

                Object.keys(myObject);                // ["a"]
                Object.getOwnPropertyNames(myObject); // ["a", "b"]
                ---
- - - - - - - - - - - - - - - - - - - - -

------------------------------------------------
--------------------Iteration-------------------
------------------------------------------------

for...in loop iterates over the list of enumerable properties of an object...
    -> including the [[Prototype]] chain

How to iterate over values?

ANSWER -> for...of

- - - - - - - - - - - - - - - - - - - - -
                ---
                // example code of using for...of

                var myArray = [1, 2, 3];

                for (var v of myArray) {
                    console.log(v);
                }
                // 1
                // 2
                // 3
                ---

                * for...of uses the built-in @@iterator...

                ---
                // example code showing how @@iterator works

                var myArray = [1, 2, 3];
                var it = myArray[Symbol.iterator]();

                it.next();      // {value: 1, done: false}
                it.next();      // {value: 2, done: false}
                it.next();      // {value: 3, done: false}
                it.next();      // {done: true}
                ---

                * we get @@iterator (an internal property) of an object
                  by using 'Symbol.iterator'

                * @@iterator -> function that returns the iterator object

                * none arrays do NOT have @@iterator...

                Build your own @@iterator for non-arrays!

                ---
                // example code of non-array @@iterator

                var myObject = {
                    a: 2,
                    b: 3
                };

                Object.defineProperty(myObject, Symbol.iterator, {
                    enumerable: false,
                    writable: false,
                    configurable: true,
                    value: function() {
                        var o = this;
                        var idx = 0;
                        var ks = Object.keys(o);
                        return {
                            next: function () {
                                return {
                                    value: o[ks[idx++]],
                                    done: (idx > ks.length)
                                };
                            }
                        };
                    }
                });

                // iterate 'myObject' manually
                var it = myObject[Symbol.iterator]();
                it.next();      // {value: 2, done: false}
                it.next();      // {value: 3, done: false}
                it.next();      // {value: undefined, done: true}

                // iterate 'myObject' with 'for...of'
                for (var v of myObject) {
                    console.log(v);
                }
                // 2
                // 3
                ---
- - - - - - - - - - - - - - - - - - - - -

------------------------------------------------
------------------Ch 3: Review------------------
------------------------------------------------

* Objects in JS can be created using a literal form or constructed form

      1. literal form
          var a = {...}
      2. constructed form
          var a = new Array(...)

* not everything in JS is an object...Objects are 1 of 6 primitive types

      -> objects have subtypes:
          * including function, Array, etc

* Objects = key / value pairs

      -> values access as properties two ways
          1. myObject.propName
          2. myObject["propName"]

* Accessing properties occurs through [[Get]] and [[Put]]

      -> [[Get]] and [[Put]] look for property and traverse [[Prototype]] chain

* Properties have descriptors

      -> 'writable', 'configurable', 'enumerable'

* Accessor properties: are not values, rather functions

      -> use of getters / setters creates accessor properties

* for...of -> advances through data values one at a time (not indices)

#########################################################

// Review Ch 3 again before heading into Ch 4.

* Objects in JS have literal form and constructed form
    literal form of objects: var a = {...}
    constructed form of objects: var a = new Array(...)

* not everything in JS is object
    -> objects are 1 of 6 primitive types

* Function and Array => special subtypes of objects

* Objects are collections of key/value pairs
    -> values can accessed as properties

* [[Get]] operation is ran by engine everytime property is accessed
        -> look for property in Object and traverse [[Prototype]] chain
* [[Put]] operation is ran by engine everytime property is set (setting values)

* Properties (again, value within key/value of Object)
    -> controlled through property descriptors
        * writable
        * configurable
    -> Object mutability can be modified
        * Object.preventExtensions(...)
        * Object.seal(...)
        * Object.freeze(...)

* Properties (again, again, value within key/value of Object)
    -> can actually be accessor properties
        * getter / setter
            -> set accessor properties values
            -> so, value is actually point to accessor property

- - - - - - - - - - - - - - - - - - - - -

                ---
                // example code reviewing getters/setters
                var myObject = {
                    // define getter for 'a'
                    get a() {
                        return this._a_;
                    },

                    // define setter for 'a'
                    set a(val) {
                        this._a_ = val * 2;
                    }
                };

                myObject.a = 2;

                myObject.a;         // 4
                ---

                * '_a_' name is purely convention
                    -> no different than 'a' or 'foo' or '_foo_'

- - - - - - - - - - - - - - - - - - - - -


#########################################################
// Ch 4: Mixing (up) "Class" Objects

* Object-oriented programming
    -> the object system in JS does not necessarily
        map well until OO

------------------------------------------------
------------------Class Theory------------------
------------------------------------------------

Class / inheritance = specific form of code organization / architecture

* OO / class-oriented programming
    -> data has associated behavior
    -> encapsulate (package up) data + behavior
            == data structures

* Ex of encapsulationkey:
    -> data = string
    -> behavior = calc length, append, etc

    thus, behaviors are all methods of String class
    -> ever string is instance of String class

Classes are used to classify data structures:

* a car = implementation of class vehicle

* model real-world relationship of a car being an example of a vehicle
    -> Vehicle class and Car class

    Vehicle class:
        * behavior
            -> propulsion (engine types)
            -> ability to carry people
    Car class:
        * inherits base definition of Vehicle
        * behavior
            -> ...

    => classes, inheritance, and instantiation from Vehicle + Car example

* polymorphism
    -> general behavior from parent class can be overridden
        in a child class to give it more specifics

// JavaScript "Classes"

* JS does NOT have classes

* JS has class-like syntax but not a true class architecture

------------------------------------------------
-----------------Class Mechanics----------------
------------------------------------------------

Most Class-oriented languages have a 'stack' data structure
    -> push, pop, etc

* Stack class has internal vars to store data
    and publicly accessible methods (behavior) to access

    -> But, Stack class is an abstract explanation
            ...not an actual stack

// Polymorphism

Car is an instance of Vehicle class
    -> Car can override Vehicle method with its own
    BUT Car can still reference parent (Vehicle) method

Polymorphism is Car having its own overridden version of a method
    and also being able to call the parent method

Polymorphism is a crucial part of the inheritance hierarchy
    => any method can reference another method
        at a higher level of the inheritance hierarchy

Class inheritance implies copies...
    => relative polymorphism / accessing parent class methods
        does NOT imply a link...only a copy!

// Multiple Inheritance

* In some OO languages instance can inherit from multiple classes

If classes B and C are inherited from A,
    but B and C each have different overrides of
    a method from A (polymorphism)
        and then class D is inherited from B and C...

    Does D have method from B or C?

JS does NOT have multiple inheritance / any inheritance

------------------------------------------------
-------------------- Mixins --------------------
------------------------------------------------

*** RECAP
    * Polymorphism is when a child inherits a set of methods from parent
        -> but, child overrides method
        * child can use overridden method (local) or reference parent method

    * Class inheritance implies copies...
        -> JS on the other hand, has objects that are linked (not copied)
*** *** *** ***

no classes in JS, only objects

* objects are not copied, they are linked together

// Explicit Mixins





#########################################################
THE END
#########################################################
THE END
#########################################################

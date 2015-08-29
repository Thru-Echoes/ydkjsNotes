/*# 9May start - You Don't Know JS series
#
# Goal: need to do 30 mins of book + code a day
# ==== become a JS master!

1. Up and Going
2. Scope and Closures
3. this & Object Prototypes
4. Types & Grammar
5. Asyn & Performance
*/
//#######################################################
/* Day 1: books 1 + 2

    if a function has var and function inside
    with another var, inside function has scope
    of both variables

    Balloon within a balloon analogy:
    -outer balloon only has access to air inside
    that isn't in the inner balloon
    -inner balloon has access to air between it
    and outside PLUS its own inner air

    Each balloon is a function and
    the air = scripts & vars

    This is an analogy of scope!
*/

// Exercises:

// 1. buy phones until you run out of money!

const TAX = 0.06;

// wallet constructor
function Wallet(amount) = {
  this.amount = amount;
};

function Phone(price) {
  this.price = price;
};

function finalPrice(amt) {
  amt = amt + (amt * TAX);
  return amt;
}

function buyPhones(wallet, phones) {

  var myPhones = [];
  var minPhone = Math.min(phones.price);

  while (wallet.amount > minPhone) {

    wallet.amount -= minPhone;

  };
};

var priceTag = [50, 100, 200];

var phone1 = new Phone(priceTag[0]);
var phone2 = new Phone(priceTag[1]);
var phone3 = new Phone(priceTag[2]);

var phones = [phone1, phone2, phone3];


/*------------------------------------------*/

// Long-standing bug in JS
var a = null;
typeof a;   // returns "object" ... should be 'null'

/*----------*/

var obj = {
  a: "Hello World",
  b: 42
};

var b = "a";

obj.b;    // 42
obj[b];   // "Hello World"
obj["b"]; // 42

#######################################################
/* Day 2: books 1 + 2

    Remember: scope of vars within functions
    can be understood as balloon inside of a balloon...

    outer balloon only has access to the air inside
    before the innner balloon. Inner has access
    to the air inside and out (betwen it and outer)
    = air = variables / scope
*/

/* Coercion:
    + Explicit - can tell conversion is happening in code

    + Implicit - a non obvious conversion of type

    Equality:
    == checks value
    === checks value AND type

    but! Really...
    == checks value with coercion allowed
    === checks value without coercion

    == 'equality'
    === 'strict equality'
*/

var a = 41;
var b = "42";
var c = "43";

a < b;    // true
b < c;    // true

/* inequalities:
  + if both strings (b and c) then alphabetical
  + if one string (b) and one number (a)
      then converted to numeric and compared...

  These conversions = coersions = implicit coersions
  + JS will automatically convert the string to
  a number (implicit coercion) and compare the numbers


However, unlike checking if equal (== or ===)
there are no 'strict inequality' checks
*/

var a = 42;
var b = "foo";

a < b;    // false
a > b;    // false
a == b;   // false

/*
For '<' and '>':
  + b is coerced into NaN number!

but what about '==' ??
  + could fail if '42 == NaN' or "42"=="foo"
However, it does the former
      => 42 == NaN

*/

/*------------------------------------------*/

/* Function Scopes-

  Hoisting:
    + declaration of var belongs to Scope
    + this could mean a function or standard var

    -> so a var can be declared after it is used...
    has to do with compiling

    SUPER IMPORTANT!
    JS has function-level scope
    C family has block-level scope

    so, in C (and C family) an if statement will have Scope
    and vars called outside will not interfer within block

    But, in JS only a function has seperate Scope
    so vars declared and initialized within an if
    statement will flow afterwards (not contained)
*/

/* temporary scopes within a function
  -> this provides a work around for function-based scoping
  */

/*------------------------------------------*/
// Quick break from book -> adequatelygood.com/JavaScript-Scoping-and-Hoisting.html

function foo() {

  var x = 1;

  if (x) {
    (function () {
      var x = 2;
      // some other code
    }());
  }

  // x is still 1
}


/*
four ways to enter scope:
1. language-defined: this keyword
2. formal parameters: functs can have named formal params
3. function declaration: function foo() {};
4. var declaration: var foo;

3. and 4. are always moved (hoisted) to top of Scope
when compiled...
*/

//example
function foo() {
  bar();
  var x = 1;
}

//actually interpreted like this...
function foo() {
  var x;
  bar();
  x = 1;
}

// the following functions are equivalent
function foo() {
  if (false) {
    var x = 1;
  }
  return ;
  var y = 1;
}
// ...same as this...
function foo() {
  var x;
  var y;
  if (false) {
    x = 1;
  }
  return;
  y = 1;
}

// So how is this funct interpreted??
function test() {
  foo();
  bar();
  var foo = function() {
    print("Will foo run?");
  }
  function bar() {
    print("Will bar run?");
  }
}
test();

// ...like this!

function test() {
  function bar() {
    print("Will bar run?");
  }
  var foo;
  foo();  // will throw an error!
  bar();
  foo = function() {
    print("Will foo run?");
  }
}

/* order of ways to enter Scope is their priority
  1. language-defined: i.e. this
  2. formal params
  3. function declaration
  4. var declaration

  So function declaration has priority over var declaration

  Exceptions:
  + built-in 'arguments' is between 2 and 3
*/


/* ###################################### */
// 20 May Notes (still from website)


/*
Recap: Scope is entered by a specific order in JS
1. language-defined (this)
2. formal params
3. function declaration
4. var declaration
*/

function test() {
  foo();
  bar();

  var foo = function() {
    print("When does this run?")
  }
  function bar() {
    print("How about this one?")
  }
}

// this code (above) is actually interpreted like this...

function test() {
  function bar() {
    print("How about this one?")
  }
  var foo;
  foo();
  bar();
  foo = function() {
    print("When does this run?")
  }
}

// funct declarations at top
// followed by var declarations
// THEN initialization happens whenever it does


/* ###################################### */

// function declaration takes priority over var declaration
// so...

function foo() {
  print("This is it!")
}

var foo = 6;

// foo = function() { print("This is it!"); }

/* ###################################### */
/* THIS FOLLOWING CODE... */
var foo = function() {};
function bar() {};
var baz = function spam() {};

/* ...GETS interpreted like this... */

function bar() {};
var foo;
var baz;
foo = function() {};
baz = function spam() {};

/* ###################################### */

var myVar = "global var";

function myMethod() {
  print(myVar);
  var myVar = "local var";
  print(myVar);
}

// this code (above) is interpreted this way...

var myVar;
myVar = "global var";

function myMethod() {
  var myVar;
  print(myVar);
  myVar = "local var";
  print(myVar);
}

/* ###################################### */

// one more hoisting example

function foo() {
  print("global foo");
}

function bar() {
  print("global bar");
}

function () {
  print(foo);
  print(bar);

  foo();
  bar();

  function foo() {
    print("local foo");
  }

  var bar = function() {
    print("local bar");
  };
}

// the above gets interpreted like this...

function() {
  function foo() {
    print("local foo");
  }
  var bar;
  print(foo);     // function foo() {...}
  print(bar);     // undefined

  foo();          // function foo() {...}
  bar();          // undefined

  bar = function() {
    print("local bar");
  };
}


// lets look at some more hoisting stuff!!

// since JS moves var declarations to top...
// you should do this explicitly

function badHoisting() {
  var foo = getFromWhere();

  if (foo == 5) {
    var bar = 20;
    someFunction(bar);
  };
}

// BETTER WAY!

function goodHoisting() {
  var foo, bar;

  foo = getFromWhere();

  if (foo == 5) {
    bar = 20;
    someFunction(bar);
  }
}

/*------------------------------------------*/
// Back to YDKJS books!

function foo() {
  var a = 1;

  if (a >= 1) {
    let b = 2;

    while (b < 5) {
      let c = b * 2;
      b++;

      console.log(a + c);
    }
  }
}
foo();

// Immediately Invoked Function Expressions (IIFEs)

(function ayy() {
  print("Hello young deegle! :)");
})();

/*------------------------------------------*/
// the 'this' keyword!

function foo() {
  print("this.bar: ", this.bar);  // 'this' changes based on call
}
var bar = "global";

var obj1 = {    //
  bar: "obj1",
  foo: foo
};

var obj2 = {
  bar: "obj2"
};

foo();           // "global" -> but error in strict mode!
obj1.foo();      // "obj1" -> 'this' is the obj1 Object
foo.call(obj2);  // "obj2" -> 'this' is the obj2 Object
new foo();       // "undefined" -> creates new empty foo Object

/*------------------------------------------*/
// Prototypes

/* if property of an Object does not exist
    - JS will automatically use object's internal
        prototype reference to find another
        object to look for property on
          = fallback  */
var foo = {
  a: 42
};

// create 'bar' and link it to 'foo'
var bar = Object.create(foo);

bar.b = "hello world";

bar.b;    // "hello world"
bar.a;    // 42 <- delegated to 'foo'

/* 'bar' is a new Object with a 'b' property explicitly
    but bar also has a 'a' property implicitly
      from the prototype link to 'foo'    */


/*------------------------------------------*/
// How to account for new and old JS (2 mehods)

// 1. polyfilling: reproduce new behavior in old code

// example: ES6 has Number.isNaN(...) to check NaN
if (!Number.isNaN) {
  Number.isNaN = function isNaN(x) {
    // NaN is the only value in JS that is
    // NOT equal to itself!
    return x !== x;
  };
}

// 2. transpiling: transform + compile new into old JS

// example: ES6 has 'default parameter values'
function foo(a=2) {
  print("a: ", a);
}

foo();    // 2
foo(42);  // 42

// ...transpiling for older version...

function foo() {
  var a = arguments[0] !== (void 0) ? arguments[0] :
  2;
  print("a: ", a);
}

// if 'void 0' = undefined


#######################################################

// 26May - book 2: Scope and Closure :)

/* Scope:
  -explains where vars live / are stored
  -and how to retrieve them in our program
*/

/* JS = a compiled languaged

Three steps of compilation:

1. Tokenizing / Lexing
-breaking up string of characters into meaningful chunks
    = tokens

    example: var a = 2;
      tokens: var, a, =, 2, ;,

  Note: if tokenizing involved figuring out if
  'a' should be a distinct token or part of another token
      = that would be lexing

2. Parsing
-turning a stream (array) of tokens into a tree
  of nexted elements = AST

  AST = abstract syntax tree

  example: var a = 2;
    tokens: var, a, =, 2, ;,
      AST: VarDeclation = var (top-level node)
            Identifier = a (child node)
            AssignmentExpression = = (another child node)
            NumericLiteral = 2 (another child node)


3. Code-Generation
-process of taking AST and turning into executable code

  -> create and store variables into machine language
*/


/* The Cast involved in scope

a) Engine - start-to-finish compilation and execution of JS

b) Compiler - handles dirty work of parsing and code-generation

c) Scope - collects and maintains a look-up list of declared vars
    & enables strict set of rules as to how vars are accessed
    note: identifiers = vars


How does The Cast approach "var a = 2;"?

Steps:
1. Compiler will perform lexing to break into tokens

2. parse tokens into a tree

3. Compiler asks Scope if 'var a' already exists
  if yes, Compiler ignores declaration
  if no, Compiler declares a new var 'a'

4. Compiler produces code for Engine to later execute
  to handle 'a = 2' assignment

  Engine asks Scope if there is a 'a' accessible
  in current Scope

    if yes, Engine uses that var
    if no, Engine looks elsewhere

5. If Engine finds var 'a', assigns value '2' to it
    If no 'a', Engine raises an error

Summarize: Compiler declares 'a' if not already in Scope.
    Then Engine looks up var 'a' in Scope and assigns if found.
*/

28 May - Understanding Scope

// The Cast

If you write this code:

var a = 2;

A few things happen...
1. Compiler performs lexing -> creates tokens
2. parse tokens into a tree
3. Compiler checks if 'var a' is in Scope
    if yes, ignore declaration
    if no, declare
4. Compiler creates the 'a=2' assignment code
    passes it to Engine
5. Engine checks if 'a' accessible in Scope
    if yes, Engine uses that 'a'
        Engine uses that variable
    if no, Engine looks elsewhere
        Engine raises ERROR

Summary: Compiler declares 'a' if no already in Scope.
          Engine looks up and assigns 'a' in Scope.


########################################

// Compiler Speak

When Engine executes code Compiler makes to lookup variable
  -> consults Scope to lookup

Engine can do a LHS or a RHS lookup

LHS: Left-hand side
  - variable appears on the lefthand side of assignment operation

RHS: Right-hand size
  - variable appears on the righthand side of assignment operation

---------------

BUT!

Really RHS is the 'normal' way -> just grab value
  - RHS == retrieve his/her source (value)

  - RHS == "not LHS"

  - RHS == "go get the value of..."

---------
// CODE
console.log(a);
// or
print(a);
---------

^ the reference to 'a' is RHS
  - nothing is being assigned to 'a' here
  - simply retrieval (=RHS)

---------
// CODE
a = 2;
---------

^ the reference to 'a' is LHS
  - bc we do not care what current value of 'a' is
  - we re-assign value to variable

---------------

Better way to understand LHS and RHS:
1. Who is the target of assignment? = LHS
2. Who is the source of the assignment? = RHS

---------
// CODE
function foo(a) {
  print(a);
}

foo(2);
---------

^ few things here:
1. the implicit assignment of '2' to 'a' = LHS [re-assigning]
2. 'print(a)' = RHS [calling -> retrieve his/her source]
3. calling 'foo()' = RHS [calling]
4. change of passing '2' into 'print()' = LHS/RHS ...
    -> re-assign a the value passed in = LHS
    -> retrieve that passed in value = RHS

NOTE: function delcaration (function foo() {...})
  -> this is NOT LHS !!!
  -> this is RHS. There is no re-assigning
  -> Compiler handles declaration and value definition
  during code-generation

    = so Engine is executing code, no 'assign'
      of function value to foo !!

      -> contrast this to "var foo = function() {...}"

########################################

// Engine / Scope Conversation

function foo(a) {
  print(a);
}
foo(2);

---------
Steps:
1. Engine gives Scope a RHS reference for 'foo'
2. Scope has 'foo' -> Compiler declared 'foo' is-a function
3. Engine executes foo
4. Engine gives Scope a LHS reference for 'a'
5. Scope has 'a' -> Compiler declared 'a' is-a formal param
6. Engine assigns 2 to 'a'
7. Engine looks up 'print(...)'
8. Engine gives Scope a RHS reference for 'a' (AGAIN)
9. Scope has 'a' -> 'a' is still there - hasnt changed
10. Engine passes value of 'a' (which is 2) to 'print(...)'

########################################

// quiz

function foo(a) {
  var b = a;
  return a + b;
}

var c = foo(2);

-------
Note: LHS = re-assigns, RHS = call

1. Engine gives Scope a RHS reference for 'foo'
2. Scope has it -> Compiler declared 'foo' a function
3. Engine gives Scope a LHS reference for 'c'
4. Scope has it -> Compiler delcared 'c' a variable
5. Engine executes 'foo'
6. Engine gives Scope a LHS reference for 'a'
7. Scope has 'a' -> Compiler declared 'a' a formal param
8. Engine assigns 2 to 'a'
9. Engine gives Scope a LHS reference for 'b'
10. Scope has 'b' -> Compiler declared 'b' a variable
11. Engine assigns 'a' to 'b'
12. ...


--------

Review -->

function foo(a) {
  var b = a;
  return a + b;
}

var c = foo(2);


1. Engine gives Scope LHS reference for 'c'
2. Scope has 'c', Compiler declared 'c' as variable
3. Engine gives Scope RHS reference for 'foo()'
4. Scope has 'foo()', Compiler declared 'foo' as function
5. Engine assigns 'c' the value 'foo()'
6. Engine gives Scope LHS reference for 'a'
7. Scope has 'a', Compiler declared as param
8. Engine assigns value of '2' to 'a'
9. Engine gives Scope a LHS reference for 'b'
10. Scope has 'b', Compiler declared as a variable
11. Engine assigns value of 'a' to 'b'
12. Engine gives Scope RHS for 'return'
13. Scope has 'return', is a built-in thing
14. Engine assigns 'return' with 'a + b'?
-or-
14. Engine gives Scope LHS reference for 'return'
15. Scope has 'return', is a built-in thing
16. Engine assigns 'return' with 'a+b'


########################################

// Nested Scope

Scopes are nested in other Scopes
  - if variable is not found within current Scope
      then Engine looks elsewhere -> in top Scope etc

-------
// CODE
function foo(a) {
  print(a+b);
}
var b = 2;

foo(2);

The RHS reference for 'b' cannot be resolved within 'foo()'
  - so Engine looks outside (global 'b')

Steps:
1. Engine gives global-Scope LHS reference for 'b'
2. Scope has 'b', Compiler delcared it as a variable
3. Engine assigns '2' to 'b'
4. Engine gives global-Scope RHS reference for 'foo()'
5. Scope has 'foo()', Compiler declared it as function
6. Engine runs 'foo()'
7. Engine gives foo-Scope LSH reference for 'a'
8. Scope has 'a', Compiler declared as param
9. Engine assigns '2' to 'a' in foo-Scope
10. Engine gives foo-Scope RHS reference for 'b'
11. Scope DOES NOT HAVE IT!
12. Engine gives global-Scope RHS reference for 'b'
13. global-Scope has 'b', Compiler declared it as a variable

########################################

// Building on Metaphors

think of a very tall building with many floors

first floor = current Scope

1. look for LHS and RHS references within current Scope
2. if not found, move up to next floor
3. top floor / whole building = global Scope

########################################

// Errors

Big thing with LHS and RHS references is their error behavior

---------
// CODE
function foo(a) {
  print(a+b);
  b = a;
}

foo(2);

-----------------------------

The first RHS reference for 'b' = undeclared
      -> because not found in foo-Scope
If no RHS references for 'b' (in nested Scopes) are found
      -> 'ReferenceError' thrown by the engine

-- COMPARE THIS TO --

If Engine has LHS references that are never resolved
      = LHS arrives to top floor (global Scope) without finding it

Then global Scope:
      -> will create a new variable with that name
      -> within the global Scope (new var in global Scope)
      -> and hand reference to it back to Engine

  --> this is an implicit global variable declaration!!!!

-------------------------------

If RHS reference that is impossible to do...
    -> for example: function call for non-function
        -> Engine throws a 'TypeError'


'ReferenceError': Scope resolution-failure

'TypeError': Scope resolution was successful, but illegal action


########################################

// Review

Scope determines how and where a variable can live
  -> which means where a var can be looked up!

Purpose for looking up a variable:
1. LHS = assigning value
          -> by '=' operator
    -or-  -> by passing into function

2. RHS = retrieving its value (calling)

JavaScript Engine compiles before executing:
  -> statements like "var a = 2;" split into 2 steps:
      1. First, 'var a' RHS reference
            for declaration in Scope
      2. Second, 'a = 2' LHS reference
            for assignment

Both LHS and RHS references start in current Scope
  -> move up through nested Scopes until hitting Global (top)

  if RHS references are not fulfilled: 'ReferenceError'

  if LHS references are not fulfilled:
      -> Global Scope creates said var at Global level

      -> BUT! If in Strict Mode: 'ReferenceError' is thrown

########################################

// Ch. 1 QUIZ! (same as before)

---------
// CODE
function foo(a) {
  var b = a;
  return a + b;
}

var c = foo(2);

Steps:
1. Engine gives global-Scope a LHS reference for 'foo(...)'
2. global-Scope has 'foo(...)', Compiler delcared it a function
3. Engine gives global-Scope a RHS reference for 'c'
4. global-Scope has 'c', Compiler declared it a variable
5. Engine assigns 'c' the value of 'foo(...)'
6. Engine gives foo-Scope a RHS reference for 'a'
7. foo-Scope has 'a', Compiler declared it a param
8. Engine assigns 'a' in foo-Scope value '2'
9. Engine gives foo-Scope a LHS reference for 'b'
10. foo-Scope has 'b', Compiler declared it a variable
11. Engine assigns 'b' the value 'a' which is '2'
12. Engine gives foo-Scope a LHS reference for 'return'
13. foo-Scope has 'return', is a built-in thingie
14. Engine assigns 'return' value 'a + b'


########################################
// Ch. 2: Lexical Scope
########################################

// overall

Scope works off of two main models:

** Lexical Scope = most common in most programming languages
** Dynamic Scope = used in Bash scripting

Main thing to understand is Lexical Scope!

########################################

// Lex-time

Lexing:
-------
  -> first phase of most language compilers
  -> process of tokenizing
        = examine string of source code characters
              -> assign semantic meaning to the tokens

Lexical scope is scope defined at lexing time....?????

So, lexical scope is determined at time of writing code
  -> is largely set in stone

---------
// CODE
function foo(a) {
  var b = a * 2;

  function bar(c) {
    print(a,b,c);
  }

  bar(b*3);
}

foo(2);

^ This code handles three sets of nested Scope:

1. Global-Scope: calls 'foo(2)' and has 'foo(...)'
    -> one identifier = 'foo'
2. foo-Scope: declares and assigns 'b' and has 'bar(...)'
    -> three indentifiers = 'a', 'bar', 'b'
3. bar-Scope: assigns 'print()' with 'a,b,c'
    -> one indentifier = 'c'

REMEMBER! JS uses only function-based Scoping ayy
  -> so global-Scope + each-function-Scope


########################################

// Look-ups

**** from code above...

'print(a,b,c)': Engine needs to find references to a, b, and c

  1. Engine starts looking within 'bar()' Scope
      since that is where it is
  2. no 'a' in 'bar()', looks in 'foo()'
      finds 'a' in 'foo()', uses that 'a'
  3. etc for 'b' and 'c'
        -> except it DOES find 'c' in 'bar()'


-------------

Review of code:

function foo(a) {
  var b = a * 2;

  function bar(c) {
    print(a, b, c);
  }
  bar(b*3);
}

foo(2);

LHS reference -> reassign
RHS reference -> call

1. Engine gives global-Scope RHS reference for 'foo'
2. global-Scope has 'foo', Compiler declared it as function
3. Engine executes 'foo'
4. Engine gives foo-Scope LHS reference for 'a'
5. foo-Scope has 'a', Compiler declared it as a param
6. Engine assigns value '2' to 'a'
7. Engine gives foo-Scope RHS reference for 'bar'
8. foo-Scope has 'bar', Compiler declared it a function
9. Engine gives foo-Scope LHS reference for 'b'
10. Scope has 'b', Compiler declared it a variable
11. Engine assigns 'a*2' to 'b'
12. Engine gives bar-Scope LHS reference for 'c'
13. bar-Scope has 'c', Compiler declared it a param
14. Engine assigns 'b*3' to 'c'
15. Engine gives bar-Scope LHS reference for 'print'
16. bar-Scope has 'print', BUILT IN!
17. Engine assigns 'a,b,c' to 'print'

-----------

If Engine cannot find reference to variables / thangs
in current level it will 'look-up' to the next
nested Scope...

Scope look-ups stop once match is found
  -> thus, identifier names can mask eachother = shadowing

------------

Important:

  -lexical scope look-up process only applies to
        first-class identifiers
            = a, b, and c...

  -example:
      if we had reference to foo.bar.baz in code
          -> lexical scope loop-up
              applies to finding foo identifier

          -> once it locates foo variable...
              = object property-access rules take over
                to resolve bar and baz properties

########################################

// Cheating Lexical

lexical scope is defined only by where a function is declared

  -> so how can we modify or cheat it?

...cheating lexcial scope = poorer performance...

Two methods to cheat lexcial scope:

1. eval:
    -> take string as an argument
    -> treats contents of string as if authored
        code at that point in the program

....
// multi-day break!
....

########################################

// Cheating Lexical

lexical scope is defined only be where a function / code
    is declared

How to cheat lexical scope?
  -> two methods: elav() and with()

Why to cheat lexical scope?
  -> cheating lexical scope = poorer performance

-------------

1. elav:
    -> takes a string as argument
        and treats contents as if had been authored
        at that point

    -> allows you to cheat lexical scope by pretending
        code was there all along

// example code
function foo(str, a) {
  elav(str);  // cheating!
  print(a,b);
}

var b = 2;

foo("var b=3;", 1);   // 1, 3

Steps in code:

1. Engine gives global-Scope LHS reference for 'b'
2. global-Scope has 'b', Compiler defined as variable
3. Engine assigns '2' to 'b'
4. Engine gives global-Scope RHS refernce for 'foo'
5. global-Scope has 'foo', Compiler defined as function
6. Engine gives foo-Scope LHS references for 'str' and 'a'
7. foo-Scope has 'str' and 'a', Compiler defined as params
8. Engine assigns 'var b=2' to 'str' and '1' to 'a'
9. Engine gives foo-Scope RHS reference for 'eval(...)'
10. foo-Scope has 'eval', built in
11. Engine runs 'elav("var b=3;")'
12. CHEATING TIME!
13. Engine gives foo-Scope LHS reference for 'b'
14. foo-Scope now has 'b', Compiler just defined it as variable
15. Engine assigns '3' to 'b'
16. Engine gives foo-Scope RHS reference for 'print'
17. foo-Scope has 'print', built in
18. Engine gives foo-Scope RHS reference for 'a' and 'b'
19. foo-Scope has 'a' and 'b', Compiler defined as param and var
20. Engine assigns '1' to 'a' and '3' to 'b'

Thus, elav() can at runtime modify author-time lexical scope!

---------
2nd method for cheating lexical scope...

2. with()
    -> IS NOW DEPRECATED!
    -> shorthand for making multiple property references
      without repeating the object reference itself

==========
// EXAMPLE CODE
var obj = {
  a: 1,
  b: 2,
  c: 3
};

// more tedious to repeat 'obj'
obj.a = 2;
obj.b = 3;
obj.c = 4;

// easier short-hand with 'with'
with (obj) {
  a = 3;
  b = 4;
  c = 5;
}

=========
// here is an example of with() as a problem
=========
function foo(obj) {
  with (obj) {
    a = 2;
  }
}

var o1 = {
  a: 3
};

var o2 = {
  b: 3
};

foo(o1);
print(o1.a);    // 2

foo(o2);
print(o2.a);    // undefined
print(a);       // 2    -> leaked global!

=========

with() -> creates a whole next lexical scope out of thin air!

    -> the 'o1.a' call creates a new lexical scope
        with 'var a=2' in it

        -> thus, leaked to global!


########################################

// Performance with elav() and with()

Both elav() and with() modify author-time lexical scope
at runtime

Why is this a problem?
    -> JS engine cannot use its optimizations when lexing
      if it stumbles upon elav() or with()


########################################

// Review

Lexical scope is scope defined by author-time decisions
    -> lexing phase knows where and how
        all indentifiers are declared
        and predict their look-up during execution

Cheating lexical scope means slower code
    -> because JS engine cannot use all of its
        optimization properties

Two methods to cheat lexical scope:
1. elav(...) -> modify existing lexical scope at runtime
      by evaluating a string of code containing
      declarations in it

2. with(...) -> creates a whole new lexical scope at runtime
      by treating object reference as a scope
      and objects properties as scoped identifiers


########################################
// Ch. 3: Function Vs Block Scope
########################################

*Scope is comprised of bubbles...
    -> each bubble is container / bucket
        -> each has identifiers (vars, functions)

*Nesting of bubbles of Scope defined at author-time


########################################

// Scope From Functions

JS has function-based scope!
    -> functions are main way to form
    structures of scope

---------
// EXAMPLE CODE

function foo(a) {
  var b = 2;

  function bar() {

  }

  var c = 3;
}

Scope bubble for 'foo()'
  -> identifiers for 'a', 'b', 'c', and 'bar'
      -> all identifiers equally belong to the scope bubble

Scope bubble for 'bar()'
  -> unique, has its own identifiers

Scope bubble for 'global'
  -> identifiers for 'foo()'

* since 'a','b','c', and 'bar' belong to foo-Scope
  -> not accessible outside of 'foo()'

* bar-Scope can access all of foo-Scope + all in 'bar()'
  -> NOTE: shadow identifiers may happen within 'bar()'

----------
Overview:
  -> identifiers belong to function bubbles
      -> can use throughout function
      -> JS variables are dynamic in nature

          = can take on values of different types
            as needed!

########################################

// Hiding in Plain Scope

Two ways to think about functions:
    1. declare function and add code inside
    2. take any code written and wrap in function
          -> this hides the code

Mental exercise for 2.
  -> can show how to wrap all indentifiers (vars, functions)
      within each section of code

  --------------------------------------
  Use of hiding variables and functions?
      -> Scope-based hiding (wrapping everything in functions)
          = Principle of Least Privilege
                = Least Authority
                = Least Exposure

* Principle of Least Privilege:
    -> only exposure min number of variables / functions
        to each part of code (and eventually to the user)

------------
// EXAMPLE CODE

function doSomething(a) {
  b = a + doSomethingElse(a * 2);

  print(b * 3);
}

function doSomethingElse(a) {
  return a - 1;
}

var b;

doSomething(2);     // 15

-----------

* this code has 'b' and 'doSomethingElse'
  as "private" details of how 'doSomething' works

* but giving enclosing scope 'access' to 'b'
  and 'doSomethingElse'...
      = unnecessary, dangerous, may violate assumptions

------------
*** BETTER WAY TO DO THIS! ***

// EXAMPLE CODE
function doSomething(a) {
  function doSomethingElse(a) {
    return a - 1;
  }
  var b;

  b = a + doSomethingElse(a * 2);

  print(b * 3);
}

doSomething(2);     // 15
------------

Steps to run above code:
1. Engine gives global-Scope RHS reference for 'doSomething'
2. global-Scope has it, Compiler declared as function
3. Engine gives doSomething-Scope LHS reference for 'a'
4. doSomething-Scope has it, Compiler declared as param
5. Engine assigns '2' to 'a'
6. Engine gives doSomething-Scope LHS reference for 'b'
7. doSomething-Scope has 'b', Compiler declared as variable
8. Engine assigns 'a + doSomethingElse(a*2)' to 'b'
9. Engine gives doSomethingElse-Scope LHS reference for 'a'
10. doSomethingElse-Scope has 'a', Compiler declared as param
11. Engine assigns 'a*2' (where 'a' = '2') to 'a'
12. Engine gives doSomething-Scope RHS reference for 'print'
13. doSomething-Scope has it, built in
14. Execute 'print(...)'!

* Keep private detais private with function wrapping

########################################

// Collision Avoidance

Hiding variables and functions also avoids unintended collisions...

// EXAMPLE CODE

function foo() {

  function bar(a) {
    i = 3;
    print(a + i);
  }

  for (var i=0; i<10; i++) {
    bar(i * 2);
  }
}

foo();

* 'i=3' LHS reference in 'bar' will
    overwrite 'i' in for-loop

      = infinite loop!

* using 'var i=3' will create a shadow 'i' var in 'bar'

########################################

// Global namespaces

Variable collision likely in global scope...

* multiple libraries loaded in have var / function
    collision from not hiding internal / private
      variables / functions

To handle this: create single variable declaration
  -> often an object
    -> object is then used as 'namespace' for the library

// EXAMPLE CODE

var scikitLearnLibrary = {
  awesome: "stuff",
  doSomething: function() {
    // ...
  },
  doAnotherThing: function() {
    // ...
  }
};

########################################

// Module management

Another option for collision avoidance...
  -> no identifiers from any libraries are added to global scope
    -> keep library identifiers in private, non-collision scopes

... but could learn how to code without
    ever needing any Module managers!

########################################

// Functions as Scopes

Any snippet of code can be wrapped with function
    -> which hides variables and function declarations


--------
1. Code Snippet - function wrapping
//Example code

var a = 2;

function foo() {

  var a = 3;
  print(a);     // 3
}

foo();

print(a);       // 2

----------

* problem with this ^
  -> named-function 'foo' pollutes global-Scope
  -> must explicitly call wrapped code in 'foo'

* JS offers a solution at both!
  -> unnamed-function that is called implicitly

--------
2. Code Snippet - function wrapping
//Example code

var a = 2;

(function foo(){

  var a = 2;      // 3
  print(a);

})();

print(a);         // 2

--------

* function is treated as function-expression
    -> '(function...)' = expression

    -> if 'function' is first thing in statement
        = function declaration
    -> else
        = function expression

* key difference between function delcaration and expression
    -> where name is bound as identifier

      1. 'function foo() {...}' -> bound to enclosing scope
            -> called directly with 'foo()'

      2. '(function foo() {...})' -> bound to own function
            -> identifier 'foo' is only in foo-Scope
                  thus, does not pollute enclosing scope

########################################

// Anonymous Versus Named

* function expressions as callback parameters

---------
setTimeout(function() {
  print("I waited 1 sec");
}, 1000);
---------

* this is 'anonymous function expression'
    -> 'function()' has no name identifier

* drawbacks of 'anonymous function expressions'
    1. no name to display stack traces
        = bad for debugging
    2. hard to self-reference
    3. no name = difficult to read code

* alternative = name every function

---------
setTimeout(function timeoutHandler() {
  print("I waited 1 sec");
}, 1000);
---------

########################################

// Invoking Function Expressions Immediately

var a = 2;

(function foo() {
  var a = 3;
  print(a);         // 3
})();

print(a);           // 2

* second pair of "()" executes expression in first pair

    = 'Immediately Invoked Function Expression' = IIFE

* IIFE = a function call
    -> can pass in arguments

---------

var a = 2;

(function IIFE(global) {
  var a = 3;
  print(a);               // 3
  print(global.a);        // 2
})(window);

print(a);                 // 2
---------

* Alternative method: function to execute is given second
  -> after the invocation and parameters to pass to it

---------
var a = 2;

(function IIFE(def) {

  def(window);

})(function def(global){

  var a = 3;
  print(a);               // 3
  print(global.a);        // 2

});
---------

* this method is used in UMD
  -> the Universal Module Definition project


########################################

// Blocks as Scopes

* Functions are most common unit of Scope

* other forms of Scop exist...

Block Scope:
  -> many other languages use block-based Scope

----------
for (var i=0; i<10l i++) {
  print(i);
}
----------
  * variable 'i' declared within for-loop
    -> even though 'i' lives in enclosing Scope


----------
var foo = true;

if(foo) {
  var bar = foo * 2;
  bar = something(bar);
  print(bar);
}
----------

* declare var 'bar' within if-statement
  -> But, 'bar' belongs to enclosing Scope

* using pseudo-block-scoping in JS
  -> is a way to extend the Principle of Least Privilege

...on the surface, JS is only function-based Scoping

...but if we dig a little deeper...

########################################

// with

DEPRECATED! But shows a form of block-Scope

* scope created from object within 'with()'
  -> only exists for lifetime of that 'with' statement
    -> and not enclosing Scope


########################################

// try/catch

JS in ES3 specified var declaration in 'catch' clause

-----------
try {
  undefined();    // illegal operation = force exception
}

catch(err) {
  print(err);     // works!
}

print(err);       // ReferenceError: 'err' not found
-----------

* err only exists within the 'catch' block
    = block-Scope


########################################

// let

* with() and try / catch = pseudo-block-scoping

* let() = real block-scoping!
  -> from ES6

-----------
1. implicit block-scoping with 'let'
//
var foo = true;

if (foo) {
  let bar = foo * 2;      // true block-scoping
  bar = something(bar);
  print(bar);
}

print(bar);               // ReferenceError
-----------

* above example is implicit block-scoping
  -> may be confusing where variables live
      from 'let'

-----------
2. Explicit block-scoping with 'let'
//
var foo = true;

if (foo) {
  {           // <- explicit block
    let bar = foo * 2;
    bar = something(bar);
    print(bar);
  }
}

print(bar);       // ReferenceError
-----------

* the extra "{...}" allows arbitrary block
  -> for 'let' to bind to

This shows use of explicit block inside the 'if'
  -> now 'bar' only lives in 'if (foo) {...}'

  * now we can move around 'if (foo) {...}'

* declarations with 'let' will not hoist


-----------
...
-----------
// Review of 'let' -- few days since last read

* JS has some strange pseudo-block-scoping functionality

* the 'let' keyword from ES6 creates true block-scoping

the 'let' keyword:
  -> like 'var', declare variables

    * 'let' attachs var declaration to scope of current block

    * 'let' hijacks any block scope for var declaration

---
// example code of let (implicit declaration)
var foo = true;

if (foo) {

  let bar = foo * 2;
  bar = something(bar);
  print(bar);

}

print(bar);       // ReferenceError
---

* 'let' declares new var 'bar' to 'if(foo) {...}'
    -> declaration is implicit


So... how to do explicit var declaration with 'let'?

---
// example code of explicit let

var foo = true;

if (foo) {
  {                   // <- explicit block
    let bar = foo * 2;
    bar = something(bar);
    print(bar);
  }
}

print(bar);       // ReferenceError
---

* extra '{...}' gives let-Scope block to live :)

NOTE -> var declarations with 'let' do NOT hoist
    to entire scope of block

---
// example code of let being anti-hoisting
{
  print(bar);     // ReferenceError
  let bar = 2;
}
---

* the var 'bar' from 'let' does NOT hoist in block!!!!


########################################

// Garbage collection

* block-scoping useful for closure & garbage collection

* garbage collection -> to reclaim memory

---
// example code for garbage collection

function process(data) {
  // do something
}

var someReallyBigData = { ... };

process(someReallyBigData);

var btn = document.getElementById("my_button");

btn.addEventListener("click", function click(evt) {
  print("button clicked");
}, /* capturingPhase=*/false);
---

* the 'click' function does NOT need 'someReallyBigData'

* so...memory-heavy data structure could be garbage collected

    -> BUT! JS probably needs data structure around
      since 'click' function has closure over entire Scope

====
*** Block-scoping can address this!

    -> making it clear to Engine that
        someReallyBigData does need to stick around
====

---
// example code for block-scope + garbage collection

function process(data) {
  // do something interesting
}

// anything after this block goes away!
{
  let someReallyBigData = {...};
  process(someReallyBigData);
}

var btn = document.getElementById("my_button");

btn.addEventListener("click", function click(evt) {
  print("button clicked");
}, /*capturingPhase=*/false);
---

* {...} with 'let' is discarded (garbage) after use

* this is declaring explicit blocks for variables
  to locally bind to


########################################

// let loops

* 'let' shines with for-loop

---
// example of using let with for loops

for (let i=0; i<10; i++) {
  print(i);
}

print(i);     // ReferenceError
---

* 'let' binds 'i' to for-loop-Scope
    -> also rebinds 'i' for each iteration

* See CHAPTER 5 to explain why this is important!



NOTE -> using 'let' vs 'var' may require extra care...

---
// example of problems with let

var foo = true, baz = 10;

if (foo) {
  var bar = 3;

  if (baz > bar) {
    print(baz);
  }
}

// REFACTORED as ...

var foo = true, baz = 10;

if (foo) {
  var bar = 3
}

if (baz > bar) {
  print(baz);
}

// REFACTORED with let ...

var foo = true, baz = 10;

if (foo) {
  let bar = 3;

  if (baz > bar) {
    print(baz);
  }
}
---

* for last refactor (with let)...
    -> could not take out second 'if' statement
        * would not have 'bar' since
          'bar' is bound to 'if(foo) {...}'

* so...'let' binds var declarations to exact block-Scope
    -> will not carry over like with 'var'


########################################

// const

* ES6 introduced 'const' as well as 'let'

* 'const' also craetes block-Scoped var

---
// example code with const keyword

var foo = true;

if (foo) {
  var a = 2;
  const b = 3;      // block-Scoped to 'if (foo) {...}'

  a = 3;            // just fine!
  b = 4;            // error!
}

print(a);           // 3
print(b);           // ReferenceError
---

########################################

// Review of Ch. 3

* functions = most common unit of Scope in JS

* var and function in another function
    = hidden

* block-Scope:
  1. try / catch -> catch has block-Scoped var
  2. let -> cousin to var, allow var declaration
      in any block of code
          -> hijacks scope of enclosing block
  3. const -> block-Scoped constants
      in any block of code
          -> hijacks scope of enclosing block


########################################
// Ch. 4: Hoisting
########################################

* for function- and block- Scope
    -> var declared within Scope
    are attached to that Scope

How does Scope attachment work with declarations?

########################################

// Chicken or the Egg?

---
// example code of hoisting

a = 2;

var a;

print(a);
---

But code is hoisted :)

---
// really runs like this

var a;

a = 2;

print(a);
---

....
....
....

* How does this code actually run?

---
// example code of odd hoisting

print(a);

var a = 2;
---

* declaration is hoisted to top

    -> above code runs like this:

        ---
        var a;

        print(a);     // undefined, not 'ReferenceError'

        a = 2;
        ---

########################################

// The Compiler Strikes Again

* declarations are first: function and then var

* delaration comes before assignment (ALWAYS)

---
// example code of hoisting with functions

foo();            // function 'foo' declared before this

function foo() {
  print(a);       // undefined
  var a = 2;
}
---

* function delcarations are hoisted...

* function expressions are NOT hoisted!

---
// example code of function expression not hoisted

foo();                      // TypeError

var foo = function bar() {
  //...
};
---

...

because above code runs like this:

---
var foo;

foo();

foo = function bar() {
  // ...
};
---

* thus we get a TypeError, not ReferenceError


########################################

// TEST!

========

// how is this interpreted??

foo();
bar();

var foo = function bar() {...};

---------

// like this!

var foo;

foo();
bar();

foo = function() {
  var bar = ...self...
  ...
}
========

Thus:

* foo() = TypeError
* bar() = ReferenceError  (no LHS for global-Scope)

########################################

// Functions First

* function hoisted first
* var hoisted second

---
// example code of functions vs vars hoisting

foo();

var foo;

function foo() {
  print(1);
}

foo = function() {
  print(2);
};

===
*interpreted like this
===

// 'foo' is now declared
function foo() {
  print(1);
}

foo();    // 1

// re-assign 'foo'
foo = function() {
  print(2);
}
---

...
...
...
* BAD TO DECLARE FUNCTION IN BLOCKS!

---
// example code of function declaration in blocks

foo();

var a = true;
if(a) {

  function foo() { print("a"); }

} else {

  function foo() { print("b"); }

}
---

* functions inside the condition blocks
    -> actually hoisted in enclosing Scope


########################################

// Review of Ch. 4

========
* How is the following interpreted?

---
foo();

function foo() {
  print(1);
}

var foo = function() {
  print(2);
}

function foo() {
  print(3);
}
---

* LIKE THIS!

---
function foo() {
  print(1);
}
// hoist function -> which declares "foo"

function foo() {
  print(3);
}
// hoist function

foo = function() {
  print(2);
}
---
========


########################################
// Ch. 5: Scope Closure
########################################

* closure -> goes along with lexical scope

Review lexical:
---------------
  * lexical scope is determined at write time
      -> largely set in stone

  * way to break apart code into tokens of importance

########################################

// Englightenment

 * closure is all around you in JS

 * just need to recognize and embrace it!

########################################

// Nitty Gritty

* closure -> when a function is able to remember
    and access it lexical scope even when
    its executing outside its lexical scope

---
// example code to illustrate closure definition

function foo() {
  var a = 2;

  function bar() {
    print(a);
  }

  bar();
}

foo();
---

* bar-Scope has access to 'a' from foo-Scope
    -> lexical scope look-up rules
        = inner function has access to outer-Scope

* academic perspective: bar-Scope has CLOSURE
    over foo-Scope

* in other words: 'bar()' closes over foo-Scope

---
// example code to fully demonstrate closure!

function foo() {
  var a = 2;

  function bar() {
    print(a);
  }

  return bar;
}

var baz = foo();

baz();      // 2
---

* why does 'baz()' return '2'?

    -> CLOSURE!
        * bar-Scope has closure over foo-Scope
        * 'baz' gets 'foo', thus foo-Scope

In other words:
---------------
  * 'bar()' has lexical scope access to inner foo-Scope
  * then pass 'bar()' as a value
  * 'return bar' = return function object that bar references
  * assign value 'foo()' returns to var 'baz'
        -> value 'foo()' returns = 'bar()'
  * invoke 'baz()'
        -> which invokes 'bar()'
  * 'bar()' is executed
        -> executed OUTSIDE of its declared lexical scope!
---------------

* normally after 'foo(...)' executes
        -> would expect garbage collector
          to free up memory

BUT! Closure does not allow this to happen...

    * 'bar()' still has foo-Scope (closes over foo-Scope)

    * by virtue of where it was declared:
        -> 'bar()' has lexical scope closure over
            inner scope of 'foo()'
                = keeps inner-foo-Scope alive
                for 'bar()' to reference

    * the reference 'bar()' has to inner foo-Scope
        = Closure

    * so -> when 'baz' is invoked...
        -> has access to author-time lexical scope
            = can access var 'a'

    * function 'foo()' is invoked outside
      of author-time lexical scope
          -> CLOSURE allows continual access
          to lexical scope of 'foo()'

---------------
...
---------------
...   whoa...get my head around that ^
---------------


More closure with functions being passed around as values!

---
// example code of closure, closure, CLOSURE!

function foo() {
  var a = 2;

  function baz() {
    print(a);
  }

  bar(baz);
}

function bar(fn) {
  fn();
}
---

* 'baz()' has closure over foo-Scope

* call 'bar()' from within 'foo()'

* passing 'baz()' with its closure over 'foo()'
    into 'bar()'

* invoke 'baz()' from 'bar()'

  = 'bar' is accessing author-time lexical scope
      of 'foo()' from 'baz()' closure over 'foo()'


########################################

// Review of Nitty Gritty with Closure...

* closure is calling lexical scope of a function
    outside of its lexical scope

---
// example code of closure

var fn;

function foo() {
  var a = 2;

  function baz() {
    print(a);
  }

  fn = baz;     // assign baz to global var
}

function bar() {
  fn();
}

foo();

bar();
---

* 'baz' has closure over inner 'foo' scope

* 'baz' is assigned to global var 'fn'

* 'bar' calls 'bar' (inside 'foo') outside
      of 'bar'- and 'foo'- lexical scope


Various ways to transport inner function
outside of its lexical scope

  -> maintains scope reference where originally declared

  -> execution of reference to inner function
      is an exercise of closure


########################################

// Now I Can See :)

* now for more 'real' (non academic) examples of closure

---
// example code using closure

function wait(message) {

  setTimeout(function timer() {
    print(message);

  }, 1000);
}

wait("Hello, closure!");
---

* inner function = 'timer'
    -> passed to 'Timeout(...)'

* 'timer' has scope closure over 'wait(...)'
    -> which keeps reference to 'message'

Loose step by step:
-------------------
1. Engine executes 'wait(...)'
    -> would garbage collect if not for closure

2. Engine invokes 'setTimeout(...)'
    -> has some built-in reference to some parameter

3. Engine invokes built-in parameter
    -> which invokes inner 'timer(...)'
        == lexical scope reference intact

========
...
========
Another example of closure using jQuery
========

---
// example code using jQuery w closure

function setupBot(name, selector) {

  $(selector).click(function activator() {
    print("Activating: " + name);
  });
}

setupBot("Closure Bot 1", "#bot_1");
setupBot("Closure Bot 2", "#bot_2");
---

* we are accessing lexical scope of 'activator(...)'
    -> outside of function scope

Remember:

  closure = various ways to invoke inner function
              outside of its lexical scope


########################################

// loops and closure

* for loops over good example of closure

---
// example code showing closure using for loops

for (var i=1; i<=5; i++) {

  setTimeout(function timer() {
    print(i);
  }, i*1000);
}
---

* when you run this code you get '6' printed out 5 times...

* terminating aspect of for loop
    -> when 'i' is NOT '<=5'
        thus = 6

* callbacks run strictly after for loop

!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
So what is missing from our code??

* we are trying to imply that each iteration
    = 'i' at time of iteration

* but, 'setTimeout(...)' is closed over global
    -> and global has only 1 value of 'i'
        when 'setTimeout(...)' is called


So here is how to fix this and explicitly do what we want!

---
// example code explicit behavior based on closure

for (var i=1; i<=5; i++) {
  (function() {
    setTimeout(function timer() {
      print(i);
    }, i*1000);
  })();
}
---

BUT THIS STILL DOES NOT WORK!

* each timeout function callback
    -> closed over per-iteration scope from IIFE

* HOWEVER -> the IIFE is an empty scope
    -> nothing in it...needs its own var with copy of 'i'


---
// example code using IIFE closure for-loops

for (var i=1; i<=5; i++) {

  (function() {

    var j = i;
    setTimeout(function timer() {

      print(j);

    }, j*1000);
  })();
}
---

*** and an alternative method ***

---

for (var i=1; i<=5; i++) {

  (function(j) {

    setTimeout(function timer() {
      print(j);

    }, j*1000);

  })(i);
}
---

* IIFE inside each iteration
    -> creates new scope for each iteration

      * gives callbacks opportunity
      to close over a new scope for each iteration


########################################

// Review Loops and Closure...

* need IIFE to provide closure for each iteration

* IIFE works because is function based scoping


---
for (var i=1; i<=5; i++) {
  (function(j) {

    setTimeout(function timer() {
      print(j);
    }, j*1000);

  })(i);
}
---



########################################

// Block Scoping Revisited

* per-iteration block scope for above code...

* use 'let' keyword
    -> create block-scope within 'for-loop'

---
for (var i=0; i<=5; i++) {

  let j=i;
  setTimeout(function timer() {
    print(j);
  }, j*1000);
}
---

* creates elegant block-scoped code
    -> handles per-iteration

BUT -> better yet, can simply use 'let'
        in the head of a 'for loop'...

---
for (let i=0; i<=5; i++) {

  setTimeout(function timer() {
    print(i);
  }, i*1000);
}
---

**** THIS CODE DOES WHAT ALL ABOVE DID WITH IIFE ****

* this is block-scoping & closure in harmony


########################################

// Quick review before Modules!

* IIFE = Immediately Invoked Function Expression
    -> produces lexical scope through function-based Scoping

    -> may help for hoisting
        * var in IIFE are hoisted to top of IIFE

* IIFE creates scope by declaring a function
    and immediately executing it


---
// example code

for (var i=1; i<=5; i++) {

  (function() {

    setTimeout(function timer() {

      print(i);

    }, i*1000);
  })();
}
---

* IIFE within 'for' loop provides scope

* 'timer' function closes over IIFE

* however, IIFE is empty in this case...

    -> the IIFE does not contain any var etc

    -> the 'i' is part of the enclosing-Scope ('for' and beyond)

-----------------------
---
-----------------------
---
-----------------------

so lets change this so IIFE contains something for closing over

---
// example code

for (var i=1; i<=5; i++) {

  (function() {

    var j = i;
    setTimeout(function timer() {

      print(j);
    }, i*1000);
  })();
}
---

* now 'j' is within IIFE-scope

* 'j' is updated on each iteration

-----------------------
---
-----------------------
---
-----------------------

* or lets just pass in 'j' as a param to the IIFE!

---
// example code -> IIFE as lexical scope

for (var i=0; i<=5; i++) {

  (function(j) {

    setTimeout(function timer() {

      print(j);
    }, j*1000);
  })(i);
}
---

* pass in 'i' to IIFE as param 'j'


---
var tmp = 0;

tmp = (function(j) { j += 10; return j; })(tmp);

// tmp = 10;

########################################

// Modules

* modules -> leverage the power of closure

---
// example code of modules

function foo() {

  var something = "cool";
  var another = [1,2,3];

  function doSomething() {
    print(something);
  }

  function doAnother() {
    print(another.join("!"));
  }
}
---

* both 'doSomething' and 'doAnother'
    -> have closure over inner scope of 'foo'

Add some more code to get a nice Module!

---
// example code of module

function CoolModule() {

  var something = "cool";
  var another = [1, 2, 3];

  function doSomething() {
    print(something);
  }

  function doAnother() {
    print(another.join("!"));
  }

  return {
    doSomething: doSomething,
    doAnother: doAnother
  };
}

var foo = CoolModule();

foo.doSomething();
foo.doAnother();
---

* this is a JS module!

* this is a 'revealing module'

* 'CoolModule' -> a function
    + must be invoked for an instance of the module
    + each instance is an object
    + object has references to inner functions
    + inner variables are private / hidden
    + in this way...

* returned object is like a public API for the module!

--------------------
----
--------------------

* jQuery provides a good example of using a module

* each "$" in jQuery -> object literal for module instance
    -> like the 'foo' in out above example

* '$' is just shouting out to the jQuery module

* '$' is a function -> all functions are objects

--------------------
----
--------------------

Closure + modules:

* two important things are happening (& necessary for modules):
    1. outer enclosing function
        -> when invoked it creates an instance of function
    2. enclosing function returns at least 1 inner function
        -> inner function has closure over private scope
              * can access private state
              * can modify private state



########################################

// Review Module

* Modules are an awesome example of using closure in JS

---
// example code using module
function CoolModule() {
  var something = "cool";
  var another = [1,2,3];

  function doSomething() {
    print(something);
  }

  function doAnother() {
    print(another.join("!"));
  }

  return {
    doSomething: doSomething,
    doAnother: doAnother
  };
}

var foo = CoolModule();     // instancce of module

foo.doSomething();
foo.doAnother();
---

* module 'CoolModule()' is just a function
    -> functions are objects...


########################################

// Review Block Scoping & Module (again)

* if we wanted to track each iteration within a for loop
      -> need a per-iteration block scope...

* 'let' keyword creates block scope to close over

---
// example code

for (var i=1; i<=5; i++) {

  let j = i;
  setTimeOut(function timer() {
    print(j);
  }, j*1000);
}
---

* now 'j' is within the block scope defined by 'let'

* 'let' block scope is declared once for the loop...

* so, how to declare var and block-scope for each iteration?

---
// example code -> per-iteration block scope using let

for (let i=1; i<=5; i++) {

  setTimeOut(function timer() {
    print(i);
  }, i*1000);
}
---

* 'let' creates block-scope within each iteration of for loop

* timer() has closure over for-loop block-scope

* setTimeOut() is a callback
      -> callback to timer() function with 'i*1000'

* callback works by calling

########################################

// Review closure from sitepoint.com/demystifying-javascript-closure

---
// example code showing closure

function setLocation(city) {
  var country = "France";

  function printLocation() {
    print("You are in " + city + ", " + country);
  }

  return printLocation();
}

var currentLocation = setLocation("Paris");

currentLocation();
---

* 'printLocation()' has closure over inner 'setLocation()'

* since 'printLocation()' is returned by 'setLocation()'...
      -> currentLocation = 'printLocation()'

* thus, printLocation has closure over setLocation
      -> and printLocation is called outside of lexical scope


------------------------------

in the above example:

* setLocation() is sort of gone

* curentLocation() == printLocation()

* printLocation() can be called outside of lexical scope
      due to closure

* inner functions (printLocation) store their outer functions
      -> by reference, not by value


------------------------------
---------MORE EXAMPLES--------
------------------------------

* inner functions with closure over outer functions...

    -> store references to outer-function-scope (not by value)

---
// example code

function cityLocation() {
  var city = "Paris";

  return {
    get: function() { print(city); },
    set: function(newCity) { city = newCity; }
  }
}

var myLocation = cityLocation();

myLocation.get();     // = Paris
mylocation.set("Sydney");
myLocation.get();     // = Sydney
---

* get() and set() are both closing over inner-cityLocation()

* get() and set() refer to 'city' variable

* get() and set() do NOT store outer variable 'city' value
      -> only reference to that outer variable

* variables in closures are automatically hidden
      -> private data

* we can only access the hidden 'city' outer variable
      by directly calling the get() and set() closures


------------------------------
----------CALLBACKS-----------
------------------------------

* functions are first-class objects in JS

* functions can be passed in to other functions
      and be returned etc

* higher-order function
    = function that takes other functions as arguments

* callback function
    = function passed as argument to higher-order function

---
// example code of callbacks

function showMessage(message) {

  setTimeout(function callAlert() {
    alert(message);
  }, 3000);
}

showMessage('Function called 3 seconds ago');
---

* setTimeout() = higher-order function
      -> takes other function as argument = callAlert()

* callAlert() = callback function
      -> passed as argument to higher-order setTimeout()


---------------------

* closure only happens when inner function has access to
        outer function variables (references to them)
        and can manipulate them outside of lexical scope

---------------------

* review above code example:
    -> setTimeout() = higher-order function
          takes other function as argument = callAlert()

    -> callAlert() = callback function
          passed as argument to higher-order function
                == setTimeout()


---------------------

* our own callback function!

---
// example code of callbacks

function fullName(firstName, lastName, callback) {

  print("My name is " + firstName + " " + lastName);
  callback(lastName);
}

var greeting = function cb(ln) {
  print("Welcome Mr. " + ln);
};

fullName("Jackie", "Chan", greeting);
---

* fullName() = higher-order function
      -> takes a function as an argument (callback)

* greeting = cb() = callback
      -> is passed as argument into higher-order function
          == fullName()

* the callback is passed as a function definiton
      -> this is NOT a function call

* function call would execute immediately
      -> this is NOT the idea of a callback

-------------
SO: IMPORTANT
-------------

* callback function is passed as definition to be executed later

* callbacks behave like they are actually part of the
        lexical scope of the higher-order function

* in this way, callbacks = closure!

---------------------

* callbacks can be named or anonymous as variables
      or within the higher-order param call

---
// example code passing higher-order function callback directly

function fullName(firstName, lastName, callback) {
  print("My name is " + firstName + " " + lastName);
  callback(lastName);
}

fullName("Jackie", "Chan", function(ln){ print("Welcome Mr. " + ln); });
---

* callback was anonymous function within
      the fullName() call (params)

---------------------

* callbacks are passed as parameter to higher-order function

* callbacks are passed as definition to be executed later

* thus, callbacks are called out of lexical scope
      = closure

---
// example code with callbacks

function fullName(firstName, lastName, callback) {

  print("My name is " + firstName + " " + lastName);
  callback(lastName);
}

fullName("Jackie", "Chan", function callItBack(ln) { print("Welcome Mr. " + ln);});
---

#########################################################

// reviewing closures from sitepoint

------------------------------------------------
-------------------CALLBACKS--------------------
------------------------------------------------

* callbacks allow code reuse -> generalization and reusability

---
// example code of repetition

function publish(item, author, callback) {
  print(item);
  var date = new Date();

  callback(author, date);
}

function messages(author, time) {
  var sendTime = time.toLocaleTimeString();
  print("Sent from " + author + " at " + sendTime);
}

function articles(author, date) {
  var pubDate = date.toDateString();
  print("Written by " + author);
  print("Published " + pubDate);
}

publish("How are you?", "Monique", messages);

publish("10 Tips for JS", "Jane Doe", articles);
---

* publish() -> generic function that handles data for
    both messages() and articles()

* messages() and articles() = callbacks

------------------------------------------------
----Immediately-Invoked Function Expressions----
------------------------------------------------

---
// example code IIFEs

(function () {
  alert("Woohoo!");
})();

// or

(function () {
  alert("Woohoo!");
})());

// if assigning to a var

var sayWoohoo = function () {
  alert("Woohoo!");
}();

// passing in params

(function (name, profession) {
  print("My name is " + name + ". I'm an " + profession + ".");
})("Jackie Chan", "afrojack");
---

-> if you pass in 'global' as a param into a IIFE...

* IIFE is now accessible inside of the function

* without having to use 'window' object

* thus, code is independent of browser environment

*

---
// example code of passing in global

(function (global) {
  // access the global object via 'global'
})(this);
</code></pre>

<p>This code will work both in the browser (global object = <code>window</code>)
      and in Node.js environment (global = <code>global</code>) </p>

(function() {
  var today = new Date();
  var currentTime = today.toLocaleTimeString();
  print(currentTime);           // output = current local time
})();

print(currentTime);             // output = undefined
---

* all variables inside of IIFE = local

* the 'currentTime' outside of the IIFE is undefined

---------------------
NOTE -> closures are linked to variables as references
        NOT linked to the value of the var
---------------------

* remember: all variables inside of IIFE = local


--------------------------

* closure refers to var via reference (not to the value of var)

---
// example code of closures + IIFE

function printFruits(fruits) {
  for (var i=0; i<fruits.length; i++) {
    setTimeout(function() {
      print(fruits[i]);
    }, i*1000);
  }
}

printFruits(["Lemon", "Orange", "Mango", "Banana"]);
---


#########################################################
// back to YDKJS -> review closure / IIFE

* each iteration of a for loop does not capture
    a copy of 'i'

* all iterations of a for loop are closed over
    the same shared global scope = one 'i'

---
// example code of for loop closing over same global

for (var i=1; i<=5; i++) {
  setTimeout(function timer() {
    print(i);
  }, i*1000);
}
---

* setTimeout() gets a reference to a single var in global scope = 'i'

* iterate over 'i' -> same shared global scope

* need to setup Scope to hold each iteration of scope
      -> IIFE

---
// example code creating scope to capture each iteration of for loop

for (var i=1; i<=5; i++) {
  (function scopeIIFE(j) {
    setTimeout(function timer() {
      print(j);
    }, j*1000);
  })(i);
}

// or

for (var i=1; i<=5; i++) {
  (function scoepIIFE() {
    var j = i;
    setTimeout(function timer() {
      print(j);
    }, j*1000);
  })();
}

// or using the beauty of the 'let' keyword = Block-scope!

for (let i=1; i<=5; i++) {
  setTimeout(function timer() {
    print(i);
  }, i*1000);
}
---

#########################################################
// YDKJS -> Modules

* module are function (thus objects) that are invoked as instances

* module can have private data, private function, etc

---
// example code of module

function CoolModule() {
  var something = "cool";
  var another = [1, 2, 3];

  function doSomething() {
    print(something);
  }

  function doAnother() {
    print(another.join(" ! "));
  }

  return {
    doSomething: doSomething,
    doAnother: doAnother
  };
}

var foo = CoolModule();
---

* we create an instance of the module CoolModule()

* CoolModule() is just a function

* CoolModule() returns an object...

* return object-literal { key: value, ... }

* returned object (from object-literal) has references to inner functions
      of module

* although references to inner functions, NOT references to inner data var

* object-literal returned from CoolModule()
        -> is like a public API for our module

* jQuery works by returning an inner function rather than an object-literal

------------------------------------------------
------Difference between module and object------
------------------------------------------------

* an object can have a function property

* an object can be returned from a function invocation
      without closured functions

* to be a module...
      -> outer enclosing function that is invoked
      -> enclosing function returns at least one inner function
      -> returned inner function has closure over private scope
      -> returned inner function can access / modify private state

* can create single-instance module

---
// example code of a single instance module

var foo = (function CoolModule() {
  var something = "cool";
  var another = [1, 2, 3];

  function doSomething() {
    print(something);
  }

  function doAnother() {
    print(another.join("!"));
  }

  return {
    doSomething: doSomething,
    doAnother: doAnother
  };
})();
---

* single instance module uses IIFE


------------------------------------------------
-------Slightly more advanced module use--------
------------------------------------------------

var foo = (function CoolModule(id) {

  function change() {
    //modifying the public API
    publicAPI.identify = identify2;
  }

  function identify1() {
    print(id);
  }

  function identify2() {
    print(id.toUpperCase());
  }

  var publicAPI = {
    change: change,
    identify: identify1
  };

  return publicAPI;
})("foo module");

foo.identify();     // foo module
foo.change();
foo.identify();     // FOO MODULE
---

* since module = function, can take params

* inner reference to public API object inside module instance
    allows you to modify module instance from the inside

* can add / remove methods and properties, and change values
    because inner reference to public API object inside module instance


------------------------------------------------
-----Extending the module -> modern module------
------------------------------------------------

* wrap up pattern of module dependency loaders / managers

---
// example code of proof of concept for wrap up module pattern

var myModules = (function Manager() {
  var modules = {};

  function define(name, deps, impl) {
    for (var i=0; i<deps.length; i++) {
      deps[i] = modules[deps[i]];
    }
    modules[name] = impl.apply(impl, deps);
  }

  function get(name) {
    return modules[name];
  }

  return {
    define: define,
    get: get
  };
})();
---

* impl.apply(impl, deps) -> invoke definition wrapper function
      -> pass in any dependencies
      -> store return value (= module API) into internal list of modules
      -> internal list of modules are tracked by name

* lets see everything in action!

---
// example code of total module + wrapper use

// take MyModules (module IIFE) from above...
MyModules.define("bar", [], function () {
  function hello(who) {
    return "Let me introduce: " + who;
  }

  return {
    hello: hello
  };
});

// so 'bar' has no dependencies
// but 'foo' has a dependecy of 'bar'

MyModules.define("foo", ["bar"], function (bar) {
  var hungry = "hippo";

  function awesome() {
    print(bar.hello(hungry).toUpperCase());
  }

  return {
    awesome: awesome
  };
});

var bar = MyModules.get("bar");
var foo = MyModules.get("foo");

print(bar.hello("hippo"));      // Let me introduce: hippo

foo.awesome();                  // LET ME INTRODUCE: HIPPO
---

* 'foo' module and 'bar' module are defined with function
      -> that returns a public API






#########################################################
THE END
#########################################################
THE END
#########################################################

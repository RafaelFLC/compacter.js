/**
 * this is a fully comment
 */

var x = 0; 
var y = 2; 

 // this is a inline comment
const func = () => {
    console.log( /**hard comment */ 'new func'); // another inline comment
   _new( y );
 }

function _new ( x ) {
   console.log(x);
   other();
   return x + 1;

 }

function other () {
   console.log('in other function');
 }

func();
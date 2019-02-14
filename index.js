const program  = require( 'commander' );
const compc = require( './App/compacter' );

program
    .command( 'add [files...]' )
    .alias( 'a' )
    .action( paths => {

        var response = compc( paths );

        console.log( response );
    });

program
    .version( '0.0.1' )
    .parse( process.argv );

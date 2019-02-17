const fs = require( 'fs' );

let message;

let result;

let dirs;


const compc = ( _paths ) => {

    if ( validate( _paths ) ) {

        dirs.filter( item => item.exist.result == true )
        .map( item => {

            if ( item.exist.isDir ) {



            } else if ( item.exist.isFile ) {

                process( item.path );

            }

        })

    }
    
    return { message, result };

}



function process ( _file ) {

    let split = _file.split( '.' );

    let length = split.length - 1;

    let fname = split[ length - 1 ].replace('/', '') + '-original.' + split[ length ];

    let content = '';

    // fs.rename( _file, fname , err => {
    //     if (err) {
    //         console.log( 'error', err );
    //         return;
    //     }

    //     console.log( '\r\n ... file renamed successfully' );
    // });

    console.log( 'init processin file ... ' + _file + '\r\n' );

    fs.readFile( _file, 'utf8', (err, content) => {

        // remove all comments 
        let origin = content
            .replace( /\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm , '' )
            .replace( /(\r\n|\n|\r)/gm, '' )
            .replace( /(}(?!;))/g, '}; ' )
            .replace( /\s\s+/g, ' ');
        // replace the break and the tabs line with space
        

        console.log( origin );

        // for( var i = 0; i < origin.length; i++ ){
        //     console.log( origin[i] );
        // }


    });


    // fs.writeFile( _file, '/* new file */', (err) => {
    //     if (err) throw err;
    
    //     console.log("The file was succesfully saved!");
    // }); 



}

function validate ( _paths ) {

    const end = ( _result, _params ) => {

        if ( _params !== undefined && _params instanceof Array )
            [ result, message ] = _params;

        return _result;
    }

    if ( _paths === undefined || _paths === null )
        return end( false, [ 500, 'paths doesn\'t found' ] );

    if ( _paths instanceof Array ) {

        if ( _paths.length === 0 ) 
            return end( false, [ 500, 'paths doesn\'t found' ] );

        dirs = _paths.map( path => { return { exist : exist( path ), path } });

        let result = dirs.filter( item => item.exist.result == false );

        if ( result.length === dirs.length )
            return end( false, [ 501, 'None of the paths exists' ] );
        else if ( result.length > 0 ) {

            let msg = 'Paths than doesn\'t found ( '+ result.length +' ) : ' + 
                    result.map( item => item.path ).join( ', \r\n' );

            return end(true, [ 0, msg ]);

        }

        return end( true );
        
    } else {

        let exist = exist( _paths );

        if ( ! exist.result )
            return end( false, [ 500, 'path doesn\'t found' ] );
        else {
            dirs = [{ exist, path: _paths }]; 
            return end( true );
        }
    }

}


function exist ( path ) {

    if ( ! fs.existsSync( path ) ) {
        return { result: false }
    }

    let stats = fs.lstatSync( path );

    if ( stats )
        return {
                result: true, 
                isDir: stats.isDirectory(), 
                isFile: stats.isFile()
            }
    else 
        return { result: false,  stats: stats }
}

String.prototype.Clear = function (unicode = 'NFD') {
    return this.normalize(unicode)
        .replace('/', '');
}

module.exports = compc;


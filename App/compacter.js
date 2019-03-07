const fs = require( 'fs' );

const log = require( './log' );

let message;

let result;

let dirs;

const compc = ( _paths ) => {

    log( 'initializing the compacter module...' );

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

    fs.stat( _file, (err, stats) => {

        log( 'Processing -f ' + _file + ' { size : '+ getFileSize(stats.size) +' } ' );

    });

    let initTime = new Date().getTime();

    let endTime;

    let split = _file.split( '.' );

    let length = split.length - 1;

    let fname = split[ length - 1 ] + '-original.' + split[ length ];

    fs.readFile( _file, 'utf8', (err, content) => {

        // remove all comments 
        // replace the break and the tabs line with space
        // replace the break line with a space
        let origin = content
            .replace( /\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm , '' )
            .replace( /<!--(.*?)-->/g, '' );
            // .replace( /(}(?!;))/g, '}; ' )

        let matchs = origin.match( /[^;]$/gm );

        

        origin.replace( /(\r\n|\n|\r)/gm, '' )
            .replace( /\s\s+/g, ' ');

        fs.rename( _file, fname , err => {
            if (err) {
                console.log( 'error', err );
                return;
            }

            log( 'file renamed successfully to [' + fname + ']' );
        });


        fs.writeFile( _file, origin, (err) => {
            if (err) throw err;
    
            endTime = new Date().getTime();

            log('The file was succesfully saved!');

            log( getTime( endTime - initTime ) );

        }); 

        // for( var i = 0; i < origin.length; i++ ){
        //     console.log( origin[i] );
        // }


    });
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

function getFileSize(fileSize) {
    if (fileSize > 1000000000) {
        return (fileSize / 1000000000.0)
            .toPrecision(3) + " gigabytes";
    } else if (fileSize > 1000000) {
        return (fileSize / 1000000.0)
            .toPrecision(3) + " megabytes";
    } else if (fileSize > 1000) {
        return (fileSize / 1000.0)
            .toPrecision(3) + " kilobytes";
    } else {
        return fileSize + " bytes"
    }
}

function getTime ( timeMs ) {

    let ms = 1000; 
    let s = ms * 60;
    let min = s * 60; 
    let h = min * 60; 

    let unity = '';

    if ( timeMs >= h )
        unity = (timeMs / h) + ' h'; 
    else if ( timeMs >= min )
        unity = ( timeMs / min ) + ' m'; 
    else if ( timeMs >= s )
        unity = ( timeMs / s ) + ' s'; 
    else 
        unity = ( timeMs / ms ) + ' ms';

    return unity;

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


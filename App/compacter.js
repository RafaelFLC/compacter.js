const fs = require( 'fs' );

const compc = ( _paths ) => {

    let message;

    let result;

    let dirs;

    if ( validate( _paths ) ) {

        dirs.map

        console.log( dirs );

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

        let stats = fs.lstatSync( path );

        if ( stats )
            return {
                    result: true, 
                    isDir: stats.isDirectory(), 
                    isFile: stats.isFile()
                }
        else 
            return {
                result: false, 
                stats: stats
            }

    }
    
    return {
        message, 
        result
    };

}

module.exports = compc;


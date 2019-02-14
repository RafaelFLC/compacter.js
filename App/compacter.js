const compc = ( _paths ) => {

    let message;

    let result;

    let dirs;

    if ( validate( _paths ) ) {

        // message = 'after log paths...';
        // result = 201;

        console.log( JSON.stringify(dirs) );

    }

    function validate ( _paths ) {

        if ( _paths === undefined || _paths === null )
            return end( false, [ 500, 'paths doesn\'t found' ] );

        if ( _paths instanceof Array ) {

            if ( _paths.length === 0 ) 
                return end( false, [ 500, 'paths doesn\'t found' ] );
            else {

                dirs = _paths.map( path => { 
                    return { 
                        exist : exist( path ), 
                        path
                    }
                });

                let result = dirs.filter( item => item.exist == false );

                if ( result.length === dirs.length )
                    return end( false, [ 501, 'None of the paths exists' ] );

                return end( true, [ 200, 'all ok' ] );

            }
            
        } else
            if ( ! exist( _paths ) )
                return end( false, [ 500, 'path doesn\'t found' ] );
            // else 

        return end( true, [ 201, 'all oki' ] );

        function exist ( path ) {

            // console.log( path );

            return true;

        }

        function end ( _result, _params = null ) {

            if ( _params !== undefined && _params instanceof Array )
                [ result, message ] = _params;

            return _result;

        }

    }
    
    return {
        message, 
        result
    };

}

module.exports = compc;


const compc = ( paths ) => {

    let message;

    let result;

    if ( validate( paths ) ) {

        message = 'after log paths...';
        result = 201;

    }

    function validate ( paths ) {

        if ( paths === undefined )
            end( false, [ 500, 'paths doesn\'t found' ] );

        function end ( result, params ) {
            
            if ( params !== undefined && params instanceof Array )
                [ result, message ] = params;

            return result;

        }

    }
    
    return {
        message, 
        result
    };

}

module.exports = compc;


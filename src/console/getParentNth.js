
function getParentNth( el ) {

    if ( el.hasAttribute( 'data-nth' ) ) {

        return el.getAttribute( 'data-nth' )

    } else {

        return this.getParentNth( el.parentNode )

    }

}

export default getParentNth

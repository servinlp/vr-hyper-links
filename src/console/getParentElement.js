
function getParentElement( el ) {

    if ( el.classList.contains( 'open' ) ) {

        return el

    } else {

        return this.getParentElement( el.parentNode )

    }

}

export default getParentElement

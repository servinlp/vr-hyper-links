
import { isNode, isElement } from './isElement'

function setElement( value, element, topElement = true ) {

    const el = document.createElement( element )

    switch ( typeof value ) {

    case 'string':

        el.classList.add( 'string' )
        el.innerHTML = `"${value}"`

        break

    case 'function':

        el.classList.add( 'function' )
        el.innerHTML = `${value.toString().substring( 0, value.toString().indexOf( '{' ) + 1 )}...}`

        break

    case 'number':

        el.classList.add( 'number' )
        el.innerHTML = value

        break

    case 'boolean':

        el.classList.add( 'boolean' )

        if ( value === 'true' ) {

            el.classList.add( 'true' )

        } else {

            el.classList.add( 'false' )

        }

        el.innerHTML = value

        break

    case 'object':

        if ( Array.isArray( value ) ) {

            el.appendChild( this.renderArray( value, topElement ) )
            el.classList.add( 'array' )

        } else if ( !value ) {

            el.classList.add( 'null' )
            el.innerHTML = 'null'

        } else if ( isNode( value ) && isElement( value ) ) {

            el.classList.add( 'node' )

            if ( topElement ) {

                el.classList.add( 'arrow' )
                el.innerHTML = value.toString()

            } else {

                el.appendChild( this.renderObject( value, topElement ) )

            }


        } else {

            el.appendChild( this.renderObject( value, topElement ) )
            el.classList.add( 'object' )

        }

        break

    case 'undefined':

        el.classList.add( 'undefined' )
        el.innerHTML = value

        break

    default:

    }

    return el

}

export default setElement

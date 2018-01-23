
import setElement from './console/setElement'

import { renderObject, onfoldObject, setObjectLi, setProtoLi } from './console/renderObject'
import { renderArray, onfoldArray, setArrayLi } from './console/renderArray'

import getParentNth from './console/getParentNth'
import getParentElement from './console/getParentElement'

import getParentArrayOrObject from './console/getParentArrayOrObject'
import getChildArrayOrObject from './console/getChildArrayOrObject'

function PrintConsole( target ) {

    this.target = target
    this.contents = []

    this.log = value => {

        console.log( value )

        const element = this.setElement( value, 'p' )

        element.setAttribute( 'data-nth', this.contents.length )
        this.contents.push( value )

        this.target.appendChild( element )

    }

}

PrintConsole.prototype.setElement = setElement

PrintConsole.prototype.renderObject = renderObject
PrintConsole.prototype.onfoldObject = onfoldObject
PrintConsole.prototype.setObjectLi = setObjectLi
PrintConsole.prototype.setProtoLi = setProtoLi

PrintConsole.prototype.renderArray = renderArray
PrintConsole.prototype.onfoldArray = onfoldArray
PrintConsole.prototype.setArrayLi = setArrayLi

PrintConsole.prototype.getParentNth = getParentNth
PrintConsole.prototype.getParentElement = getParentElement

PrintConsole.prototype.getParentArrayOrObject = getParentArrayOrObject
PrintConsole.prototype.getChildArrayOrObject = getChildArrayOrObject


export default PrintConsole

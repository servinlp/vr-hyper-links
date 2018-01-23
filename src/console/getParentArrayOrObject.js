
function getParentArrayOrObject( parentArray, parentElement, path, first = false ) {

    let returnArray

    if ( parentElement.nodeName === 'SPAN' ) {

        let currArrNth = parentElement.parentNode.firstChild.innerHTML

        if ( isNaN( parseInt( currArrNth ) ) ) {

            if ( currArrNth.substring( currArrNth.length - 2, currArrNth.length ) === ': ' ) {

                currArrNth = currArrNth.substring( 0, currArrNth.length - 2 )

            }

        } else {

            currArrNth = parseInt( currArrNth )

        }

        if ( !first ) {

            path.unshift( currArrNth )

        }

        returnArray = this.getChildArrayOrObject( parentArray, this.getParentElement( parentElement.parentNode ), path, false )

    } else {

        let tmpArrayHolder = parentArray

        path.forEach( el => {

            tmpArrayHolder = tmpArrayHolder[el]

        })

        returnArray = tmpArrayHolder

    }

    return returnArray

}

export default getParentArrayOrObject

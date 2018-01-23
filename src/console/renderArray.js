
function renderArray( value, topElement ) {

    const arrayElement = document.createElement( 'span' )
    arrayElement.classList.add( 'array' )

    if ( topElement ) {

        arrayElement.textContent += `(${value.length})[`

        let charLength = value.length.toString().length + 3

        // value.forEach( ( el, i ) => {
        for ( let i = 0; i < value.length; i++ ) {

            const el = value[i]

            if ( typeof el === 'object' && Array.isArray( el ) ) {

                charLength += `Array(${el.length})`.length

            } else if ( typeof el === 'object' ) {

                charLength += 4

            } else if ( typeof el === 'undefined' ) {

                charLength += 9

            } else {

                charLength += el.toString().length

            }

            if ( charLength >= 50 ) {

                arrayElement.innerHTML += '...'
                break

            }

            arrayElement.appendChild( this.setElement( el, 'span', false ) )

            if ( i + 1 !== value.length ) {

                arrayElement.innerHTML += ', '

            }

        }

        arrayElement.innerHTML += ']'

        arrayElement.addEventListener( 'click', () => {

            this.onfoldArray( arrayElement )

        })

    } else {

        arrayElement.textContent += `Array(${value.length})`

    }

    return arrayElement

}

function onfoldArray( el ) {

    const parent = el.parentNode

    parent.classList.toggle( 'open' )

    if ( !parent.querySelector( 'ul' ) ) {

        const unfolded = document.createElement( 'ul' ),
            currNth = this.getParentNth( parent )

        let currEl


        if ( parent.nodeName === 'SPAN' ) {

            const proto = parent.parentNode.firstChild.innerHTML.includes( '__proto__' )

            if ( proto ) {

                currEl = Object.getPrototypeOf( this.getParentArrayOrObject( this.contents[currNth], parent, [], true ) )

            } else {

                currEl = this.getChildArrayOrObject( this.contents[currNth], parent, [] )

            }

        } else {

            currEl = this.contents[currNth]

        }

        unfolded.classList.add( 'arrayUl' )

        if ( Array.isArray( currEl ) && currEl[0] ) {

            currEl.forEach( ( currArr, i ) => {

                unfolded.appendChild( this.setArrayLi( currArr, i ) )

            })

            unfolded.appendChild( this.setArrayLi( currEl.length, 'length', true ) )

            unfolded.appendChild( this.setArrayLi( Object.getPrototypeOf( currEl ), '__proto__', true ) )

        } else {

            const protoObject = Object.getPrototypeOf( currEl ),
                protoNames = Object.getOwnPropertyNames( protoObject )

            protoNames.forEach( item => {

                unfolded.appendChild( this.setObjectLi( item, Object, true ) )

            })

        }

        parent.appendChild( unfolded )

    }

}

function setArrayLi( el, i, opacity = false ) {

    const li = document.createElement( 'li' ),
        textNum = document.createElement( 'span' )

    if ( opacity ) {

        textNum.classList.add( 'opacity' )

    }

    textNum.classList.add( 'arrayNumber' )
    textNum.innerHTML = i

    li.appendChild( textNum )
    li.innerHTML += ': '
    li.appendChild( this.setElement( el, 'span' ) )

    return li

}

export {
    renderArray,
    onfoldArray,
    setArrayLi
}

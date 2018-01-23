
function renderObject( value, topElement = true ) {

    const objectElement = document.createElement( 'span' )
    objectElement.classList.add( 'object' )

    let charCount = 0

    objectElement.innerHTML = '{'
    charCount += 1

    if ( topElement ) {

        for ( const curr in value ) {

            charCount += curr.length

            // if ( value[curr] instanceof TypeError ) {
            //
            //     console.log( 'its a typeerror' )
            //
            // } else {
            //
            //     console.log( 'not a TypeError' )
            //
            // }
            try {

                if ( typeof value[curr] === 'object' && Array.isArray( value[curr] ) ) {

                    charCount += `Array(${value[curr].length})`.length

                } else if ( typeof value[curr] === 'object' ) {

                    charCount += 4

                } else {

                    charCount += value[curr].toString().length

                }

                if ( charCount >= 50 ) {

                    objectElement.innerHTML += '...'
                    break

                }

                objectElement.innerHTML += `${curr}: `
                objectElement.appendChild( this.setElement( value[curr], 'span', false ) )
                objectElement.innerHTML += ', '

            } catch ( e ) {

                if ( e instanceof TypeError ) {

                    console.log( 'its a TypeError' )
                    console.log( e )

                }

            }

        }

        objectElement.addEventListener( 'click', () => {

            this.onfoldObject( objectElement )

        })

    } else {

        objectElement.innerHTML += '...'

    }

    objectElement.innerHTML += '}'

    return objectElement

}

function onfoldObject( el ) {

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

        unfolded.classList.add( 'objectUl' )

        if ( Object.getPrototypeOf( currEl ) ) { // if it has prototypes

            for ( const currObj in currEl ) {

                unfolded.appendChild( this.setObjectLi( currObj, currEl ) )

            }

            unfolded.appendChild( this.setProtoLi( Object.getPrototypeOf( currEl ), '__proto__', true ) )

        } else {

            for ( const protoName in Object ) {

                unfolded.appendChild( this.setObjectLi( protoName, currEl, true ) )

            }

        }

        parent.appendChild( unfolded )

    }

}

function setProtoLi( value, valueName, opacity = false ) {

    const li = document.createElement( 'li' ),
        textNum = document.createElement( 'span' )

    if ( opacity ) {

        textNum.classList.add( 'opacity' )

    }

    const title = document.createElement( 'span' )

    title.innerHTML = `${valueName}: `
    title.classList.add( 'objectValue' )

    li.appendChild( title )

    li.appendChild( this.setElement( value, 'span' ) )

    return li

}

function setObjectLi( curr, el, opacity = false ) {

    const li = document.createElement( 'li' ),
        textNum = document.createElement( 'span' )

    if ( opacity ) {

        textNum.classList.add( 'opacity' )

    }

    const title = document.createElement( 'span' )

    title.innerHTML = `${curr}: `
    title.classList.add( 'objectValue' )

    li.appendChild( title )

    li.appendChild( this.setElement( el[curr], 'span' ) )

    return li

}

export {
    renderObject,
    onfoldObject,
    setObjectLi,
    setProtoLi
}

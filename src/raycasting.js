/* global THREE */
import { camera, mouse, raycaster, links } from './base'
import { controller } from './setController'

let lastIntersected

function rayIntersects() {

	const intersectPromise = new Promise( ( resolve, reject ) => {

		const tempMatrix = new THREE.Matrix4()

		tempMatrix.identity().extractRotation( controller.matrixWorld )
		raycaster.ray.origin.setFromMatrixPosition( controller.matrixWorld )
		raycaster.ray.direction.set( 0, 0, -1 ).applyMatrix4( tempMatrix )

		const intersectsWith = raycaster.intersectObjects( links )

		if ( intersectsWith.length > 0 ) {

			lastIntersected = intersectsWith[ 0 ]
			resolve( intersectsWith[ 0 ] )

		} else {

			reject( lastIntersected )

		}

	})

	return intersectPromise

}

function mouseRayIntersects() {

	const intersectPromise = new Promise( ( resolve, reject ) => {

		raycaster.setFromCamera( mouse, camera )

		const intersectsWith = raycaster.intersectObjects( links )

		if ( intersectsWith.length > 0 ) {

			lastIntersected = intersectsWith[ 0 ]
			resolve( intersectsWith[ 0 ] )

		} else {

			reject( lastIntersected )

		}

	})

	return intersectPromise

}

export { rayIntersects, mouseRayIntersects }

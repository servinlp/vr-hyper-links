/* global TweenMax, Elastic, Bounce */

import { camBox, faceBox } from './base'
import WEBVR from './WebVR'
import { mouseRayIntersects, rayIntersects } from './raycasting'

let rayCast

WEBVR.checkAvailability()
	.then( () => {

		rayCast = rayIntersects

	})
	.catch( () => {

		rayCast = mouseRayIntersects

	})

function GTAEffect() {

	const speed = 1.3,
		pos = camBox.position

	TweenMax.to( pos, speed, {
		z: 		35,
		onComplete: () => {

			TweenMax.to( pos, speed, {
				y: 		13.8,
				onComplete: () => {

					TweenMax.to( pos, speed, {
						z:  5
					}, { ease: Elastic.easeOut })

				}
			}, { ease: Elastic.easeOut })

		}
	}, { ease: Elastic.easeOut })

}

function toFloor() {

	const pos = camBox.position

	TweenMax.to( pos, 1.5, { y: 18 }, { ease: Elastic.easeOut })

}

function blankScreen() {

	TweenMax.to( faceBox.material, 0.3, {
		opacity: 	1,
		onComplete: function onComplete() {

			camBox.translateY( 8 )

			TweenMax.to( faceBox.material, 0.3, { opacity: 0 }, { ease: Elastic.easeOut })

		}
	}, { ease: Elastic.easeOut })

}

function fadeBackHome() {

	TweenMax.to( faceBox.material, 0.3, {
		opacity: 	1,
		onComplete: function onComplete() {

			camBox.position.y = 1.8

			TweenMax.to( faceBox.material, 0.3, { opacity: 0 }, { ease: Elastic.easeOut })

		}
	}, { ease: Elastic.easeOut })

}

function jumpTransition() {

	camBox.translateY( 4 )

}

function backHome() {

	camBox.position.y = 1.8

}

function loadScreen() {

	const loader  = faceBox.getObjectByName( 'loader' )

	TweenMax.to( faceBox.material, 0.3, {
		opacity: 	1,
		onComplete: function onComplete() {

			camBox.position.y = 21.8

			TweenMax.to( faceBox.material, 0.3, { opacity: 0, delay: 3 }, { ease: Elastic.easeOut })

			TweenMax.to( loader.material, 0.3, {
				opacity: 0,
				delay: 3,
				onComplete: () => {

					loader.rotation.z = 0

				}
			}, { ease: Elastic.easeOut })

		}
	}, { ease: Elastic.easeOut })

	TweenMax.to( loader.material, 0.3, {
		opacity: 1
	}, { ease: Elastic.easeOut })

	TweenMax.to( loader.rotation, 3, {
		z: Math.PI * 6
	}, { ease: Bounce.easeInOut })

}

function vrClick() {

	rayCast()
		.then( el => {

			if ( el.object.clickAction ) {

				el.object.clickAction()

			}

		})
		.catch( () => {})

}

export {
	vrClick,
	blankScreen,
	jumpTransition,
	backHome,
	fadeBackHome,
	GTAEffect,
	toFloor,
	loadScreen
}

/* global THREE */

import { statsInit } from './stats'
import WEBVR from './WebVR'
import {
	scene,
	camera,
	renderer,
	mouse,
	mainConsole
} from './base'
import { rayIntersects, mouseRayIntersects } from './raycasting'
import { controller, setController } from './setController'
import { vrClick } from './transitions'
import linkies from './links'

function init() {

	console.log( linkies )

	WEBVR.checkAvailability()
		.then( () => {

			WEBVR.getVRDisplay( display => {

				mainConsole.log( 'display' )
				mainConsole.log( display )

				renderer.vr.enabled = true
				renderer.vr.setDevice( display )

				window.addEventListener( 'gamepadconnected', e => {

					mainConsole.log( 'gamepadconnected event' )
					mainConsole.log( e )

					setController()

				})

				document.body.appendChild( WEBVR.getButton( display, renderer.domElement ) )

			})

		})
		.catch( message => {

			mainConsole.log( message )

		})

	window.addEventListener( 'resize', onWindowResize )

	const helper = new THREE.AxisHelper( 3 )
	scene.add( helper )

	animate()

}

init()

function animate() {


	WEBVR.checkAvailability()
		.then( () => {

			renderer.animate( VRrender )

		})
		.catch( () => {

			window.addEventListener( 'mousemove', onMouseMove )
			renderer.animate( render )

		})

}

function VRrender() {

	if ( controller ) {

		controller.update()

	}

	rayIntersects( controller )
		.then( el => {

			controller.getObjectByName( 'controllerLine' ).material.color = new THREE.Color( 0xff0000 )

			if ( el.object.name === 'plane' ) {

				el.object.parent.getObjectByName( el.object.target ).material.opacity = 0.5

			} else {

				el.object.material.opacity = 0.5

			}

		}).catch( lastEl => {

			controller.getObjectByName( 'controllerLine' ).material.color = new THREE.Color( 0x0000ff )

			if ( lastEl ) {

				document.body.classList.remove( 'cursor' )

				if ( lastEl.object.name === 'plane' ) {

					lastEl.object.parent.getObjectByName( lastEl.object.target ).material.opacity = 1

				} else {

					lastEl.object.material.opacity = 1

				}

			}

		})

	renderer.render( scene, camera )

}

function render() {

	mouseRayIntersects()
		.then( el => {

			document.body.classList.add( 'cursor' )

			if ( el.object.name === 'plane' ) {

				el.object.parent.getObjectByName( el.object.target ).material.opacity = 0.5

			} else {

				el.object.material.opacity = 0.5

			}

		}).catch( lastEl => {

			if ( lastEl ) {

				document.body.classList.remove( 'cursor' )

				if ( lastEl.object.name === 'plane' ) {

					lastEl.object.parent.getObjectByName( lastEl.object.target ).material.opacity = 1

				} else {

					lastEl.object.material.opacity = 1

				}

			}

		})

	renderer.render( scene, camera )

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight
	camera.updateProjectionMatrix()

	renderer.setSize( window.innerWidth, window.innerHeight )
	renderer.render( scene, camera )

}

function onMouseMove( event ) {

	mouse.x = ( ( event.clientX / window.innerWidth ) * 2 ) - 1
	mouse.y = ( -( event.clientY / window.innerHeight ) * 2 ) + 1

	// var rect = renderer.domElement.getBoundingClientRect();
	// mouse.x = ( ( event.clientX - rect.left ) / ( rect.width - rect.left ) ) * 2 - 1;
	// mouse.y = - ( ( event.clientY - rect.top ) / ( rect.bottom - rect.top) ) * 2 + 1;

}

renderer.domElement.addEventListener( 'click', vrClick )

statsInit()

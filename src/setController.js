/* global THREE */
import { camBox, mainConsole } from './base'
import { vrClick } from './transitions'

const controller = new THREE.GearVRController()

function setController() {

	mainConsole.log( 'controller' )
	mainConsole.log( controller )

	camBox.position.y = 1.8
	camBox.position.z = 5

	controller.setHand( 'right' )
	camBox.add( controller )

	const skyBox = {
		front: './images/C.jpg',
		back:  './images/E.jpg',
		left:  './images/D.jpg',
		right: './images/B.jpg',
		up:	   './images/A.jpg',
		down:  './images/F.jpg'
	}

	controller.setSkyBox( skyBox )

	const MTL = new THREE.MTLLoader()

	MTL.setPath( './obj/' )
	MTL.load( 'gear_vr_controller.mtl', materials => {

		materials.preload()

		const OBJ = new THREE.OBJLoader()
		OBJ.setMaterials( materials )
		OBJ.setPath( './obj/' )

		OBJ.load( 'gear_vr_controller.obj', obj => {

			obj.translateZ( -0.03 )
			controller.add( obj )

			const lineMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff }),
				geometry = new THREE.Geometry()

			geometry.vertices.push(
				new THREE.Vector3( 0, 0, 0 ),
				new THREE.Vector3( 0, 0, -5 )
			)

			const line = new THREE.Line( geometry, lineMaterial )

			line.name = 'controllerLine'

			controller.add( line )

			camBox.add( controller )

		})

	})

	// controller.addEventListener( 'triggerdown', vrClick )
	controller.addEventListener( 'click', vrClick )

}

export { controller, setController }

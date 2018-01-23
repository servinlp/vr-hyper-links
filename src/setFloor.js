/* global THREE */

import { scene, links } from './base'
import { backHome, fadeBackHome } from './transitions'

function setFloors( font ) {

	const floorHight = 4,
		boxGeometry = new THREE.BoxGeometry( 0.4, 0.4, 0.4 ),
		boxMaterial = new THREE.MeshBasicMaterial({ color: 0xacacac, transparent: true }),
		textureLoader = new THREE.TextureLoader(),
		groundColors = [0x6fffe9, 0x5bc0be, 0x3a506b, 0x466060, 0x57886c, 0x81a684, 0x4f345a, 0x5d4e6d, 0xfcfafa, 0xc8d3d5]

	textureLoader.load( './images/back-texture.jpg', texture => {

		boxMaterial.map = texture
		boxMaterial.needsUpdate = true

	})

	for ( let i = 0; i < 10; i++ ) {

		const geometry = new THREE.PlaneGeometry( 20, 20, 20 ),
			material = new THREE.MeshBasicMaterial({ color: groundColors[ i ], side: THREE.DoubleSide }),
			mesh = new THREE.Mesh( geometry, material )

		if ( i !== 0 ) {

			const boxMesh = new THREE.Mesh( boxGeometry, boxMaterial )
			boxMesh.translateY( ( i * floorHight ) + 3 )
			scene.add( boxMesh )
			links.push( boxMesh )

			if ( i === 1 ) {

				boxMesh.clickAction = backHome

			} else {

				boxMesh.clickAction = fadeBackHome

			}

		}

		mesh.translateY( ( i * floorHight ) - 0.5 )
		mesh.geometry.rotateX( ( Math.PI / 180 ) * 90 )
		mesh.receiveShadow = true
		mesh.castShadow = true

		const textGeometry = new THREE.TextGeometry( i, {
				font,
				size:   		0.3,
				height: 		0.001
			}),
			textMaterial = new THREE.MeshBasicMaterial({ color: 0x332ffe }),
			textMesh = new THREE.Mesh( textGeometry, textMaterial )

		textMesh.translateY( ( i * floorHight ) + 0.2 )
		textMesh.translateZ( -1 )

		scene.add( textMesh )
		scene.add( mesh )

	}

}

export default setFloors

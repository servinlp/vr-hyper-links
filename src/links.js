/* global THREE, base64js */

import { faceBox, scene, links } from './base'
import setFloors from './setFloor'
import {
	loadScreen,
	blankScreen,
	jumpTransition,
	GTAEffect,
	toFloor
} from './transitions'

const test  = 'hoi'

const sphereGeometry = new THREE.SphereGeometry( 0.3, 26, 26 ),
	sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xc9c9c9, transparent: true }),
	sphereMesh = new THREE.Mesh( sphereGeometry, sphereMaterial )

const sphereTexture = new THREE.TextureLoader()
sphereTexture.load( './images/link-texture.jpg', texture => {

	sphereMesh.geometry.rotateY( -( ( Math.PI / 180 ) * 90 ) )
	sphereMesh.material.map = texture
	sphereMesh.material.needsUpdate = true

})

sphereMesh.translateX( -1 )

sphereMesh.name = 'sphere'
sphereMesh.clickAction = blankScreen

sphereMesh.castShadow = true
sphereMesh.receiveShadow = true

scene.add( sphereMesh )
links.push( sphereMesh )


// Nu link
const planeGeometry = new THREE.PlaneGeometry( 1, 1, 1 ),
	planeMaterial = new THREE.MeshBasicMaterial({ color: 0xc9c9c9, transparent: true, side: THREE.DoubleSide }),
	plane = new THREE.Mesh( planeGeometry, planeMaterial )

plane.name = 'loadSphere'
plane.clickAction = loadScreen

plane.translateX( -1 )
plane.translateY( 1.5 )
scene.add( plane )
links.push( plane )

const planeTexture = new THREE.TextureLoader()
planeTexture.load( './images/nu.jpg', texture => {

	texture.wrapS = THREE.RepeatWrapping
	texture.wrapT = THREE.RepeatWrapping

	plane.material.map = texture
	plane.material.needsUpdate = true

	const torusGeometry = new THREE.TorusGeometry( 0.1, 0.02, 2, 100, Math.PI * 1.5 ),
		torusMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0 }),
		torusMesh = new THREE.Mesh( torusGeometry, torusMaterial )

	// torusMesh.position.z = -0.1
	torusMesh.name = 'loader'

	faceBox.add( torusMesh )

})

const loader = new THREE.FontLoader()

loader.load( './font/helvetiker_regular.typeface.json', font => {

	const textGeometry = new THREE.TextGeometry( 'Link', {
			font,
			size:   		0.1,
			height: 		0.001
		}),
		textMaterial = new THREE.MeshBasicMaterial({ color: 0x332ffe, transparent: true }),
		textMesh = new THREE.Mesh( textGeometry, textMaterial )

	textMesh.name = 'text'
	textMesh.receiveShadow = true
	textMesh.castShadow = true

	const lineMaterial = new THREE.LineBasicMaterial({
			color: 	   0x332ffe,
			linewidth: 3
		}),
		lineGeometry = new THREE.Geometry()

	lineGeometry.vertices.push(
		new THREE.Vector3( 0, -0.032, 0 ),
		new THREE.Vector3( 0.24, -0.032, 0 )
	)

	const line = new THREE.Line( lineGeometry, lineMaterial )

	const textContainer = new THREE.Object3D(),
		backPlaneGeometry = new THREE.PlaneGeometry( 0.5, 0.5, 0.5 ),
		backPlaneMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0 }),
		backPlane = new THREE.Mesh( backPlaneGeometry, backPlaneMaterial )

	backPlane.translateX( 0.12 )
	backPlane.translateY( 0.12 )

	backPlane.target = 'text'
	backPlane.name = 'plane'
	backPlane.clickAction = jumpTransition

	textContainer.add( textMesh )
	textContainer.add( line )
	textContainer.add( backPlane )

	links.push( backPlane )
	scene.add( textContainer )

	setFloors( font )

})

// Box link

const textureLoader = new THREE.TextureLoader()
textureLoader.load( './images/link-texture.jpg', texture => {

	const boxGeometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5 ),
		boxMaterial = new THREE.MeshBasicMaterial({ color: 0xc9c9c9, map: texture, transparent: true }),
		boxMesh = new THREE.Mesh( boxGeometry, boxMaterial )

	boxMesh.translateX( 1 )

	boxMesh.name = 'box'
	boxMesh.receiveShadow = true
	boxMesh.castShadow = true
	boxMesh.clickAction = GTAEffect

	scene.add( boxMesh )

	links.push( boxMesh )

})

// Sprite link

const svg = document.querySelector( 'svg' ),
	serializedXML = new XMLSerializer().serializeToString( svg ),
	base64encodedSVG = base64js.fromByteArray( new TextEncoder().encode( serializedXML ) ),
	img = document.createElement( 'img' )

img.setAttribute( 'src', `data:image/svg+xml;base64,${base64encodedSVG}` )

img.addEventListener( 'load', () => {

	const c = document.querySelector( '.htmlElement' ),
		ctx = c.getContext( '2d' ),
		imgBox = img.getBoundingClientRect(),
		canvasSize = 128
	c.width = canvasSize
	c.height = canvasSize
	ctx.drawImage( img, ( canvasSize / 2 ) - ( imgBox.width / 2 ), ( canvasSize / 2 ) - ( imgBox.height / 2 ) )

	const cTexture = new THREE.CanvasTexture( c ),
		spriteMaterial = new THREE.SpriteMaterial({
			map: 		 cTexture,
			alphaTest: 	 0.5,
			transparent: true,
			depthTest: 	 false,
			depthWrite:  false
		}),
		sprite = new THREE.Sprite( spriteMaterial )

	sprite.name = 'sprite'
	sprite.receiveShadow = true
	sprite.castShadow = true

	sprite.position.set( 2, 0, 0 )
	sprite.scale.set( 1, 1, 1 )

	sprite.clickAction = toFloor

	scene.add( sprite )

	links.push( sprite )

})

export default test

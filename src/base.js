/* global THREE */

import PrintConsole from './PrintConsole'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 )
camera.position.z = 5

const camBox = new THREE.Object3D(),
	faceBoxGeo = new THREE.BoxGeometry( 10, 10, 0.1 ),
	faceBoxMat = new THREE.MeshBasicMaterial({
		color: 		 0x000000,
		wireframe: 	 false,
		transparent: true,
		opacity: 	 0,
		side: 		 THREE.BackSide
	}),
	faceBox = new THREE.Mesh( faceBoxGeo, faceBoxMat )

faceBox.position.z = -1
faceBox.name = 'faceBox'

camera.add( faceBox )
camBox.add( camera )
scene.add( camBox )

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
renderer.setSize( window.innerWidth, window.innerHeight )
renderer.setPixelRatio( window.devicePixelRatio )
renderer.shadowMap.enabled = true
renderer.shadowMap.renderReverseSided = false

document.body.appendChild( renderer.domElement )

const raycaster = new THREE.Raycaster()

const mouse = new THREE.Vector2()

const links = []

const controls = new THREE.OrbitControls( camera, renderer.domElement )
controls.enableZoom = true

const mainConsole = new PrintConsole( document.querySelector( 'main' ) )

const hemLight = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 )
scene.add( hemLight )

const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 )

directionalLight.position.y = 3
directionalLight.position.z = 15

directionalLight.rotation.x = ( Math.PI / 180 ) * -10

directionalLight.castShadow = true

directionalLight.shadow.mapSize.width = 2048
directionalLight.shadow.mapSize.height = 2048

const d = 50

directionalLight.shadow.camera.left = -d
directionalLight.shadow.camera.right = d
directionalLight.shadow.camera.top = d
directionalLight.shadow.camera.bottom = -d

directionalLight.shadow.camera.far = 3500
directionalLight.shadow.bias = -0.0001

const directionalHelper = new THREE.DirectionalLightHelper( directionalLight, 5 )

camBox.add( directionalLight )
camBox.add( directionalHelper )

export {
	scene,
	camera,
	camBox,
	faceBox,
	renderer,
	raycaster,
	mouse,
	links,
	controls,
	mainConsole
}

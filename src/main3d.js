import * as THREE from './three.module.js';
import { Player,Projectile } from './player3d.js'
import { inertia, rot_inertia } from './interpolator.js'
import { Map } from './map.js'
import * as World from './world.js'

World.init()
let player = new Player(World.scene3d)
let map = new Map(World.scene2d)

  const player_velocity = new inertia(0,0.002)
  const player_rot = new rot_inertia(0,0.1)

  let projectile
  let up = new THREE.Vector3(0,0,1)

  function animate() {
    var a = World.mouseAngle(player.obj.position)
    player_rot.tr=-a
    player.obj.setRotationFromAxisAngle(up,player_rot.r)
    player_velocity.tick()
    player_rot.tick()
    player_velocity.worldTranslate(player.obj)
    World.bgTexture.offset.x=player.obj.position.x/20
    World.bgTexture.offset.y=player.obj.position.y/20
    if (projectile)
      projectile.obj.translateY(0.1)    
    World.render()

    requestAnimationFrame( animate );

}
animate();


function fire(){
  projectile = new Projectile(scene)
  let v = new THREE.Vector3()
  player.obj.children[0].getWorldPosition(v)
  projectile.obj.position.copy(v)
  projectile.obj.rotation.copy(player.obj.rotation)
  projectile.obj.translateY(0.2)
   var light=new THREE.SpotLight( 0xff0000,1)
  // light.distance=6

  // var dir = new THREE.Vector3()
  // player.obj.getWorldDirection(dir)

  // let tgt = new THREE.Object3D()
  // tgt.translateOnAxis(dir,0.5)

   projectile.obj.add(light);
  // projectile.obj.add(tgt);
  // light.target=tgt;
  // light.distance=1
  // console.log('here')
// let h=new THREE.SpotLightHelper(light)
// scene.add(h)

}
const DELTA=0.1

function handleKeyPress(e) {

}

function handleKeyDown(e) {
  switch (e.code) {
    case 'ArrowRight':
      player_velocity.x=DELTA
      break
    case 'ArrowLeft':
      player_velocity.x=-DELTA
      break
    case 'ArrowUp':
      player_velocity.y=DELTA
      break
    case 'ArrowDown':
      player_velocity.y=-DELTA
      break
  }
//  console.log(e)
}

function handleKeyUp(e) {
  switch (e.code) {
    case 'ArrowRight':
    case 'ArrowLeft':
      player_velocity.x=0
      break
    case 'ArrowUp':
    case 'ArrowDown':
      player_velocity.y=0
      break
    case 'Space':
      fire()
      break
  }
}



function handleMouseMove(e){
  mouse.x=e.clientX
  mouse.y=e.clientY
}
document.addEventListener('keypress', handleKeyPress, true)
document.addEventListener('keydown', handleKeyDown, true)
document.addEventListener('keyup', handleKeyUp, true)




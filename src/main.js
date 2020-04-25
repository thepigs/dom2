import { Player,Gun,Projectile } from './player.js'
const DELTA = 10
const player  = new Player()
const gun = new Gun(player)


const player_velocity = new inertia(0,0.2)

function fire(){
  const projectile = new Projectile()
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
      player_velocity.y=-DELTA
      break
    case 'ArrowDown':
      player_velocity.y=DELTA
      break
    case 'Space':
      fire()
  }
//  console.log(e)
}

function handleKeyUp(e) {
  switch (e.key) {
    case 'ArrowRight':
    case 'ArrowLeft':
      player_velocity.x=0
      break
    case 'ArrowUp':
    case 'ArrowDown':
      player_velocity.y=0
      break
  }
}


let  mouse={x:0,y:0}
function handleMouseMove(e){
  mouse.x=e.clientX
  mouse.y=e.clientY
}

const player_velocity = new inertia(0,0.2)

function fire(){
  const projectile = new Projectile()
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
      player_velocity.y=-DELTA
      break
    case 'ArrowDown':
      player_velocity.y=DELTA
      break
    case 'Space':
      fire()
  }
//  console.log(e)
}

function handleKeyUp(e) {
  switch (e.key) {
    case 'ArrowRight':
    case 'ArrowLeft':
      player_velocity.x=0
      break
    case 'ArrowUp':
    case 'ArrowDown':
      player_velocity.y=0
      break
  }
}


document.addEventListener('keydown', handleKeyDown, true)
document.addEventListener('keyup', handleKeyUp, true)
document.addEventListener('mousemove', handleMouseMove, true)


var start = null;

var last = 0

function step(timestamp) {
  const diff = timestamp - last
//  if (diff >= 100) {
 //   last = timestamp
    player_velocity.tick()
  //}
  player.move(player_velocity.velocity)
  let pc=player.center();
  
  let d =Math.atan((mouse.y-pc.y)/(mouse.x-pc.x));
  d=d*DEG2RAD
  if (mouse.x<pc.x)
    d=d+180
  player.rotate({r:d+90})

  window.requestAnimationFrame(step);
}

window.requestAnimationFrame(step);


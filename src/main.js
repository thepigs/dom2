import { Player,Gun } from './player.js'
const DELTA = 10
const player  = new Player()
const gun = new Gun(player)


class interpolator {

  constructor(value, accel) {
    this.value = value
    this.target = [...value]
    this.signum = []
    this.accel = accel
  }

  set_target(idx,value) {
    this.target[idx] = value;
    this.signum[idx] = Math.sign(this.target[idx] - this.value[idx])
  }

  tick() {

    for (let i = 0; i < this.target.length; i++) {
      if (this.value[i] != this.target[i]) {
        this.value[i] += this.signum[i] * this.accel;
        if (Math.sign(this.target[i]-this.value[i]) != this.signum[i])
          this.value[i] = this.target[i]
      }
    }
  }
}

class inertia  extends interpolator {
  constructor(max_speed, inertia){
    super([0,0],inertia)

  }

  set x(x){
    this.set_target(0,x)
  }
  set y(y){
    this.set_target(1,y)
  }

  get velocity() { 
    return { dx:this.value[0], dy:this.value[1] }
  }

}

const player_velocity = new inertia(0,0.2)

function handleKeyDown(e) {
  switch (e.key) {
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
  }
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
document.addEventListener('keydown', handleKeyDown, true)
document.addEventListener('keyup', handleKeyUp, true)
document.addEventListener('mousemove', handleMouseMove, true)


var start = null;

var last = 0
const DEG2RAD = 360/(2*Math.PI)

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


import { Player } from './player.js'
const DELTA = 10
const player = window.player = new Player()


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

  get x(){
    if (this.value[0])
      return this.value[0]
  }
  get y() {
    if (this.value[1])
      return this.value[1]
  }

  get velocity() { 
    return { x:this.x, y:this.y}
  }


}

const player_velocity = new inertia()

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

document.addEventListener('keydown', handleKeyDown, true)
document.addEventListener('keyup', handleKeyUp, true)


var start = null;

var last = 0

function step(timestamp) {
  const diff = timestamp - last
//  if (diff >= 100) {
 //   last = timestamp
    player_velocity.tick()
  //}
  player.move(player_velocity.velocity)
  window.requestAnimationFrame(step);
}

window.requestAnimationFrame(step);


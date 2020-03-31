import {Player} from './player.js'

 const player = window.player = new Player()

function handleClick(e)  {
  switch (e.key) {
    case 'ArrowRight':
      player.move({x:1})
      break
    case 'ArrowLeft':
      player.move({x:-1})
      break
    case 'ArrowUp':
      player.move({y:-1})
      break
    case 'ArrowDown':
      player.move({y:1})
      break
  }
}

document.addEventListener('keydown', handleClick, true)



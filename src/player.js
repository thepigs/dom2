import * as util from './util.js'
import {Sprite} from './sprite.js'

const _player = `<svg width="100px" height="100px">
    <defs>
        <radialGradient id="grad1" cx="50%" cy="20%" r="50%" fx="50%" fy="20%">
            <stop offset="0%" 
                style="stop-color:rgb(255,255,0);stop-opacity:1"
            />
            <stop offset="100%" 
                style="stop-color:rgb(128,128,0);stop-opacity:1" />
        </radialGradient>
    </defs>

    <circle cx="50" cy="50" r="40" stroke="#770" strokeWidth="4" fill="url(#grad1)" />
</svg>
`
const _gun = `<svg width="20px" height="20px">
    <circle cx="10" cy="10" r="10" stroke="#770" strokeWidth="4" fill="#d00" />
</svg>
`
export class Player extends Sprite {
    constructor() {
        super(_player)
    }
}

export class Gun extends Sprite {
    constructor(parent) {
        super(_gun,parent)
    }
}




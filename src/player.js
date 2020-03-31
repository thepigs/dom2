import * as util from './util.js'

const _player = `<svg width="100px" height="100px">
    <defs>
        <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
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
export class Player {
    constructor() {
        this.el = util.appendHtml(_player, {id:'player','class':'player'})
        setTimeout(()=>{
        this.x = this.el.getBoundingClientRect().top
        this.y = this.el.getBoundingClientRect().left
        },0)
    }
    move(m) {console.log(this)
        if (m.x){
            this.x+=m.x;
            this.el.style.left = this.x+'px'
        }
        if (m.y) {
            this.y+=m.y;
            this.el.style.top = this.y+'px'
        }
    }
}


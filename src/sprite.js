import * as util from './util.js'

export class sprite {
    constructor(parent,name,html) {
        this.parent=parent
        this.el = util.appendHtml({
                html,
                parent:parent.el,
                id:name,
                style:'position:absolute'
        })
        this.x = this.y = 0
    }
    move(m) {
        if (m.dx)
            this.x+=m.dx;
        else if (m.x) 
            this.x=m.x;
        if (m.dy)
            this.y+=m.dy;
        else if (m.dy)
            this.y = m.y;
        this.el.style.left = this.x+'px'
        this.el.style.top = this.y+'px'
    }   
}


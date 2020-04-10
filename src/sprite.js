import * as util from './util.js'

export class Sprite {
    static _uid=0;
    _genid() { return this.constructor.name+Sprite._uid++; }
    constructor(html,parent,id=this._genid()) {
        this.parent=parent
        this.el = util.appendHtml({
                html,
                parent:(parent && parent.el)||document.body,
                id,
                style:'position:absolute'
        })
        this.x = this.y = 0
        this.r = 0
        this.move({x:this.x,y:this.y})
    }
    rotate(r) {
    if (r.dr)
        this.r=(this.r+r.dr)%360;
    else if (r.r)
        this.r=r.r;
    this.el.style.transform="rotate("+this.r+"deg)"
    }

    move(m) {
        if (m.dx)
            this.x+=m.dx;
        else if (m.x) 
            this.x=m.x;
        if (m.dy)
            this.y+=m.dy;
        else if (m.y)
            this.y = m.y;
        this.el.style.left = this.x+'px'
        this.el.style.top = this.y+'px'
    }  
    center(){
        return {x:this.x+this.el.offsetWidth/2,y:this.y+this.el.offsetHeight/2}
    } 
    bounds(){
        return this.el.getBoundingClientRect()
    }
}


class interpolator {

    constructor(value, accel) {
        this.value = value
        this.target = [...value]
        this.signum = []
        this.accel = accel
    }

    set_target(idx, value) {
        this.target[idx] = value;
        this.signum[idx] = Math.sign(this.target[idx] - this.value[idx])
    }

    tick() {

        for (let i = 0; i < this.target.length; i++) {
            if (this.value[i] != this.target[i]) {
                this.value[i] += this.signum[i] * this.accel;
                if (Math.sign(this.target[i] - this.value[i]) != this.signum[i])
                    this.value[i] = this.target[i]
            }
        }
    }
}

export class inertia extends interpolator {
    constructor(max_speed, inertia) {
        super([0, 0], inertia)
    }

    set x(x) {
        this.set_target(0, x)
    }
    set y(y) {
        this.set_target(1, y)
    }

    localTranslate(obj) {
        // console.log(this.value[1])
        if (this.value[0])
            obj.translateX(this.value[0])
        if (this.value[1])
            obj.translateX(this.value[1])

        // obj.position.x+=this.value[0]
        // obj.position.y+=this.value[1]
    }

    worldTranslate(obj) {
        // console.log(this.value[1])
        if (this.value[0])
            obj.position.x += this.value[0]
        if (this.value[1])
            obj.position.y += this.value[1]

        // 
        // 
    }

}


export class rot_inertia extends interpolator {
    constructor(max_speed, inertia) {
        super([0], inertia)
    }

    set tr(r) {
        let cr= this.target[0]
        this.set_target(0, r)

    }
    get r() {
        return this.value[0];
    }


}

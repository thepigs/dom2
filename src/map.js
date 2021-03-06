import * as THREE from './three.module.js';
import * as World from './world.js';

export class Map {

    constructor(scene) {
        const width=0.5, height=0.5
        var geometry = new THREE.PlaneGeometry( width,height )
        var material = new THREE.MeshBasicMaterial( {color: 0x000005, side: THREE.FrontSide, transparent:true, opacity:0.7} );
        var plane = new THREE.Mesh( geometry, material );
        
        var edges = new THREE.EdgesGeometry( geometry );
        var line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0xddddff,transparent:true, opacity:0.3 } ) );        

        var points = []

        const incr = 0.1
        points.push(new THREE.Vector3(-width/2+incr,0,0))
        points.push(new THREE.Vector3(width/2-incr,0,0))
        points.push(new THREE.Vector3(0,-height/2+incr,0))
        points.push(new THREE.Vector3(0,height/2-incr,0))
        
        var lgeo = new THREE.BufferGeometry().setFromPoints( points );

        var crosshair = new THREE.LineSegments( lgeo, new THREE.LineBasicMaterial( { color: 0xddddff,transparent:true, opacity:0.3 } ) );        

        scene.add (plane)
        plane.add(line)
        plane.add (crosshair)
        this.obj = plane
        this.obj.geometry.computeBoundingBox()

     //   this.obj.scale.set(0.2,0.2,0.2)

        this.setposition()
        World.events.addEventListener('resize',()=>this.setposition())
        }

        setposition(){
            console.log(this.obj.position.x,World.camera2d.right)
            World.alignRight(this.obj,.05)
            World.alignTop(this.obj,.05)

        }

}
Object.assign(Map.prototype,THREE.EventDispatcher.prototype)

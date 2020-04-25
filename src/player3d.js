import * as THREE from './three.module.js';
export class Player {

    constructor(scene) {
        var ship = new THREE.TorusGeometry(1, 0.5, 16,16);
  //      ship.computeFlatVertexNormals();
        var gun = new THREE.CylinderGeometry(0.2, 0.2, 2, 8);
        //var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        var material = new THREE.MeshPhongMaterial({ color: 0xffffff, emissive: 0x072534, side: THREE.FrontSide, flatShading: true });

        var shipMesh = new THREE.Mesh(ship, material);
        var gunMesh = new THREE.Mesh(gun, material);
        gunMesh.translateX(1.2)
        gunMesh.translateY(.3)

        shipMesh.add(gunMesh)

        this.obj = shipMesh

        this.obj.scale.set(0.2, 0.2, 0.2)
        scene.add(this.obj)
    }

}

export class Projectile {

    constructor(scene) {
        var geometry = new THREE.ConeGeometry(0.2,1, 4);
        var material = new THREE.MeshPhongMaterial({ color: 0xffff00, emissive: 0x072534, side: THREE.FrontSide, flatShading: true });
        this.obj = new THREE.Mesh(geometry, material);
        this.obj.scale.set(0.2, 0.2, 0.2)

        scene.add(this.obj);
    }
}
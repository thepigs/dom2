var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry();
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

console.log()
var l0 = new THREE.Vector3(0,0,0)

var l1 = new THREE.Vector4()

renderer.getViewport(l1)


function screenXY(obj){

    var vector = obj.clone();
    var windowWidth = window.innerWidth;
    // var minWidth = 1280;
  
    // if(windowWidth < minWidth) {
    //   windowWidth = minWidth;
    // }
  
    var widthHalf = (windowWidth/2);
    var heightHalf = (window.innerHeight/2);
  
    vector.project(camera);
  
    vector.x = ( vector.x * widthHalf ) + widthHalf;
    vector.y = - ( vector.y * heightHalf ) + heightHalf;
    vector.z = 0;
  
    return vector;
  
  };

  let  mouse={x:0,y:0}

  function animate() {
    
    requestAnimationFrame( animate );

//    cube.rotation.x += 0.01;
  //  cube.rotation.y += 0.01;

    //cube.position.y -= 0.01;

    var pos = screenXY(cube.position);
    
    let d =Math.atan((mouse.y-pos.y)/(mouse.x-pos.x));
    var v = new THREE.Vector3(0,0,1)

    cube.setRotationFromAxisAngle(v,-d)

    renderer.render( scene, camera );


}
animate();

function handleMouseMove(e){
  mouse.x=e.clientX
  mouse.y=e.clientY



}
// document.addEventListener('keydown', handleKeyDown, true)
// document.addEventListener('keyup', handleKeyUp, true)
document.addEventListener('mousemove', handleMouseMove, true)




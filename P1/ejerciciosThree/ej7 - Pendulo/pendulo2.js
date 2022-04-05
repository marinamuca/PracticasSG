import * as THREE from '../libs/three.module.js'

 // lo que no se conecte al grafo de escena, no aparece en esta.
class pendulo2 extends THREE.Object3D {
  constructor() {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    // this.createGUI(gui,titleGui);

    var boxGeom = new THREE.BoxGeometry(1,10,0.5);
    // Primero traslado
    boxGeom.translate(0,-5,0);
    var boxMat = new THREE.MeshBasicMaterial({color: 0x3366ff});
    this.boxMesh = new THREE.Mesh(boxGeom, boxMat);
    this.boxMesh.scale.y = 1;
    

    var cylGeom = new THREE.CylinderGeometry(0.25,0.25,0.7)
    cylGeom.rotateX(Math.PI/2);
    var cylMat = new THREE.MeshBasicMaterial({color: 0x009933})
    this.cylMesh = new THREE.Mesh(cylGeom, cylMat)
    
    this.boxMesh.position.set(0,0.5,0)
    this.rotation.z = 0

    //Añado la caja
    this.add(this.boxMesh)
    //Añado el cilindro
    this.add(this.cylMesh);
  }
  
  update (size, rot, pos) {
    this.boxMesh.scale.y = size;

    this.rotation.z = rot;

    this.position.y = pos;
  }
}

export { pendulo2 };

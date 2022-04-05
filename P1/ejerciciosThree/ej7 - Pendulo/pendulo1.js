import * as THREE from '../libs/three.module.js'
import { pendulo2 } from './pendulo2.js'

 // lo que no se conecte al grafo de escena, no aparece en esta.
class pendulo1 extends THREE.Object3D {
  constructor() {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    // this.createGUI(gui,titleGui);
    
    this.h = 5;
    var boxGeom = new THREE.BoxGeometry(2,5,1);
    var boxMat = new THREE.MeshBasicMaterial({color: 0xcc0000});

    // Primero traslado
    boxGeom.translate(0,-2.5,0);
    //Creo la caja roja
    this.redBox = new THREE.Mesh(boxGeom, boxMat);
    this.redBox.position.y = 2

    //Creo las cajas verdes
    boxGeom = new THREE.BoxGeometry(2,4,1);
    boxMat = new THREE.MeshBasicMaterial({color: 0x009900});
    boxGeom.translate(0,0,0);
    this.greenBoxTop = new THREE.Mesh(boxGeom, boxMat);
  
    boxGeom = new THREE.BoxGeometry(2,4,1);
    boxGeom.translate(0,-4,0);
    this.greenBoxBot = new THREE.Mesh(boxGeom, boxMat);

    this.redBox.translateY(-4);


    // EJE ROTACION:
    var cylGeom = new THREE.CylinderGeometry(0.75,0.75,1.3)
    cylGeom.rotateX(Math.PI/2);
    var cylMat = new THREE.MeshBasicMaterial({color: 0xD595D4})
    this.cylMesh = new THREE.Mesh(cylGeom, cylMat)

    this.pendulo2 = new pendulo2()
    this.pendulo2.position.z = 0.75
    this.pendulo2.position.y = - 2 - this.h * 0.1
    //Añado la caja
    this.add(this.redBox)
    this.add(this.greenBoxTop)
    this.add(this.greenBoxBot);
    this.add(this.cylMesh)
    this.add(this.pendulo2)
  }


  update (size,  rot, posp2, sizep2, rotp2 ) {
    // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación
   
    this.redBox.scale.y = size;
    this.greenBoxBot.position.y = -this.h  * size
    this.rotation.z = rot;

    this.pendulo2.update(sizep2, rotp2, -2 -this.h * size * posp2 / 100);

  }
}

export { pendulo1 };

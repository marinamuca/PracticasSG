import * as THREE from '../libs/three.module.js'
 // lo que no se conecte al grafo de escena, no aparece en esta.
class reloj extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);
    
    // this.axis = new THREE.AxesHelper (5);
    // this.add (this.axis);

    var sphereGeom = new THREE.SphereGeometry(1,12,12);
    sphereGeom.translate(15,0,0);
    var sphereMat = new THREE.MeshPhongMaterial({color : 0x00cc00})
  
    for( var i=0; i<12; i++){
      var sphere = new THREE.Mesh (sphereGeom, sphereMat)
      sphere.rotation.y = ((30 * Math.PI) / 180)*i
      this.add(sphere)
    }
    
    var sphereGeom = new THREE.SphereGeometry(1,12,12);
    sphereGeom.translate(13,0,0);
    var sphereMat = new THREE.MeshPhongMaterial({color : 0xcc0000})
    this.redSphere = new THREE.Mesh(sphereGeom, sphereMat)
    
    this.clock = new THREE.Clock();

    this.add(this.redSphere)
    
  }
  
  // createSphere(){
  //   var sphereGeom = new THREE.SphereGeometry(1,12,12);
  //   var sphereMat = new THREE.MeshPhongMaterial({color : 0x00cc00})
  //   var sphere = new THREE.Mesh (sphereGeom, sphereMat)
  //   sphere.position.x = 15;
  //   return sphere
  // }

  createGUI (gui,titleGui) {
    // Controles para el tamaño, la orientación y la posición de la caja
    this.guiControls = {
      velocidad: 1,
      
      // Un botón para dejarlo todo en su posición inicial
      // Cuando se pulse se ejecutará esta función.
      reset : () => {
        this.guiControls.velocidad = 1;
      }
    } 
    
    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder (titleGui);
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    
    folder.add (this.guiControls, 'reset').name ('[ Reset ]');
    folder.add (this.guiControls, 'velocidad', -12, 12, 1).name ('Velocidad (marcas/s) : ').listen();

  }

  setDetail(detail){
    var aux = this.reloj
  ;

  }
  
  update () {
    // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación
    this.segundos = this.clock.getDelta();
    this.redSphere.rotation.y -= this.guiControls.velocidad * this.segundos * ((30 * Math.PI) / 180)
  }
}

export { reloj };

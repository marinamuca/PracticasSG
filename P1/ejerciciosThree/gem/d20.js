import * as THREE from '../libs/three.module.js'
 // lo que no se conecte al grafo de escena, no aparece en esta.
class d20 extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);
    
    this.axis = new THREE.AxesHelper (5);
    this.add (this.axis);

    const verticesOfCube = [0.123727,-0.062387,-0.035275,0.125102,-0.000252,0.000554,0.087483,-0.119278,0.032425,-0.113736,-0.111087,0.011709,-0.11548,-0.016993,-0.054996,-0.075863,-0.126868,-0.049076,0.03067,-0.188088,0.040062,0.042241,-0.17329,-0.001573,0.003088,-0.003872,-0.095888,0.015439,0.063675,-0.099627,0.079689,0.024109,-0.081358,0.049405,-0.060136,-0.091321,0.093514,-0.081848,-0.065066,0.065842,0.071561,0.085333,-0.017415,0.054234,0.117282,0.03876,-0.101078,0.101076,-0.084958,-0.038819,-0.100485,-0.063824,0.039956,-0.095565,-0.118395,-0.028394,0.026999,-0.104219,0.039095,-0.021352,-0.086907,0.045889,0.059369,-0.120674,-0.058626,0.068515,-0.04852,-0.054543,0.107836,-0.017532,-0.167297,0.008444,0.018244,-0.11196,-0.088892,0.007498,-0.160215,0.070255,-0.041567,-0.135738,0.077568,-0.075718,-0.130524,0.046545,-0.005547,0.14896,0.057369,-0.071499,0.103933,-0.031529,0.107284,0.112098,0.01215,0.065072,0.123301,-0.061299,-0.043424,0.147495,0.017369,-0.022903,0.153136,-0.085723,0.018643,0.218233,-0.02487,-0.04487,0.171047,-0.033124,-0.051431,-0.071185,-0.103228];
    // [
    //    0, 0, 1,    0, 0,-1,
    //    0, 2,-1,    1, 1,-1,    1,-1,-1,     0,-2,-1,   -1,-1,-1,   -1, 1,-1,
    //    0, 4, 0,    2, 2, 0,    2,-2, 0,     0,-4, 0,   -2,-2, 0,   -2, 2, 0,
    //    0, 2, 1,    1, 1, 1,    1,-1, 1,     0,-2, 1,   -1,-1, 1,   -1, 1, 1,
    // ];
    
    const indicesOfFaces = [162,0,1,2,0,0,1,2,0,0,0,162,3,4,5,0,3,4,5,0,0,0,162,2,6,7,0,2,6,7,0,0,0,162,8,9,10,0,8,9,10,0,0,0,162,11,12,7,0,11,12,7,0,0,0,162,13,14,15,0,13,14,15,0,0,0,162,16,17,8,0,16,17,8,0,0,0,162,3,18,19,0,3,18,19,0,0,0,162,1,15,2,0,1,15,2,0,0,0,162,20,21,22,0,20,21,22,0,0,0,162,23,24,7,0,23,24,7,0,0,0,162,23,3,5,0,23,3,5,0,0,0,162,25,26,23,0,25,26,23,0,0,0,162,23,5,24,0,23,5,24,0,0,0,162,6,25,23,0,6,25,23,0,0,0,162,23,27,3,0,23,27,3,0,0,0,162,26,27,23,0,26,27,23,0,0,0,162,28,14,13,0,28,14,13,0,0,0,162,29,19,20,0,29,19,20,0,0,0,162,30,1,10,0,30,1,10,0,0,0,162,9,31,10,0,9,31,10,0,0,0,162,28,32,20,0,28,32,20,0,0,0,162,29,33,17,0,29,33,17,0,0,0,162,30,34,13,0,30,34,13,0,0,0,162,35,32,34,0,35,32,34,0,0,0,162,29,17,19,0,29,17,19,0,0,0,162,9,33,34,0,9,33,34,0,0,0,162,8,17,9,0,8,17,9,0,0,0,162,9,17,33,0,9,17,33,0,0,0,162,29,35,33,0,29,35,33,0,0,0,162,30,31,34,0,30,31,34,0,0,0,162,30,13,1,0,30,13,1,0,0,0,162,9,34,31,0,9,34,31,0,0,0,162,30,10,31,0,30,10,31,0,0,0,162,28,20,14,0,28,20,14,0,0,0,162,28,13,34,0,28,13,34,0,0,0,162,1,13,15,0,1,13,15,0,0,0,162,22,14,20,0,22,14,20,0,0,0,162,14,22,15,0,14,22,15,0,0,0,162,18,21,20,0,18,21,20,0,0,0,162,4,19,17,0,4,19,17,0,0,0,162,4,3,19,0,4,3,19,0,0,0,162,4,16,5,0,4,16,5,0,0,0,162,18,20,19,0,18,20,19,0,0,0,162,18,3,21,0,18,3,21,0,0,0,162,11,24,8,0,11,24,8,0,0,0,162,36,24,5,0,36,24,5,0,0,0,162,0,12,10,0,0,12,10,0,0,0,162,11,8,10,0,11,8,10,0,0,0,162,11,7,24,0,11,7,24,0,0,0,162,0,10,1,0,0,10,1,0,0,0,162,0,2,7,0,0,2,7,0,0,0,162,11,10,12,0,11,10,12,0,0,0,162,7,12,0,0,7,12,0,0,0,0,162,4,17,16,0,4,17,16,0,0,0,162,36,5,16,0,36,5,16,0,0,0,162,36,8,24,0,36,8,24,0,0,0,162,8,36,16,0,8,36,16,0,0,0,162,28,34,32,0,28,34,32,0,0,0,162,35,29,32,0,35,29,32,0,0,0,162,29,20,32,0,29,20,32,0,0,0,162,35,34,33,0,35,34,33,0,0,0,162,15,22,26,0,15,22,26,0,0,0,162,22,21,27,0,22,21,27,0,0,0,162,27,21,3,0,27,21,3,0,0,0,162,27,26,22,0,27,26,22,0,0,0,162,2,15,25,0,2,15,25,0,0,0,162,25,15,26,0,25,15,26,0,0,0,162,6,23,7,0,6,23,7,0,0,0,162,6,2,25,0,6,2,25,0,0,0];
    // [
    //     2,1,0,    0,3,2,
    //     0,4,7,    7,3,0,
    //     0,1,5,    5,4,0,
    //     1,2,6,    6,5,1,
    //     2,3,7,    7,6,2,
    //     4,5,6,    6,7,4
    // ];
    
    const geom = new THREE.PolyhedronGeometry( verticesOfCube, indicesOfFaces, 6, 2 );
   

    // Como material se crea uno a partir de un color
    var d20Mat = new THREE.MeshNormalMaterial();
    
    // Ya podemos construir el Mesh = combinación geometría + material
    this.d20 = new THREE.Mesh (geom, d20Mat);
    // Y añadirlo como hijo del Object3D (el this)
    this.add (this.d20);
    
  }
  
  createGUI (gui,titleGui) {
    // Controles para el tamaño, la orientación y la posición de la caja
    this.guiControls = {
      size : 1.0,
      
      rotX : 0.0,
      rotY : 0.0,
      rotZ : 0.0,
      
      posX : 0.0,
      posY : 0.0,
      posZ : 0.0,
      
      // Un botón para dejarlo todo en su posición inicial
      // Cuando se pulse se ejecutará esta función.
      reset : () => {
        this.guiControls.size = 1.0;
        
        this.guiControls.rotX = 0.0;
        this.guiControls.rotY = 0.0;
        this.guiControls.rotZ = 0.0;
        
        this.guiControls.posX = 0.0;
        this.guiControls.posY = 0.0;
        this.guiControls.posZ = 0.0;
      }
    } 
    
    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder (titleGui);
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    folder.add (this.guiControls, 'size', 0.1, 5.0, 0.1).name ('Tamaño : ').listen();
    
    folder.add (this.guiControls, 'rotX', 0.0, Math.PI/2, 0.1).name ('Rotación X : ').listen();
    folder.add (this.guiControls, 'rotY', 0.0, Math.PI/2, 0.1).name ('Rotación Y : ').listen();
    folder.add (this.guiControls, 'rotZ', 0.0, Math.PI/2, 0.1).name ('Rotación Z : ').listen();
    
    folder.add (this.guiControls, 'posX', -20.0, 20.0, 0.1).name ('Posición X : ').listen();
    folder.add (this.guiControls, 'posY', 0.0, 10.0, 0.1).name ('Posición Y : ').listen();
    folder.add (this.guiControls, 'posZ', -20.0, 20.0, 0.1).name ('Posición Z : ').listen();
    
    folder.add (this.guiControls, 'reset').name ('[ Reset ]');
  }

  setDetail(detail){
    var aux = this.d20;

  }
  
  update () {
    // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación
   
    this.position.set (this.guiControls.posX,this.guiControls.posY,this.guiControls.posZ);

    this.d20.rotation.x +=0.1;
    this.rotation.set (this.guiControls.rotX,this.guiControls.rotY,this.guiControls.rotZ);
    this.scale.set (this.guiControls.size,this.guiControls.size,this.guiControls.size);
  }
}

export { d20 };

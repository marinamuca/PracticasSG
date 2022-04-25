import * as THREE from '../libs/three.module.js'
import * as TWEEN from '../libs/tween.esm.js'
import { CSG } from '../libs/CSG-v2.js'

 // lo que no se conecte al grafo de escena, no aparece en esta.
class auriculares extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);
    
    // this.axis = new THREE.AxesHelper (5);
    // this.add (this.axis);

   
    this.clock = new THREE.Clock();
    

    // var line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), new THREE.MeshBasicMaterial({color: 0xffffff}))
    var auricular1 = this.createAuricular()
    auricular1.rotation.z = Math.PI / 2
    auricular1.position.x = 5;
    auricular1.position.y = -5;

    var auricular2 = this.createAuricular()
    auricular2.rotation.z = Math.PI / 2
    auricular2.position.x = -5;
    auricular2.position.y = -5;

    var diadema = this.createDiadema();

    //Una unica geometria:
    // this.csg = new CSG();
    // this.csg.union([auricular1, diadema ]);
    // this.csg.union([auricular2]);
    // this.objeto = this.csg.toMesh();
    // this.add(this.objeto);

    this.add(auricular1)
    this.add(auricular2)
    this.add(diadema)
  
    var curva = this.createRecorrido();

    var origen = {p:0};
    var destino = {p:1};
    var movIda = new TWEEN.Tween(origen).to(destino, 4000) // 2s
    
    movIda.repeat(Infinity)
    movIda.yoyo(true);
    
    movIda.onUpdate((origen)=>{
      var posicion = curva.getPoint(origen.p);
      this.position.copy(posicion)
      var tangente = curva.getTangentAt(origen.p);
      posicion.add(tangente)
    });

    movIda.start();

    
  }

  createRecorrido(){
    var puntos = [
      new THREE.Vector3( -20, 0, 0 ),
      new THREE.Vector3( -10, 5, 0 ),
      new THREE.Vector3( 0, 10, 0 ),
      new THREE.Vector3( 10, 5, 0 ),
      new THREE.Vector3( 20, 0, 0 )
    ];

    var curva = new THREE.CatmullRomCurve3( puntos );
  
    return curva;
  }

  createAuricular(){

    var curve = new THREE.EllipseCurve(
      0,  0.0001,            // ax, aY
      5, 2,           // xRadius, yRadius
      0,  Math.PI*2,  // aStartAngle, aEndAngle
      false,            // aClockwise
      0                 // aRotation
    );
    
    const points = curve.getPoints( 50 );

    var ellipse = new THREE.Mesh( new THREE.LatheGeometry(points), new THREE.MeshNormalMaterial());
    return ellipse
  }

  createDiadema(){
    var path = this.pathDiadema();
    var goma = new THREE.Shape();
    goma.absellipse(0,0,0.25,0.5, 0,Math.PI*2)

    const extrudeSettings = { depth: 1, steps: 30, extrudePath: path};

    const geometry = new THREE.ExtrudeGeometry( goma, extrudeSettings );

    const mesh = new THREE.Mesh( geometry, new THREE.MeshNormalMaterial() );

    return mesh;
  }

  pathDiadema(){
    var puntos = [
      new THREE.Vector3( -5, 0, 0 ),
      new THREE.Vector3( -2.5, 2.5, 0 ),
      new THREE.Vector3( 0, 3, 0 ),
      new THREE.Vector3( 2.5, 2.5, 0 ),
      new THREE.Vector3( 5, 0, 0 )
    ];

    var path = new THREE.CatmullRomCurve3( puntos );
  
    return path;
  }
  
  createGUI (gui,titleGui) {
    // Controles para el tamaño, la orientación y la posición de la caja
    this.guiControls = {
      segs: 2,
      
      // Un botón para dejarlo todo en su posición inicial
      // Cuando se pulse se ejecutará esta función.
      reset : () => {
        this.guiControls.segs = 2.0;
        
      }
    } 
    
    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder (titleGui);
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    folder.add (this.guiControls, 'segs', 2, 8, 1).name ('Segundos en vuelta completa) : ').listen();
    
    folder.add (this.guiControls, 'reset').name ('[ Reset ]');
  }

  setDetail(detail){
    var aux = this.auriculares
  ;

  }
  
  update () {
    // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación
   

    //Animacion vueltas sobre si mismo
    this.segundos = this.clock.getDelta();
    var angulo =  this.segundos/this.guiControls.segs;
    this.rotation.y -= angulo * Math.PI*2

    TWEEN.update();
  }
}

export { auriculares };

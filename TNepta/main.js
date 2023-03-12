import * as THREE from 'three';
import {VRButton} from 'VRButton';
import {GLTFLoader} from 'GLTFLoader';




function main() {
  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({antialias: true, canvas});
  renderer.xr.enabled = true;
  document.body.appendChild(VRButton.createButton(renderer));


  gsap.from('.overlay h1 span', {
    duration: 1,
    y: '100%'
})

const overlay = document.querySelector('.overlay')
const loadingManager = new THREE.LoadingManager(
    () => {
        window.setTimeout(() => {
            gsap.to('.overlay h1 span', {
                duration: 1,
                y: '-100%'
            })
            
            gsap.to(overlay, {
                duration: 2,
                opacity: 0,
                delay: 1
            })
            gsap.to(overlay, {
                duration: 1,
                display: 'none',
                delay: 2
            })

        }, 2000)
    },
    () => {
    },
    () => {
        console.error('error');
    }
)

  const scene = new THREE.Scene();
  const loader = new THREE.TextureLoader();
  scene.background = loader.load( '/assets/iMAGES/space1.jpg' );



const fov = 75;
  const aspect = 2;  
  const near = 0.1;
  const far = 50;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(-1,10,15);

scene.add(camera)
  


  {
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 10, 4);
    scene.add(light);
  }

  let skull = null;
  let base = new THREE.Object3D();
  scene.add(base);
  const gltfLoader = new GLTFLoader(loadingManager)
  gltfLoader.load('/assets/GLTF/world.gltf', (gltf) => {
   gltf.scene.position.y = -10
   gltf.scene.pos
  base.add(gltf.scene)})

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function render(time) {
    time *= 0.001;

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    

    renderer.render(scene, camera);
  }

  renderer.setAnimationLoop(render);
}

main();

import * as THREE from 'three';

const home = document.getElementById('home');

const menus = document.querySelectorAll('.menu');

// menus.addEventListener('mouseover', () => {
//   menus.style.display = 'none';
// });

menus.forEach((menu) => {
  const child = menu.childNodes[0];
  menu.addEventListener('mouseenter', () => {
    const text = menu.getAttribute('nama');
    menu.innerHTML = `<span class="appear">${text}</span>`;
  });
  menu.addEventListener('mouseleave', () => {
    const textChild = menu.childNodes[0];
    textChild.remove();
    menu.appendChild(child);
  });
});

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setClearColor('#121212');
renderer.setSize(window.innerWidth, window.innerHeight);
home.appendChild(renderer.domElement);

const cubegeo = new THREE.BoxGeometry(2, 2, 2);
const myTexture = new THREE.TextureLoader().load('../texture/texturea.jpg');
const material = new THREE.MeshBasicMaterial({
  // color: 0xfe4a49,
  // wireframe: false,
  map: myTexture,
});
const cube = new THREE.Mesh(cubegeo, material);
cube.position.set(-2, 1, 0);
scene.add(cube);

camera.position.z = 5;

window.addEventListener('resize', function () {
  renderer.setSize(this.window.innerWidth, this.window.innerHeight);
  camera.aspect = this.window.innerWidth / this.window.innerHeight;
  camera.updateProjectionMatrix();
});

const animate = () => {
  requestAnimationFrame(animate);

  cube.rotateY(0.02);
  renderer.render(scene, camera);
};

animate();

import * as THREE from 'three';

const home = document.getElementById('home');

const menus = document.querySelectorAll('.menu');

menus.forEach((menu) => {
  const child = menu.childNodes[0];
  menu.addEventListener('mouseover', () => {
    console.log('enter');
    const text = menu.getAttribute('nama');
    menu.innerHTML = `${text}`;
  });
  menu.addEventListener('mouseleave', () => {
    console.log('leave');
    const textChild = menu.childNodes[0];
    textChild.remove();
    menu.appendChild(child);
  });
});

// Type Animation

const TypeWriter = function (txtElement, words, wait = 3000) {
  this.txtElement = txtElement;
  this.words = words;
  this.txt = '';
  this.wordIndex = 0;
  this.wait = parseInt(wait, 10);
  this.type();
  this.isDeleting = false;
};

// Type Method
TypeWriter.prototype.type = function () {
  // current index of word
  const current = this.wordIndex % this.words.length;
  // get full text of current word
  const fullTxt = this.words[current];

  // check if deleting
  if (this.isDeleting) {
    // remove char
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    // add char
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  // insert txt into element

  this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

  // Initial type speed
  let typeSpeed = 200;

  if (this.isDeleting) {
    typeSpeed /= 2;
  }

  // If word is complete
  if (!this.isDeleting && this.txt === fullTxt) {
    // make pause at end
    typeSpeed = this.wait;
    // set delete to true
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    // move to next word
    this.wordIndex++;
    // pause before start typing
    typeSpeed = 500;
  }

  setTimeout(() => this.type(), typeSpeed);
};

// init on DOM Load
document.addEventListener('DOMContentLoaded', init);

function init() {
  const txtElement = document.querySelector('.txt-type');
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  const wait = txtElement.getAttribute('data-wait');
  // init TypeWriter
  new TypeWriter(txtElement, words, wait);
}

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

const cubegeo = new THREE.OctahedronGeometry();
const myTexture = new THREE.TextureLoader().load('../texture/texturea.jpg');
const material = new THREE.MeshBasicMaterial({
  color: 0xfe4a49,
  wireframe: true,
  // map: myTexture,
});
const cube = new THREE.Mesh(cubegeo, material);
cube.position.set(-3, 1, 0);
scene.add(cube);

camera.position.z = 5;

window.addEventListener('resize', function () {
  renderer.setSize(this.window.innerWidth, this.window.innerHeight);
  camera.aspect = this.window.innerWidth / this.window.innerHeight;
  camera.updateProjectionMatrix();
});

const animate = () => {
  requestAnimationFrame(animate);

  // cube.rotateY(0.02);
  cube.rotateX(0.02);
  // cube.rotateZ(0.02);
  renderer.render(scene, camera);
};

animate();

const menus = document.querySelectorAll('.menu');
menus.forEach((menu) => {
  const child = menu.childNodes[0];
  menu.addEventListener('mouseover', () => {
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

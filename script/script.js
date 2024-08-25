const anchors = [
  {
    title: "О компании",
    anchor: "",
  },
  {
    title: "Наши решения",
    anchor: "decisions",
  },
  {
    title: "Контакты",
    anchor: "footer",
  },
];

const appNav = document.getElementById("app-nav");

const clearSelectedLink = () => {
  Object.entries(appNav.children).map((item) => (item[1].classList = []));
};

Object.entries(appNav.children).map((item) =>
  item[1].addEventListener("click", (e) => {
    clearSelectedLink();
    e.target.classList = ["link-select"];

    const anchor = anchors.find((item) => item.title === e.target.textContent).anchor;

    if (anchor) {
      getAnchor(anchor);
    }
  })
);

document.getElementById("next").addEventListener("click", (e) => getAnchor("credit"));

document.getElementById("get-solution").addEventListener("click", (e) => getAnchor("consultation"));

const getAnchor = (id) => {
  document.getElementById(id).scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};


document.getElementById('burger-button').addEventListener('click', (e) => {
    const sidebar = document.getElementById('sidebar')

    if(sidebar.classList.contains('sidebar-open')){
        sidebar.classList.remove('sidebar-open')
        e.target.classList.remove('burger_menu-closed')
    }
    else{
        sidebar.classList.add('sidebar-open')
        e.target.classList.add('burger_menu-closed')
    }

    
})

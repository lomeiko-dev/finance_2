function declination(number, titles) {
  cases = [2, 0, 1, 1, 1, 2];
  return titles[number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]];
}

const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

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

document.getElementById("next").addEventListener("click", (e) => getAnchor("credit-section"));

document.getElementById("get-solution").addEventListener("click", (e) => getAnchor("consultation"));

const getAnchor = (id) => {
  document.getElementById(id).scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

document.getElementById("burger-button").addEventListener("click", (e) => {
  const sidebar = document.getElementById("sidebar");

  if (sidebar.classList.contains("sidebar-open")) {
    sidebar.classList.remove("sidebar-open");
    e.target.classList.remove("burger_menu-closed");
  } else {
    sidebar.classList.add("sidebar-open");
    e.target.classList.add("burger_menu-closed");
  }
});

const toggleDropdownHandler = (e) => {
  e.preventDefault();
  const overflow = document.getElementById("dropdown-overflow");
  const arrow = document.getElementById("icon-arrow");

  if (overflow.classList.contains("overflow-open")) {
    arrow.style.transform = "rotate(0deg)";
    overflow.classList.remove("overflow-open");
    setTimeout(() => {
      overflow.style.display = "none";
    }, 50);
  } else {
    arrow.style.transform = "rotate(90deg)";
    overflow.style.display = "block";
    setTimeout(() => {
      overflow.classList.add("overflow-open");
    }, 1);
  }
};

document.getElementById("toggle-dropdown").addEventListener("click", toggleDropdownHandler);

document.getElementById("input-dropdown").addEventListener("click", toggleDropdownHandler);

const dropdownPanel = document.getElementById("dropdown-panel");

Object.entries(dropdownPanel.children).map((item) =>
  item[1].addEventListener("click", (e) => {
    const input = document.getElementById("input-dropdown");

    input.value = e.target.textContent;

    toggleDropdownHandler(e);
  })
);

const offsetSliderRangeHandler = (e, procent) => {
  e.target.style.backgroundSize = `${procent}% 100%`;
};

offsetSliderRangeHandler({ target: document.getElementById("range-sum-credit") }, 50);
offsetSliderRangeHandler({ target: document.getElementById("range-term-credit") }, 50);

document.getElementById("range-sum-credit").addEventListener("input", (e) => {
  const input = document.getElementById("input-sum-credit");
  offsetSliderRangeHandler(e, e.target.value);

  input.value = `${e.target.value * 100000}`;
});

document.getElementById("input-sum-credit").addEventListener("input", (e) => {
  const range = document.getElementById("range-sum-credit");

  offsetSliderRangeHandler({ target: range }, e.target.value / 100000);
  range.value = e.target.value / 100000;
});

let isBackspacePressed = false;

document.getElementById("input-term-credit").addEventListener("keydown", function (event) {
  if (event.key === "Backspace") {
    isBackspacePressed = true;
  }
});

document.getElementById("range-term-credit").addEventListener("input", (e) => {
  const input = document.getElementById("input-term-credit");
  offsetSliderRangeHandler(e, e.target.value);

  const title = declination(e.target.value, [" год", " года", " лет"]);
  input.value = `${e.target.value} ${title}`;
});

document.getElementById("input-term-credit").addEventListener("input", (e) => {
  if (isBackspacePressed) {
    e.target.value = e.target.value.slice(0, -1);
    isBackspacePressed = false;
    return;
  }

  const value = e.target.value.match(/\d+/g);
  const title = declination(value.join(""), [" год", " года", " лет"]);

  e.target.value = `${value.join("")} ${title}`;
});

document.getElementById("submit-credit").addEventListener("click", (e) => {
  const dropdown = document.getElementById("input-dropdown");

  if (dropdown.value === "") {
    const box = document.getElementById("box-dropdown");
    const label = document.getElementById("label-dropdown");

    label.style.color = "red";
    box.style.border = "1px solid red";

    return;
  }

  const section = document.getElementById("credit-section");

  section.style.opacity = "0";

  setTimeout(() => {
    alert("Форма отправлена!");
  }, 200);

  setTimeout(() => {
    section.style.display = "none";
  }, 150);
});

const phoneInput = document.getElementById("phone-input");
const phoneMask = new IMask(phoneInput, {
  mask: "+{7}(000)000-00-00",
});


document.getElementById('submit-consultation').addEventListener('click', (e) => {
    e.preventDefault();

    let isValid = true

    const setInputError = (e) => {
        isValid = false
        e.classList.add('input-error')
    }

    const name = document.getElementById('name-input')
    const phone = document.getElementById('phone-input')
    const email = document.getElementById('email-input')

    const inputList = [
        name,
        phone,
        email
    ]

    inputList.map(item => item.classList.remove('input-error'))

    if(name.value === ''){
        setInputError(name)
    }

    if(!phoneMask.masked.isComplete){
        setInputError(phone)
    }

    if(!validateEmail(email.value)){
        setInputError(email)
    }

    if(isValid){
        alert('Форма отправлена')

        inputList.map(item => item.value = '')
    }

})

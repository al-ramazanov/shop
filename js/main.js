
const swiper = new Swiper('.swiper', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  spaceBetween: 15,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.next-slide',
    prevEl: '.prev-slide',
  },
});


const cardSwiper = new Swiper('.card-swiper', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  spaceBetween: 20,

  // If we need pagination
  pagination: {
    el: '.card-pagination',
    clickable: true,
  },
  // navigation: {
  //   nextEl: '.recomended__controls-next',
  //   prevEl: '.recomended__controls-prev',
  // },
});

let userNames = document.querySelectorAll('.reviews__author-name');

if (userNames) {
  for (const name of userNames) {
    const firstLetter = name.innerText[0];
    let userIco = name.previousElementSibling;
    userIco.innerText = firstLetter;
  }
}



let target = document.querySelector('._target')
let moovEl = document.querySelector('._moove')
let menu = moovEl.querySelector('.footer__menu')
let mobMenu = document.querySelector('.mob__menu')
let cart = document.querySelector('.header-middle__cart-btn')
if (document.documentElement.clientWidth <= 992) {
  target.append(menu)
  mobMenu.append(cart)
} else {
  moovEl.append(menu)
}



function headerDropdown() {
  const dropdowns = document.querySelectorAll('.header-top__dropdown');

  // console.log(dropdownItem);
  for (const dropdown of dropdowns) {
    const dropdownHeader = dropdown.querySelector('.header-top__dropdown-header');
    const dropdownBody = dropdown.querySelector('.header-top__dropdown-body');
    const dropdownItems = dropdown.querySelectorAll('.header-top__dropdown-item');
    dropdown.addEventListener('click', () => {
      dropdownBody.classList.toggle('show')
    })
    for (const dropdownItem of dropdownItems) {
      dropdownItem.addEventListener('click', () => {
        dropdownHeader.innerHTML = dropdownItem.innerHTML
      })
    }
  }
}

headerDropdown()

const catalogDropdowns = document.querySelectorAll('.catalog-dropdown')
for (const dropdown of catalogDropdowns) {
  const dropdownBtn = dropdown.querySelector('.dropdown-header')
  const dropdownBody = dropdown.querySelector('.dropdown-body')

  dropdownBtn.addEventListener('click', () => {
    dropdown.classList.toggle('open')
    if (dropdown.classList.contains('open')) {
      dropdownBtn.classList.add('open')
      dropdownBody.classList.add('open')
      dropdownBody.style.maxHeight = `${dropdownBody.scrollHeight}px`
    }
    else {
      dropdownBtn.classList.remove('open')
      dropdownBody.classList.remove('open')
      dropdownBody.style.maxHeight = null;
    }


    document.addEventListener('click', (e) => {
      if (e.target !== dropdownBtn) {
        dropdownBody.style.maxHeight = null;
        dropdownBody.classList.remove('open')
        dropdownBtn.classList.remove('open')
        dropdown.classList.remove('open')
      }
    })
  })
}



function changeSelects() {
  /* All select tags most be a wrapped in ".select-wrap class in html"  */

  const selectWrappers = document.querySelectorAll(".select-wrap");
  /* Find all "select-wrap's" */

  for (let el of selectWrappers) {
    let select = el.querySelector("select");

    if (select) {
      select.style.display = "none";

      function createClassedElement(tag, className) {
        const newElem = document.createElement(tag);
        newElem.classList.add(className);
        return newElem;
      }

      const customSelect = createClassedElement("div", "custom-select");

      const customSelectHeader = createClassedElement(
        "button",
        "custom-select__header"
      );
      customSelectHeader.type = "button";
      const customSelectContent = createClassedElement(
        "div",
        "custom-select__content"
      );

      customSelect.append(customSelectHeader);

      customSelect.append(customSelectContent);

      el.append(customSelect);

      for (let i = 0; i < select.options.length; i++) {
        customSelectHeader.innerText =
          select.options[select.options.selectedIndex].text;
        customSelectContent.insertAdjacentHTML(
          "beforeend",
          `<button type="button" class="custom-select__item">${select.options[i].text}</button >`
        );
      }

      customSelect.addEventListener("click", (e) => {
        customSelect.classList.toggle("open");
        if (customSelect.classList.contains("open")) {
          customSelectContent.style.maxHeight = `${customSelectContent.scrollHeight}px`;
          customSelectHeader.classList.add("open");
        } else {
          customSelectContent.style.maxHeight = null;
          customSelectHeader.classList.remove("open");
        }
      });

      document.addEventListener("click", (e) => {
        if (e.target !== customSelectHeader) {
          customSelectContent.style.maxHeight = null;
          customSelectHeader.classList.remove("open");
        }
      });

      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          customSelectContent.style.maxHeight = null;
          customSelectHeader.classList.remove("open");
        }
      });
    }

    const customSelectItems = el.querySelectorAll(".custom-select__item");

    for (let el of customSelectItems) {
      el.addEventListener("click", () => {
        const header = el.parentElement.previousSibling;

        select.value = el.innerText;
        header.innerText = select.value;
      });
    }
  }

  /* custom select */
}

changeSelects()

const viewBtns = document.querySelectorAll('.sorting__view-btn');
for (const item of viewBtns) {
  item.addEventListener('click', () => {
    for (const item of viewBtns) {
      item.classList.remove('active')
    }
    item.classList.add('active')
  })
  viewBtns[0].click()
}


function findFilter() {
  const filter = document.querySelector('.filter-block-js');
  const productBlock = document.querySelector('.product-block-js')

  if (filter) {
    return
  }
  else if (productBlock) {
    productBlock.className = 'col-12';
  }
  else { return }
}
findFilter()

function fixedHeader() {
  const header = document.querySelector('.header');
  const headerHeight = header.offsetHeight;
  const nextEl = header.nextElementSibling;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
      nextEl.style.paddingTop = `${headerHeight}px`;
      header.classList.add('fixed')
    }
    else {
      header.classList.remove('fixed')

      nextEl.style.paddingTop = null
    }
  })

}
fixedHeader()

function showLiveSearch() {
  const headerSearch = document.querySelector('.header-middle__search-form')
  if (headerSearch) {
    const liveSearch = headerSearch.querySelector('.live-search');
    const searchDropdown = document.querySelector('.search-dropdown')
    liveSearch.addEventListener('input', () => {
      searchDropdown.classList.add('active');
      document.addEventListener('keydown', (e) => {
        e.key === 'Escape' ? (liveSearch.blur()) : null
      })
    })
    liveSearch.addEventListener('blur', () => {
      searchDropdown.classList.remove('active')
    })

  }

}
showLiveSearch()

function showTopMenu() {
  const topMenu = document.querySelector('.header-top');
  const burger = document.querySelector('.middle-burger')
  const closeBurger = document.querySelector('.close-burger')
  document.addEventListener('click', e => {
    console.log(e.target);
  })

  burger.addEventListener('click', (e) => {
    e.preventDefault();
    burger.classList.add('open');

    if (burger.classList.contains('open')) {
      topMenu.classList.add('active');
      document.body.style.overflow = 'hidden';
      header.classList.remove('fixed')
    }
  })
  closeBurger.addEventListener('click', () => {
    burger.classList.remove('open');
    topMenu.classList.remove('active');
    document.body.style.overflow = null;
  })

}

showTopMenu()

// function showProduct() {
//   const productCards = document.querySelectorAll('.product__card');
//   if (productCards) {
//     for (const productCard of productCards) {
//       const showPopup = productCard.querySelector('.product__card-look');
//       const productPopup = document.querySelector('.product-popup')
//       console.log(productPopup);
//       showPopup.addEventListener('click', () => {
//         productPopup.classList.add('active')
//       })
//     }
//   }
// }

// showProduct()

const headerCatalog = document.querySelector('.header-catalog')
const catalog = document.querySelector('.header-catalog__wrapper')
const mobCatalog = document.querySelector('.mobile-menu__btn.catalog')
const header = document.querySelector('.header')
const closeMobCatalog = document.querySelector('.header-catalog__back')
mobCatalog.addEventListener('click', () => {
  mobCatalog.classList.toggle('active')
  if (mobCatalog.classList.contains('active')) {
    header.classList.remove('fixed')
    headerCatalog.classList.add('active')
    catalog.classList.add('active')
    document.body.style.overflow = 'hidden';

  } else {
    headerCatalog.classList.remove('active')
    catalog.classList.remove('active')
    document.body.style.overflow = null
  }
})

closeMobCatalog.addEventListener('click', () => {
  headerCatalog.classList.remove('active')
  catalog.classList.remove('active')
  document.body.style.overflow = null
})
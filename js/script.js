/*Карта*/
const init = () => {
  const myMap = new ymaps.Map(
    'map',
    {
      center: [55.161913, 61.431345],
      zoom: 16,
      controls: ['smallMapDefaultSet'],
    },
    {},
  );
  const myPlacemark = new ymaps.Placemark(
    [55.161913, 61.431345],
    {},
    {
      iconLayout: 'default#image',
      iconImageHref: '../img/mark.svg',
      iconImageSize: [50, 50],
      iconImageOffset: [-15, -25],
    },
  );
  myMap.geoObjects.add(myPlacemark);
};
ymaps.ready(init);

/*Модальное окно */

const disabledScroll = () => {
  document.body.scrollPosition = window.scrollY;
  document.body.style.cssText = `
    overflow: hidden;
    position: fixed;
    top: -${document.body.scrollPosition}px;
    left: 0;
    height: 100wh;
    wight: 100wv;
    padding-right: ${window.innerWidth - document.body.offsetWidth}px;
    `;
};

const abledScroll = () => {
  document.body.style.cssText = ``
  window.scroll({top: document.body.scrollPosition});
};

const createElem = (tag, attr) => {
  const elem = document.createElement(tag);
  return Object.assign(elem, {...attr});
};

const createModal = (title, description) => {
  const overlayElem = createElem('div', {className: 'modal'});
  const modalElem = createElem('div', {className: 'modal__block'});
  const modalContainerElem = createElem('div', {className: 'modal__container'});
  
  const titleElem = createElem('h2', {
    className: 'modal__title',
    textContent: `Заказать ${title}` 
  });

  const descriptionElem = createElem('p', {
    className: 'modal__description',
    textContent: description
  });

  const formElem = createElem('form', {
    className: 'modal__form',
    method: 'post',
    action: 'https://jsonplaceholder.typicode.com/posts',
    id: 'order'
  });

  const nameLabelElem = createElem('label', {
    className: 'model__lable'
    
  });

  const nameSpanElem = createElem('span', {
    className: 'modal__text', 
    textContent: 'Имя'
  });

  const nameInputElem = createElem('input', {
    className: 'modal__input',
    placeholder: 'Введите ваше имя',
    name: 'name',
    required: true
  });

  const phoneLabelElem = createElem('label', {
    className: 'model__lable'
  });

  const phoneSpanElem = createElem('span', {
    className: 'modal__text', 
    textContent: 'Телефон'
  });

  const phoneInputElem = createElem('input', {
    className: 'modal__input',
    placeholder: 'Введите ваш телефон',
    name: 'phone',
    required: true
  });

  const hideInput = createElem('input', {
    type: 'hidden',
    nmae: 'product',
    value: title
  });

  const btn = createElem('button', {
    className: 'modal__btn',
    textContent: 'Заказать',
    type: 'submit'
  });

  btn.setAttribute('form', 'order');

  const closeModal = createElem('buttom', {
    className: 'modal__close',
    innerHTML: `
      <svg width="17.500000" height="17.500000" viewBox="0 0 17.5 17.5" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <path id="Vector" d="M17.5 1.76245L15.7373 0L8.75 6.98755L1.7627 0L0 1.76245L6.9873 8.75L0 15.7375L1.7627 17.5L8.75 10.5125L15.7373 17.5L17.5 15.7375L10.5127 8.75L17.5 1.76245Z" fill="#18171A" fill-opacity="1.000000" fill-rule="nonzero"/>
      </svg>
    ` 
  });

  overlayElem.addEventListener('click', event => {
    const target = event.target;
    if (target === overlayElem || target.closest('.modal__close')) {
      overlayElem.remove();
      abledScroll();
    }
  });

  nameLabelElem.append(nameSpanElem, nameInputElem);
  phoneLabelElem.append(phoneSpanElem, phoneInputElem);
  formElem.append(nameLabelElem, phoneLabelElem, hideInput);

  modalContainerElem.append(titleElem, descriptionElem, formElem, btn, closeModal);
  modalElem.append(modalContainerElem);
  overlayElem.append(modalElem);
  disabledScroll();
  document.body.append(overlayElem);
};

const productTitle = document.querySelectorAll('.product__title');
const productDescription = document.querySelectorAll('.product__description');
const productBtn = document.querySelectorAll('.product__btn');

for (let i = 0; i < productBtn.length; i++ ) {
  productBtn[i].addEventListener('click', () => {
    const title = productTitle[i].textContent;
    const description = productDescription[i].textContent;
    createModal(title, description);
  }) ;
}


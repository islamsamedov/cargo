let formStep = 0;

const form = document.querySelector(".quiz__form")

function stepForm() {
   const steps = document.querySelectorAll(".quiz__form-step")
   const prevBtn = document.querySelector(".quiz-prev")
   const nextBtn = document.querySelector(".quiz-next")
   const stepNumbers = document.querySelectorAll(".quiz__form-number")

   form.addEventListener('submit', e => {
      e.preventDefault()
   })

   prevBtn.addEventListener('click', () => {
      formStep--
      stepNumbers[formStep + 1].classList.remove('active-number')
      updateFormSteps()
   })

   nextBtn.addEventListener('click', () => {
      if (!validateForm()) return false;
      document.querySelector('.none').classList.remove('error')
      if (formStep < steps.length - 1) {
         formStep++
         updateFormSteps()
      } else if (formStep == steps.length - 1) {
         form.style.display = 'none'
         document.querySelector(".quiz__form-numbers").style.display = 'none'
         document.querySelector(".quiz__end").style.display = 'block'
         document.querySelector(".quiz__title").classList.add("pt")
         document.querySelector(".quiz__man").classList.add("quiz__manup")
      }
   })

   function validateForm() {
      let valid = true;
      inputs = steps[formStep].querySelectorAll("._req");

      for (let i = 0; i < inputs.length; i++) {
         if (inputs[i].value == "") {
            document.querySelector('.none').classList.add('error');
            valid = false;
         }
      }
      return valid;
   }


   function updateFormSteps() {
      steps.forEach((step) => {
         step.classList.contains('quiz-active') && step.classList.remove('quiz-active')
      })
      steps[formStep].classList.add('quiz-active')
      stepNumbers[formStep].classList.add('active-number')

      if (formStep == 0) {
         prevBtn.style.display = "none";
      } else {
         prevBtn.style.display = "inline-block";
      }
   }
   updateFormSteps()
}


stepForm();

const accItem = document.getElementsByClassName("accordeon__item");

for (let i = 0; i < accItem.length; i++) {
   accItem[i].addEventListener("click", function () {
      this.classList.toggle("opened");

      let panel = this.lastElementChild;

      if (panel.style.maxHeight) {
         panel.style.maxHeight = null;
      } else {
         panel.style.maxHeight = panel.scrollHeight + "px";
      }

   });
}

const burgerMN = document.querySelector(".header__burger")
const headerNav = document.querySelector(".header__list")
const body = document.querySelector('body')

burgerMN.addEventListener("click", function () {
   if (headerNav.classList.contains("nav-open")) {
      headerNav.classList.remove("nav-open");
      burgerMN.classList.remove("active");
      body.classList.remove('no-scroll')
   } else {
      headerNav.classList.add("nav-open");
      burgerMN.classList.add("active");
      body.classList.add('no-scroll')
   }
})



function myFunction() {
   if (x.matches) {
      const swiperFake = document.querySelector('.swiper-fake')
      swiperFake.classList.add('swiper')
      swiperFake.classList.add('benefits-swiper')
      const content = document.querySelector('.content')
      content.classList.add('swiper-wrapper')
   } else if (desktop.matches) {
      const swiperFake = document.querySelector('.swiper-fake')
      swiperFake.classList.remove('swiper')
      swiperFake.classList.remove('benefits-swiper')
      const content = document.querySelector('.content')
      content.classList.remove('swiper-wrapper')
   }
}

let desktop = window.matchMedia("(max-width: 9999px)")
let x = window.matchMedia("(max-width: 600px)")
myFunction(x, desktop)
x.addListener(myFunction)
desktop.addListener(myFunction)

const modalBtn = document.querySelectorAll('[data-modal]')
const modal = document.querySelectorAll('.modal')
const modalClose = document.querySelectorAll('.modal__close')

modalBtn.forEach(item => {
   item.addEventListener('click', e => {
      let $this = e.currentTarget;
      let modalId = $this.getAttribute('data-modal');
      let modal = document.getElementById(modalId);
      let modalContent = modal.querySelector('.modal__content');

      modalContent.addEventListener('click', e => {
         e.stopPropagation()
      })

      e.preventDefault()
      modal.classList.add('show')
      body.classList.add('no-scroll')

      setTimeout(function () {
         modalContent.style.transform = 'none'
         modalContent.style.opacity = 1
      }, 1)

      if (modalId == "modal-img") {
         const aboutImg = e.currentTarget;
         const modalImg = document.querySelector(".full-img")
         let aboutSrc = aboutImg.getAttribute("data-img")
         modalImg.src = `img/${aboutSrc}`
      }
   })
})

modalClose.forEach(item => {
   item.addEventListener('click', e => {
      let currentModal = e.currentTarget.closest('.modal')

      closeModal(currentModal)
   })
})

modal.forEach(item => {
   if (item.id !== "modal-img") {
      item.addEventListener('click', e => {
         let currentModal = e.currentTarget

         closeModal(currentModal)
      })
   }
})

function closeModal(currentModal) {
   let modalContent = currentModal.querySelector('.modal__content');
   modalContent.removeAttribute('style')

   setTimeout(() => {
      currentModal.classList.remove('show')
      body.classList.remove('no-scroll')
   }, 200);
}
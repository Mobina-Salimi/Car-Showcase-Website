'use strict';

// animation

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.animate').forEach(el => observer.observe(el));

// top

const topEl = document.querySelector('.Top')
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 200) {
        topEl.classList.add('active')
    } else {
        topEl.classList.remove('active')
    }
})

// Headers
const btnEl = document.querySelector('.modalBtn')
const modal = document.querySelector('.modalHolderShow')
btnEl.addEventListener('click', () => {
    modal.classList.toggle('show')

})

// section 2

const BrowseSlider = document.querySelector('.BrowseSlider')
const activeBrowse = document.querySelector('.activeBrowse')


let change = true

setInterval(() => {
    if (change) {
        BrowseSlider.classList.add('BrowseSliderShowRight')
        BrowseSlider.classList.add('BrowseSliderShowLeft')
    } else {

    }
    change = !change
}, 4000)


let scrollDir = 1;

setInterval(() => {
    const maxScroll = BrowseSlider.scrollWidth - BrowseSlider.clientWidth;

    if (BrowseSlider.scrollLeft >= maxScroll - 5) {
        scrollDir = -1;
    } else if (BrowseSlider.scrollLeft <= 5) {
        scrollDir = 1;
    }

    BrowseSlider.scrollBy({ left: scrollDir * 160, behavior: 'smooth' });
}, 2500);


// // section 3

const inpPrice = document.querySelector('.inpPrice')
const inpRate = document.querySelector('.inpRate')
const inpPayment = document.querySelector('.inpPayment')
const selectLoan = document.querySelector('.selectLoan')
const BtnEl = document.querySelector('.Btn')
const formContainer = document.querySelector('.formContainer')
const MonthlyPayment = document.querySelector('.MonthlyPayment')
const TotalInterest = document.querySelector('.TotalInterest')
const TotalPayment = document.querySelector('.TotalPayment')

formContainer.addEventListener('submit', (e) => {
    e.preventDefault()

    const inpPriceValue = inpPrice.value
    const inpRateValue = inpRate.value
    const inpPaymentValue = inpPayment.value
    const selectLoanValue = selectLoan.value

    const innerMonthlyPayment = (+inpPriceValue / +selectLoanValue).toFixed(2)
    const innerTotalInterest = (+inpPriceValue / +selectLoanValue + +inpPaymentValue).toFixed(2)
    const innerTotalPayment = Math.sqrt((+inpPriceValue / +selectLoanValue + +inpPaymentValue)).toFixed(2)

    TotalInterest.innerHTML = `$${innerTotalInterest}`
    MonthlyPayment.innerHTML = `$${innerMonthlyPayment}`
    TotalPayment.innerHTML = `$${innerTotalPayment}`
})



// section4
const sliderContainer = document.querySelector('.sliderSearches .container');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');


if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        sliderContainer.scrollBy({ left: -300 });
    });
}

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        sliderContainer.scrollBy({ left: 300 });
    });
}

 // section 5
const Container = document.querySelector('.ClientsContainer');
const allBox = Container.children;
const containerWidth = Container.offsetWidth;
const controls = document.querySelector('.controls');
const margin = 30;
let items = 0;
let totalItems = 0
let jumpSlideWidth = 0;

responsive = [
    { breakPoint: { width: 0, item: 1 } },
    { breakPoint: { width: 600, item: 2 } },
    { breakPoint: { width: 1000, item: 4 } }
]


function load() {
    for (let i = 0; i < responsive.length; i++) {
        if (window.innerWidth > responsive[i].breakPoint.width) {
            items = responsive[i].breakPoint.item
        }
    }
    start()
}


function start() {
    let totalItemWidth = 0;
    for (let i = 0; i < allBox.length; i++) {
        allBox[i].style.width = (containerWidth / items) - margin + "px";
        allBox[i].style.margin = (margin / 2) + 'px'
        totalItemWidth += containerWidth / items;
        totalItems++;
    }

    Container.style.width = totalItemWidth + 'px';
////////////////
    let allSlide = Math.ceil(totalItems / items);
   
    let ul = document.createElement('ul')
    for (let i = 1; i <= allSlide; i++) {
        const li = document.createElement('li')
        li.id = i;
        li.innerHTML = i;
        li.setAttribute('onclick', "controlSlides(this)");
        ul.appendChild(li);
        if(i==1){
            li.className = 'active'
        }
    }
    controls.appendChild(ul)

}


function controlSlides(ele){
    const ul = controls.children;

    const li = ul[0].children;
      
    let active;

    for(let i=0;i<li.length;i++){
        if(li[i].className == "active"){
            active = i;
            li[i].className = ""
        }
    }
    
    ele.className = "active";
    let numb = (ele.id-1)-active;
    jumpSlideWidth = jumpSlideWidth+(containerWidth*numb);
    Container.style.marginLeft = -jumpSlideWidth + "px"

    
}


window.onload = load()



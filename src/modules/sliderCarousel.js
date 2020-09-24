'use strict';

export class SliderCarousel {
  constructor({
    main,
    wrap,
    prev,
    next,
    loop = false,
    position = 0,
    slidesPerView = 3,
    responsive = []
  }) {
    if (!main || !wrap) {
      console.warn('slider-carousel: Необходимо 2 свойства, "main"  и "wrap" !');
    }
    this.main = document.querySelector(main);
    this.wrap = document.querySelector(wrap);
    this.next = document.querySelector(next);
    this.prev = document.querySelector(prev);
    this.slides = this.wrap.children;
    this.slidesPerView = slidesPerView;
    this.options = {
      position,
      slideWidth: Math.floor(100 / slidesPerView),
      maxPosition: this.slides.length - this.slidesPerView,
      loop
    };
    this.responsive = responsive;
  }

  init() {
    this.addGloClass();
    this.addStyles();

    if (this.prev && this.next) {
      this.controlSlider();
    } else {
      this.addArrow();
      this.controlSlider();
    }
    if (this.responsive) {
      this.responseInit();
    }
  }

  addGloClass() {
    this.main.classList.add('glo-slider');
    this.wrap.classList.add('glo-slider__wrap');
    [...this.slides].forEach(slide => slide.classList.add('glo-slider__item'));
  }

  addStyles() {
    let style = document.getElementById('sliderCarousel-style');
    if (!style) {
      style = document.createElement('style');
      style.id = 'sliderCarousel-style';
    }

    style.textContent = `
      .glo-slider{
      overflow: hidden !important;
      }
      .glo-slider__wrap{
      display: flex !important;
      transition: transform 0.5s !important;
      will-change: transform !important;
      }
      .glo-slider__item{
      display: flex !important;
      justify-content: center  !important;
      align-items: center  !important;
      flex: 0 0 ${this.options.slideWidth}% !important;
      margin: auto 0 !important;
      }      
`;
    document.head.append(style);
  }

  controlSlider() {
    this.prev.addEventListener('click', this.prevSlider.bind(this));
    this.next.addEventListener('click', this.nextSlider.bind(this));
  }

  prevSlider() {
    if (this.options.loop || this.options.position > 0) {
      --this.options.position;
      if (this.options.position < 0) {
        this.options.position = this.options.maxPosition;
      }
      this.wrap.style.transform = `translateX(-${this.options.position * this.options.slideWidth}%)`;
    }
  }

  nextSlider() {
    if (this.options.loop || this.options.position < this.options.maxPosition) {
      ++this.options.position;
      if (this.options.position > this.options.maxPosition) {
        this.options.position = 0;
      }
      this.wrap.style.transform = `translateX(-${this.options.position * this.options.slideWidth}%)`;
    }
  }

  addArrow() {
    this.prev = document.createElement('button');
    this.next = document.createElement('button');

    this.prev.className = 'glo-slider__prev';
    this.next.className = 'glo-slider__next';

    this.main.append(this.prev);
    this.main.append(this.next);

    const style = document.createElement('style');
    style.textContent = `
      .glo-slider__prev, .glo-slider__next {
      margin: 0 10px;
      border: 20px solid transparent;
      background: transparent;
      cursor: pointer;
      } 
      .glo-slider__next {
      border-left-color: #19b5fe;
      }
       
      .glo-slider__prev {
      border-right-color: #19b5fe;
      } 
      
      .glo-slider__prev:hover,
      .glo-slider__next:hover,
      .glo-slider__prev:focus,
      .glo-slider__next:focus {
      background: transparent;
      outline: transparent;
      }
`;
    document.head.append(style);
  }

  responseInit() {
    const slidesPerViewDefault = this.slidesPerView;
    const allBreakpoints = this.responsive.map(item => item.breakpoint);
    const maxBreakpoint = Math.max(...allBreakpoints);

    const checkBreakpoint = () => {
      const windowWidth = document.documentElement.clientWidth;
      if (windowWidth < maxBreakpoint) {
        allBreakpoints.forEach((breakpoint, index) => {
          if (windowWidth < breakpoint) {
            this.slidesPerView = this.responsive[index].sliderPerView;
            this.options.slideWidth = Math.floor(100 / this.slidesPerView);
            this.addStyles();
          }
        });
      } else {
        this.slidesPerView = slidesPerViewDefault;
        this.options.slideWidth = Math.floor(100 / this.slidesPerView);
        this.addStyles();
      }
    };

    checkBreakpoint();

    window.addEventListener('resize', checkBreakpoint);

  }
}

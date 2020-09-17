'use strict';

import "./modules/polyfills";

import {countTimer} from "./modules/countTimer";
import {activateScrollDownButton} from "./modules/activateScrollDownButton";
import {toggleMenu} from "./modules/toggleMenu";
import {togglePopUp} from "./modules/togglePopUp";
import {controlTabs} from "./modules/controlTabs";
import {slider} from "./modules/slider";
import {changeCommandPhotoByMouseEvent} from "./modules/changeCommandPhotoByMouseEvent";
import {validate} from "./modules/validate";
import {calc} from "./modules/calc";
import {sendForm} from "./modules/sendForm";

// Запуск таймера
countTimer('20 september 2020 08:15:30', '#timer-hours', '#timer-minutes', '#timer-seconds');

// Настройка работы кнопки Вниз
activateScrollDownButton('#service-block');

// Вызов функции управления меню
toggleMenu('.menu', 'menu');

// Вызов функции управления модальными окнами
togglePopUp('.popup-btn', '.popup');

// Вызов функции управления переключения табов
controlTabs('.service-header', '.service-header-tab', '.service-tab');

// Запуск слайдера
slider('.portfolio-content', 'portfolio-item', '-active', '.portfolio-dots', 'dot', '#arrow-left', '#arrow-right', true, 5000);

// Смена фотографий в блоке команда по наведению мыши
changeCommandPhotoByMouseEvent('.command__photo');

// Настройка валидации полей
{
  validate('input.calc-item', [/\D|^0+/g, '']);
  validate('input.form-phone', [/[^+\d]/g, ''], [/((?!^\+?)|(?![\d]*))\+/g, '$1'], [/(.{0,13}).*/g, '$1'] );
  validate('input.form-name, #form2-name', [/[^\p{Script=Cyrillic}\s]/gu, '']);
  validate('input.mess', [/[^\p{Script=Cyrillic}\d\p{P}\s]/gu, '']);
}

// Запуск калькулятора
calc(100);

// Настройка отправки форм
{
  sendForm('#form1',
    {
      loadMessageOrInnerHTML: `
      <div class="preloader">
        <div class="pl-child-1 pl-child"></div>
        <div class="pl-child-2 pl-child"></div>
        <div class="pl-child-3 pl-child"></div>
      </div>
    `,
      loadMessageStyleCSS: `
      .preloader {
        width: 6em;
        margin: auto;
        padding: 5px;
        text-align: center;
        }
        
      .pl-child {
        width: 1em;
        height: 1em;
        background-color: #19b5fe ;
        border-radius: 100%;
        display: inline-block;
        animation: preloader 1.4s ease-in-out 0s infinite both;
      }
  
      .pl-child-1 {
        animation-delay: -0.32s;
      }
      
      .pl-child-2 {
        animation-delay: -0.16s;
      }
  
      @keyframes preloader {
        0%, 80%, 100% {
          transform: scale(0);
        }
        40% {
          transform: scale(1.0);
        }
  `
    });

  sendForm('#form2',
    {
      loadMessageOrInnerHTML: `
      <div class="preloader">
        <div class="pl-child-1 pl-child"></div>
        <div class="pl-child-2 pl-child"></div>
        <div class="pl-child-3 pl-child"></div>
      </div>
    `
    });

  sendForm('#form3',
    {
      messageStyles: 'font-size: 2rem; color: white;',
      loadMessageOrInnerHTML: `
      <div class="preloader">
        <div class="pl-child-1 pl-child"></div>
        <div class="pl-child-2 pl-child"></div>
        <div class="pl-child-3 pl-child"></div>
      </div>
    `
    });
}

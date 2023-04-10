// Імпортуємо функцію throttle з бібліотеки lodash
import throttle from 'lodash.throttle';

//Імпортуємо власні файли
import { common } from './helpers_03/common';

const form = document.querySelector('.feedback-form');
let formData = {};
// Додаємо слухача 'submit'
form.addEventListener('submit', onFormSubmit);
// Додаємо слухача 'input' до форми з використанням throttle.
form.addEventListener('input', throttle(function (evt) {
    formData[evt.target.name] = evt.target.value;
    localStorage.setItem(common.feedbackFormState, JSON.stringify(formData))
}, 500));
// При перезавантаженні сторінки перевіряємо наявність даних форми в локальному сховищі 
if (localStorage.getItem(common.feedbackFormState)) {
    formData = JSON.parse(localStorage.getItem(common.feedbackFormState));
    for (let key in formData) {
        form.elements[key].value = formData[key];
    }
}
//Передаємо форму та перед цим перевіряємо чи всі поля заповнені
function onFormSubmit(evt) { 
    evt.preventDefault();
    
    const { email, message } = evt.currentTarget.elements;
    if (!email.value || !message.value) {
        alert('Всі поля повинні бути заповнені');
        return;
    }
   
    evt.currentTarget.reset(); 
    localStorage.removeItem(common.feedbackFormState);
    console.log(formData);
}

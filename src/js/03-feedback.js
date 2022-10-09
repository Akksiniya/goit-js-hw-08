import throttle from 'lodash.throttle';

const formRef = document.querySelector('.feedback-form');
const FORM_KEY = 'feedback-form-state';

import { save, load, remove } from './storage';


initPage();

formRef.addEventListener('input', throttle(onFormInput, 500));

function onFormInput (evt) {
  const { name, value} = evt.target;

      let saveData = load(FORM_KEY);

      saveData = saveData ? saveData : {};
      
      saveData[name] = value;
      save(FORM_KEY, saveData);
 };

function initPage () {
    const saveData = load(FORM_KEY);
   
    if (!saveData) {
        return;
    } 

    Object.entries(saveData).forEach (([name, value]) => {
      formRef.elements[name].value = value;
    });
};

function resetForm (evt) {
  evt.preventDefault();

  const {
    elements: { email, message },
 } = evt.currentTarget;

 console.log({ email: email.value, message: message.value });

 evt.currentTarget.reset();
 remove(FORM_KEY);
};

formRef.addEventListener('submit', resetForm);


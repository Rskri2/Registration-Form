/*eslint-disable*/
import axios from "axios";
import { showAlert } from './showAlert.js';

const form = document.querySelector('.form');

if(form){
  const yearSelect = document.getElementById('year');
  const monthSelect =document.getElementById('month');
  const daySelect = document.getElementById('day');
  
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  function populateMonths() {
    for (let i = 0; i < months.length; i++) {
      const option = document.createElement('option');
      option.textContent = months[i];
      monthSelect.appendChild(option);
    }
    monthSelect.value = 'January';
  }
  let previousDay;
  
  function populateDays(month) {
    while (daySelect.firstChild) {
      daySelect.removeChild(daySelect.firstChild);
    }
    let dayNum;
    let year = yearSelect.value;
  
    if (
      month === 'January' ||
      month === 'March' ||
      month === 'May' ||
      month === 'July' ||
      month === 'August' ||
      month === 'October' ||
      month === 'December'
    ) {
      dayNum = 31;
    } else if (
      month === 'April' ||
      month === 'June' ||
      month === 'September' ||
      month === 'November'
    ) {
      dayNum = 30;
    } else {
      if (new Date(year, 1, 29).getMonth() === 1) {
        dayNum = 29;
      } else {
        dayNum = 28;
      }
    }
    for (let i = 1; i <= dayNum; i++) {
      const option = document.createElement('option');
      option.textContent = i;
      daySelect.appendChild(option);
    }
    if (previousDay) {
      daySelect.value = previousDay;
      if (daySelect.value === '') {
        daySelect.value = previousDay - 1;
      }
      if (daySelect.value === '') {
        daySelect.value = previousDay - 2;
      }
      if (daySelect.value === '') {
        daySelect.value = previousDay - 3;
      }
    }
  }
  
  function populateYears() {
    let year = new Date().getFullYear();
    for (let i = 0; i < 101; i++) {
      const option = document.createElement('option');
      option.textContent = year - i;
      yearSelect.appendChild(option);
    }
  }
  
  populateDays(monthSelect.value);
  populateYears();
  populateDays();
  populateMonths();
  yearSelect.onchange = function () {
    populateDays(monthSelect.value);
  };
  monthSelect.onchange = function () {
    populateDays(monthSelect.value);
  };
  daySelect.onchange = function () {
    previousDay = daySelect.value;
  };  
  
  const submitBtn = document.querySelector('.btn--submit');
 
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fname = document.querySelector('.fname').value;
    const mname = document.querySelector('.mname').value;
    const sname = document.querySelector('.sname').value;
    const phone = document.querySelector('.phone').value;
    const email = document.querySelector('.email').value;
    const password = document.querySelector('.password').value;
    
    const day = document.getElementById('day').value;
    let month = document.getElementById('month').value;
    let year = document.getElementById('year').value;
    const DOB = new Date(`${year}-${month}-${day}`);
     
    updateSetting({ fname, mname, sname, phone, email, password ,day,month,year});
    document.querySelector('.fname').value = '';
    document.querySelector('.mname').value = '';
    document.querySelector('.sname').value = '';
    document.querySelector('.phone').value = '';
    document.querySelector('.email').value = '';
    document.querySelector('.password').value = '';
  });
  
  const updateSetting = async (data) => {
    try {
      const url = 'http://127.0.0.1:3000/api/v1/register';
      const res = await axios({
        method: 'POST',
        url,
        data
        });
      if (res.data.status === 'success') {
        showAlert('success', 'Data successfully saved');
      }
    } catch (err) {
      showAlert('error', 'Error while saving data to the database');
    }
  };
  }


  

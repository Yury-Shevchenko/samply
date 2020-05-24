let datePickerNum = 1;

document.getElementById('addDatePicker').addEventListener('click', function addDatePicker() {
  datePickerNum = datePickerNum + 1;
  var container = document.getElementById("datePicker");
  var newPicker = document.createElement('div');
  newPicker.id = `container-date-picker-${datePickerNum}`;
  newPicker.classList.add('containerDatePicker');

  var dayInput = document.createElement('input');
  dayInput.classList.add('datePickerInput');
  dayInput.classList.add('datePickerDay');
  dayInput.type = 'number';
  dayInput.min = 1;
  dayInput.max = 31;
  dayInput.value = (new Date).getDate();
  dayInput.name = `date-specific-day-${datePickerNum}`

  var monthInput = document.createElement('input');
  monthInput.classList.add('datePickerInput');
  monthInput.classList.add('datePickerMonth');
  monthInput.type = 'number';
  monthInput.min = 1;
  monthInput.max = 12;
  monthInput.value = (new Date).getMonth() + 1;
  monthInput.name = `date-specific-month-${datePickerNum}`

  var yearInput = document.createElement('input');
  yearInput.classList.add('datePickerInput');
  yearInput.classList.add('datePickerYear');
  yearInput.type = 'number';
  yearInput.value = (new Date).getFullYear();
  yearInput.name = `date-specific-year-${datePickerNum}`

  newPicker.appendChild(dayInput);
  newPicker.appendChild(monthInput);
  newPicker.appendChild(yearInput);

  var removePickerBtn = document.createElement('button');
  removePickerBtn.innerText = 'x';
  removePickerBtn.classList.add('removePickerButton');
  removePickerBtn.id = `-${datePickerNum}`;
  removePickerBtn.addEventListener('click', removeDatePicker);
  newPicker.appendChild(removePickerBtn);
  container.appendChild(newPicker);
});

function removeDatePicker(){
  const id = this.id;
  var container = document.getElementById("datePicker");
  const containerPicker = document.getElementById(`container-date-picker${id}`);
  container.removeChild(containerPicker);
};

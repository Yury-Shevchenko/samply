let timePickerNum = 1;

document.getElementById('addTimePicker').addEventListener('click', function addTimePicker() {
  timePickerNum = timePickerNum + 1;
  var container = document.getElementById("timePicker");
  var newPicker = document.createElement('div');
  newPicker.id = `container-picker-${timePickerNum}`;
  newPicker.classList.add('containerTimePicker');

  var hourInput = document.createElement('input');
  hourInput.classList.add('timePickerHour');
  hourInput.type = 'number';
  hourInput.min = 0;
  hourInput.max = 23;
  hourInput.value = '';
  hourInput.name = `time-specific-hour-${timePickerNum}`

  var minuteInput = document.createElement('input');
  minuteInput.classList.add('timePickerMinute');
  minuteInput.type = 'number';
  minuteInput.min = 0;
  minuteInput.max = 59;
  minuteInput.value = '';
  minuteInput.name = `time-specific-minute-${timePickerNum}`

  newPicker.appendChild(hourInput);
  newPicker.appendChild(minuteInput);

  var removePickerBtn = document.createElement('button');
  removePickerBtn.innerHTML = `&times`;
  removePickerBtn.classList.add('removePickerButton');
  removePickerBtn.id = `-${timePickerNum}`;
  removePickerBtn.addEventListener('click', removeTimePicker);
  newPicker.appendChild(removePickerBtn);
  container.appendChild(newPicker);
});

function removeTimePicker(){
  const id = this.id;
  var container = document.getElementById("timePicker");
  const containerPicker = document.getElementById(`container-picker${id}`);
  container.removeChild(containerPicker);
};

// window interval
let windowPickerNum = 1;

document.getElementById('addTimeWindow').addEventListener('click', function addWindowPicker() {
  windowPickerNum = windowPickerNum + 1;
  var container = document.getElementById("timeWindow");
  var newPicker = document.createElement('div');
  newPicker.id = `container-window-picker-${windowPickerNum}`;
  newPicker.classList.add('containerTimeWindow');

  var hourInputStart = document.createElement('input');
  hourInputStart.classList.add('timeWindowInput');
  hourInputStart.classList.add('windowPickerHourStart');
  hourInputStart.type = 'number';
  hourInputStart.min = 0;
  hourInputStart.max = 23;
  hourInputStart.value = '';
  hourInputStart.name = `time-window-start-hour-${windowPickerNum}`

  var minuteInputStart = document.createElement('input');
  minuteInputStart.classList.add('timeWindowInput');
  minuteInputStart.classList.add('windowPickerMinuteStart');
  minuteInputStart.type = 'number';
  minuteInputStart.min = 0;
  minuteInputStart.max = 59;
  minuteInputStart.value = '';
  minuteInputStart.name = `time-window-start-minute-${windowPickerNum}`

  var intervalLabel = document.createElement('label');

  var hourInputEnd = document.createElement('input');
  hourInputEnd.classList.add('timeWindowInput');
  hourInputEnd.classList.add('windowPickerHourEnd');
  hourInputEnd.type = 'number';
  hourInputEnd.min = 0;
  hourInputEnd.max = 23;
  hourInputEnd.value = '';
  hourInputEnd.name = `time-window-end-hour-${windowPickerNum}`

  var minuteInputEnd = document.createElement('input');
  minuteInputEnd.classList.add('timeWindowInput');
  minuteInputEnd.classList.add('windowPickerMinuteEnd');
  minuteInputEnd.type = 'number';
  minuteInputEnd.min = 0;
  minuteInputEnd.max = 59;
  minuteInputEnd.value = '';
  minuteInputEnd.name = `time-window-end-minute-${windowPickerNum}`

  var endLabel = document.createElement('label');

  var numberTimePoints = document.createElement('input');
  numberTimePoints.classList.add('timeWindowNumberOfPointsInput');
  numberTimePoints.type = 'number';
  numberTimePoints.min = 1;
  numberTimePoints.value = 1;
  numberTimePoints.name = `time-window-number-points-${windowPickerNum}`

  newPicker.appendChild(hourInputStart);
  newPicker.appendChild(minuteInputStart);
  newPicker.appendChild(intervalLabel);
  newPicker.appendChild(hourInputEnd);
  newPicker.appendChild(minuteInputEnd);
  newPicker.appendChild(endLabel);
  newPicker.appendChild(numberTimePoints);

  var removePickerBtn = document.createElement('button');
  removePickerBtn.innerText = 'x';
  removePickerBtn.classList.add('removePickerButton');
  removePickerBtn.id = `-${windowPickerNum}`;
  removePickerBtn.addEventListener('click', removeWindowPicker);
  newPicker.appendChild(removePickerBtn);
  container.appendChild(newPicker);
});

function removeWindowPicker(){
  const id = this.id;
  var container = document.getElementById("timeWindow");
  const containerPicker = document.getElementById(`container-window-picker${id}`);
  container.removeChild(containerPicker);
};

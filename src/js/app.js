let windowFrame = document.getElementById('window');
let storage = window.localStorage;
if(!storage.home) storage.setItem('home', JSON.stringify({navbar:'',frame:''}));
if(!storage.alarms) storage.setItem('alarms', JSON.stringify([]));

function navEvent(file) { 
    return function clickEvent(ev) {
        let home = JSON.parse(storage.home);
        if(windowFrame.attributes[1].value != `src/components/${file}.html`) {
            for(let i = 0; i < 4; i++) {
                document.querySelectorAll('button.flexItem')[i].classList.remove('clicked');
                if(document.querySelectorAll('button.flexItem')[i] == this) {
                    home.navbar =  i;
                    home.frame = file;
                }
            }
            windowFrame.attributes[1].value = `src/components/${file}.html`;
            this.classList.add('clicked');
        } else {        
            this.classList.remove('clicked');
            windowFrame.attributes[1].value = "src/components/home.html";
            home.navbar =  '';        
        }
        if(home.frame == 'alarm') {
          setAlarmEvents()
        }
        storage.home = JSON.stringify(home);
    }
}

document.querySelectorAll('button.flexItem')[0].addEventListener('click', navEvent('clock'))
document.querySelectorAll('button.flexItem')[1].addEventListener('click', navEvent('alarm'))

document.addEventListener('DOMContentLoaded', () => {
  let navbar = JSON.parse(storage.home).navbar;
  let frame = JSON.parse(storage.home).frame;
  if(navbar == '' && typeof navbar == 'string') return;
  document.querySelectorAll('button.flexItem')[+navbar].classList.add('clicked');
  windowFrame.attributes[1].value = `src/components/${frame}.html`
  if(frame == 'alarm') {
    setAlarmEvents()
  }
})

function setAlarmEvents() {
  setTimeout(() => {
    windowFrame.contentDocument.querySelector('.add').addEventListener('click', () => {
      document.querySelector('.blank').style.display = 'block';
    })
  },200)

  function changeTime(number, position, operator) {
    return function timeEvent() {
      let timeText = timeClass.children[4].textContent;
      let hours = timeText.split(':'), modulus = 24;
      if(position == 1) modulus = 60;
      hours[position] = (eval(`${hours[position]}${operator}${number}`)%modulus);
      if(parseInt(hours[position]) < 0 ) {
          position? hours[position] = hours[position] + 60 : hours[position] = hours[position] + 24}
      hours[position] = hours[position].toString().padStart(2,'0')
      timeClass.children[4].textContent = hours.join(':');
    }
  }
  let timeClass = document.querySelector('.timeBuild');
  timeClass.children[0].addEventListener('click', changeTime(10, 0,'+'))
  timeClass.children[1].addEventListener('click', changeTime(1, 0,'+'))
  timeClass.children[2].addEventListener('click', changeTime(10, 1,'+'))
  timeClass.children[3].addEventListener('click', changeTime(1, 1,'+'))
  timeClass.children[5].addEventListener('click', changeTime(10, 0,'-'))
  timeClass.children[6].addEventListener('click', changeTime(1, 0,'-'))
  timeClass.children[7].addEventListener('click', changeTime(10, 1,'-'))
  timeClass.children[8].addEventListener('click', changeTime(1, 1,'-'))

  function cancelAlarm() {
    document.querySelector('.blank').style.display = 'none';
    document.querySelector('p.text').textContent = '00:00';
    for(let i = 0; i < document.querySelector('.dayBuild').children.length; i++) {
      document.querySelector('.dayBuild').children[i].classList.remove('text');
    }
  }
  document.querySelector('.cancel').addEventListener('click', cancelAlarm)

  for(let i = 0; i < document.querySelector('.dayBuild').children.length; i++) {
    document.querySelector('.dayBuild').children[i]
      .addEventListener('click', (ev) => {
        if(ev.target.classList == false) {
          ev.target.classList.add('text')
        } else {
          ev.target.classList.remove('text')
        }
      })
  }

  document.querySelector('.set').addEventListener('click', (ev) =>{
    let selectedTime = ev.target.parentElement.previousElementSibling
      .previousElementSibling.children[4].textContent;
    console.log(selectedTime);
    let alarm = document.createElement('div');
    alarm.classList.add('alarm');
    alarm.classList.add('disabled');
    let time = document.createElement('div');
    // timeCount = 0;
    time.classList.add('time');
    for(let i = 0; i < 9; i++) {
      if(i < 4) {
        let plus = document.createElement('button');
        plus.classList.add('material-icons');
        plus.textContent = 'keyboard_arrow_up';
        time.appendChild(plus);
      } else if(i == 4) {
        let text = document.createElement('p');
        text.classList.add('text');
        text.textContent = selectedTime;
        time.appendChild(text);
      } else if(i > 4) {
        let minus = document.createElement('button');
        minus.classList.add('material-icons');
        minus.textContent = 'keyboard_arrow_down';
        time.appendChild(minus);
      }
    }
    alarm.appendChild(time);
    let select = document.createElement('div'), 
      dayArray = ['Po','Ut','St','Št','Pi','So','Ne'];
    select.classList.add('select');
    select.classList.add('text');
    for(let i = 0; i < 7; i++) {
      let day = document.createElement('span');
      day.textContent = dayArray[i];
      if(document.querySelector('.dayBuild').children[i].className == 'text') {
          day.classList.add('text');
      }
      select.appendChild(day);
    }
    alarm.appendChild(select);
    let options = document.createElement('div');
    options.classList.add('options');
    let pref = document.createElement('button');
    pref.classList.add('pref');
    pref.textContent = '...';
    pref.disabled = 'true';
    let checkmark = document.createElement('button');
    checkmark.classList.add('checkmark');
    let remove = document.createElement('button');
    remove.classList.add('delete');
    remove.classList.add('text');
    remove.textContent = 'Remove';
    options.appendChild(pref);
    options.appendChild(checkmark);
    options.appendChild(remove);
    alarm.appendChild(options);
    windowFrame
      .contentDocument.querySelector('.wrapper').appendChild(alarm);
    setTimeout(cancelAlarm(), 1000)
    let newCheck = windowFrame.contentDocument.querySelectorAll('.checkmark');
      newCheck[newCheck.length -1].addEventListener('click', (ev) => {
      let classArr = ev.target.parentElement.parentElement.classList;
      let prefs = windowFrame.contentDocument.querySelectorAll('.pref');
      if(classArr.contains('disabled')) {
        classArr.remove('disabled');
        prefs[prefs.length -1].disabled = false;
      } else {
        classArr.add('disabled');
        prefs[prefs.length -1].disabled = true;
        if(classArr.contains('modify')) classArr.remove('modify');
      }
    })
    function handler(ev) {
      if(ev.target.classList == false) {
        ev.target.classList.add('text')
      } else {
        ev.target.classList.remove('text')
      }
    }
    let newPref = windowFrame.contentDocument.querySelectorAll('.pref');
    newPref[newPref.length-1].addEventListener('click',(ev) => {
      let pref = ev.target, check = pref.nextElementSibling;
      let classArr = ev.target.parentElement.parentElement.classList;
      let newSelect = windowFrame.contentDocument.querySelectorAll('.select');
      if(!classArr.contains('modify')) {
        classArr.add('modify');
        pref.classList.add('material-icons');
        pref.textContent = 'done';
        for(let i = 0; i < newSelect[newSelect.length-1].children.length; i++) {
          newSelect[newSelect.length-1].children[i].addEventListener('click', handler, true)
        }
        check.disabled = true;
      } else {
          classArr.remove('modify');
          pref.classList.remove('material-icons');
          pref.textContent = '...';
          for(let i = 0; i < newSelect[newSelect.length-1].children.length; i++) {
            newSelect[newSelect.length-1].children[i].removeEventListener('click', handler, true)
          }
          check.disabled = false;
      }
    })
    function changeTime(number, position, operator) {
      return function timeEvent() {
        let timeText = timeClass.children[4].textContent;
        let hours = timeText.split(':'), modulus = 24;
        if(position == 1) modulus = 60;
        hours[position] = (eval(`${hours[position]}${operator}${number}`)%modulus);
        if(parseInt(hours[position]) < 0 ) {
          position? hours[position] = hours[position] + 60 : hours[position] = hours[position] + 24}
        hours[position] = hours[position].toString().padStart(2,'0')
        timeClass.children[4].textContent = hours.join(':');
      }
    }
    let timeClass = windowFrame.contentDocument.querySelectorAll('.time')
    [windowFrame.contentDocument.querySelectorAll('.time').length -1];
    timeClass.children[0].addEventListener('click', changeTime(10, 0,'+'))
    timeClass.children[1].addEventListener('click', changeTime(1, 0,'+'))
    timeClass.children[2].addEventListener('click', changeTime(10, 1,'+'))
    timeClass.children[3].addEventListener('click', changeTime(1, 1,'+'))
    timeClass.children[5].addEventListener('click', changeTime(10, 0,'-'))
    timeClass.children[6].addEventListener('click', changeTime(1, 0,'-'))
    timeClass.children[7].addEventListener('click', changeTime(10, 1,'-'))
    timeClass.children[8].addEventListener('click', changeTime(1, 1,'-'))
    windowFrame.contentDocument.querySelectorAll('.delete')
    [windowFrame.contentDocument.querySelectorAll('.delete').length -1]
    .addEventListener('click', (ev) => {
      let alarm = ev.target.parentElement.parentElement;
      let wrapper = alarm.parentElement;
      wrapper.removeChild(alarm);
    })
})
}
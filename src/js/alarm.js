document.querySelector('.checkmark').addEventListener('click', (ev) => {
    let classArr = ev.target.parentElement.parentElement.classList;
    if(classArr.contains('disabled')) {
        classArr.remove('disabled');
        document.querySelector('.pref').disabled = false;
    } else {
        classArr.add('disabled');
        document.querySelector('.pref').disabled = true;
        if(classArr.contains('modify')) classArr.remove('modify');
    }
    return
})

function handler(ev) {
    if(ev.target.classList == false) {
        ev.target.classList.add('text')
    } else {
        ev.target.classList.remove('text')
    }
}
document.querySelector('.pref').disabled = true;
document.querySelector('.pref').addEventListener('click', (ev) => {
    let pref = ev.target, check = pref.nextElementSibling;
    let classArr = ev.target.parentElement.parentElement.classList;
    if(!classArr.contains('modify')) {
        classArr.add('modify');
        pref.classList.add('material-icons');
        pref.textContent = 'done';
        for(let i = 0; i < document.querySelector('.select').children.length; i++) {
        document.querySelector('.select').children[i]
            .addEventListener('click', handler, true)
        }
        check.disabled = true;
    } else {
        classArr.remove('modify');
        pref.classList.remove('material-icons');
        pref.textContent = '...';
        for(let i = 0; i < document.querySelector('.select').children.length; i++) {
            document.querySelector('.select').children[i]
                .removeEventListener('click', handler, true)
        }
        check.disabled = false;
    }
    return
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
let timeClass = document.querySelector('.time');
timeClass.children[0].addEventListener('click', changeTime(10, 0,'+'))
timeClass.children[1].addEventListener('click', changeTime(1, 0,'+'))
timeClass.children[2].addEventListener('click', changeTime(10, 1,'+'))
timeClass.children[3].addEventListener('click', changeTime(1, 1,'+'))
timeClass.children[5].addEventListener('click', changeTime(10, 0,'-'))
timeClass.children[6].addEventListener('click', changeTime(1, 0,'-'))
timeClass.children[7].addEventListener('click', changeTime(10, 1,'-'))
timeClass.children[8].addEventListener('click', changeTime(1, 1,'-'))

document.querySelector('.delete').addEventListener('click', (ev) => {
    let alarm = ev.target.parentElement.parentElement;
    let wrapper = alarm.parentElement;
    wrapper.removeChild(alarm);
})
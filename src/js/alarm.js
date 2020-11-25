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
document.querySelector('.pref').disabled = true;
document.querySelector('.pref').addEventListener('click', (ev) => {
    console.log(ev.target.parentElement.parentElement);
    let classArr = ev.target.parentElement.parentElement.classList;
    if(classArr.contains('modify')) {
        classArr.remove('modify');
    } else {
        classArr.add('modify');
    }
    return
})

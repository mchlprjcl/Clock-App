document.querySelector('.checkmark').addEventListener('click', (ev) => {
    let classArr = ev.target.parentElement.parentElement.classList;
    if(classArr.contains('disabled')) {
        classArr.remove('disabled');
    } else {
        classArr.add('disabled');
    }
    return
})
let windowFrame = document.getElementById('window');

function navEvent(file) { 
    return function clickEvent(ev) {
        if(windowFrame.attributes[1].value != `src/components/${file}.html`) {
            for(let i = 0; i < 4; i++) {
                document.querySelectorAll('button.flexItem')[i].classList.remove('clicked');
            }
            windowFrame.attributes[1].value = `src/components/${file}.html`
            this.classList.add('clicked');
        } else {        
            this.classList.remove('clicked');
            windowFrame.attributes[1].value = "src/components/home.html"
        }
    }
}

document.querySelectorAll('button.flexItem')[0].addEventListener('click', navEvent('clock'))

document.querySelectorAll('button.flexItem')[1].addEventListener('click', navEvent('alarm'))

// for(let i = 0; i < 4; i++) {
//     document.querySelectorAll('button.flexItem')[i].addEventListener('click', (ev) => {
//             ev.target.classList.add('clicked');
//     })
// }
let windowFrame = document.getElementById('window');
let storage = window.localStorage;
if(!storage.navbar) storage.setItem('navbar','');
if(!storage.frame) storage.setItem('frame','');

function navEvent(file) { 
    return function clickEvent(ev) {
        if(windowFrame.attributes[1].value != `src/components/${file}.html`) {
            for(let i = 0; i < 4; i++) {
                document.querySelectorAll('button.flexItem')[i].classList.remove('clicked');
                if(document.querySelectorAll('button.flexItem')[i] == this) {
                    storage.navbar = i;
                    storage.frame = file;
                }
            }
            windowFrame.attributes[1].value = `src/components/${file}.html`;
            this.classList.add('clicked');
        } else {        
            this.classList.remove('clicked');
            windowFrame.attributes[1].value = "src/components/home.html";
            storage.navbar = '';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if(!storage.navbar) return;
    document.querySelectorAll('button.flexItem')[+storage.navbar].classList.add('clicked');
    windowFrame.attributes[1].value = `src/components/${storage.frame}.html`
})

document.querySelectorAll('button.flexItem')[0].addEventListener('click', navEvent('clock'))

document.querySelectorAll('button.flexItem')[1].addEventListener('click', navEvent('alarm'))

// for(let i = 0; i < 4; i++) {
//     document.querySelectorAll('button.flexItem')[i].addEventListener('click', (ev) => {
//             ev.target.classList.add('clicked');
//     })
// }
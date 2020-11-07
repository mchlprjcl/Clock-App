let date = new Date();

function cas() {
    return new Date().toString().split(' ')[4];
}

document.querySelector('p.text').textContent = cas();

document.addEventListener('DOMContentLoaded', () => {
    setInterval(() => {
        document.querySelector('p.text').textContent = cas();
    }, 1000)
})
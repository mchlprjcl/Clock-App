let den = ['Nedeľa', 'Pondelok', 'Utorok', 'Streda', 'Štvrtok', 'Piatok', 'Sobota'];

function cas() {
    return new Date().toString().split(' ')[4];
}
function datum() {
    let d = new Date();
    return `${den[d.getDay()]} ${d.getDate()}.${d.getMonth()+1}.${d.getFullYear()}`;
}

document.querySelector('p.text').textContent = cas();
document.querySelectorAll('p')[1].textContent = datum();

document.addEventListener('DOMContentLoaded', () => {
    setInterval(() => {
        document.querySelector('p.text').textContent = cas();
        document.querySelectorAll('p')[1].textContent = datum();
    }, 1000)
})

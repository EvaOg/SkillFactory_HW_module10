const btn = document.querySelector('.btn');
const icons = document.querySelectorAll('.btn_icon')

function changeIcon () {
    
    for (let icon of icons){
        if (icon.style.display === "none"){
            icon.style.display = "block";
        } else {
            icon.style.display = "none";
        } 
    }
}

btn.addEventListener('click', changeIcon);
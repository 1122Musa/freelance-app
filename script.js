console.log("FreeLancer Website for freelancing");

let bar = document.querySelector("header");



window.addEventListener('scroll', function(){
    let scrolled = window.scrollY;
    // console.log(scrolled);
    if(scrolled.value >= 300){
        // bar.classList.toggle('header-1');
        bar.style.position = 'sticky';
        console.log('sticy');
    }
    // else{
    //     // bar.classList.toggle('header-1');
    //     bar.style.position = 'static';
    //     console.log('static');
    // }
});


// let inChose = document.getElementById('chose-elm');
// let downBtn = document.querySelector('#srIcon');
// let choseDown = document.querySelector('.srch-down');
//     downBtn.addEventListener('click', () =>{
//     console.log(downBtn);
//     choseDown.classList.toggle('srch-change');
// });


let mainBtn = document.getElementById('main');
let linkDown = document.getElementById('link-down');
    mainBtn.addEventListener('click', ()=>{
    // alert('its working');
    linkDown.classList.toggle('link-down-show');
});

console.log(mainBtn);



    let list = document.querySelectorAll('#list li'),

    tab = [], index;

    for(let i = 0; i < list.length; i++){
     tab.push(list[i].innerHTML);
    }
    // console.log(tab.indexOf("Jobs"));

    for(let i = 0; i < list.length; i++){

    list[i].onclick = function(){
        
    index = tab.indexOf(this.innerHTML);

    console.log(this.innerHTML + ' index is '+ index);

     inChose.innerText = this.innerHTML;
    }
}




let dropBox = document.getElementById('drop-bar');
let downSign = document.getElementById('down-sign');
let hideBtn = document.getElementById('hide-btn');

downSign.addEventListener('click', ()=>{
    // alert('its working');
    dropBox.style.transform = 'translateY(0%)';
});

hideBtn.addEventListener('click', ()=>{
    dropBox.style.transform = 'translateY(-95%)';
})

// if(dropBox.style.transform = 'translateY(0%)'){
//     downSign.style.display = 'none';
// }
// else if(dropBox.style.transform = 'translateY(-95%)'){
//     downSign.style.display = 'flex';
// }


let downArrow = document.querySelector('.down-arrow');
let Box = document.querySelector('.media');
downArrow.addEventListener('click', ()=>{
    // alert('its working');
    Box.classList.toggle('media-1');
});



let userName = document.querySelector('.user-name');
let userCard = document.querySelectorAll('.dvlpr-card'),
cont = [], count;
for (let x = 0; x < userCard.length; x++){
    cont.push(userCard[x])
}


// function viewProfile(){
//     console.log($this)
// }


// // for(let i=0; i>=cont.length; i++){
// //     cont[i].onclick = function viewProfile(){
// //         count = cont[i].innerHTML;
// //         console.log(count);
// //     }
// // }


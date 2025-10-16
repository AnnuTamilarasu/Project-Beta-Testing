document.addEventListener('DOMContentLoaded', function() {
    console.log('App loaded successfully!');
});
let quoteN=Math.floor(Math.random()*5+1);
let quote;
if(quoteN===1){
quote="'The future belongs to those who prepare for it today.'";
}else if(quoteN===2){
quote="'Don’t watch the clock; do what it does. Keep going.'";
}else if(quoteN===3){
quote="'Success is not final, failure is not fatal: it is the courage to continue that counts.'";
}else if(quoteN===4){
quote="'Believe you can and you're halfway there.'";
}else if(quoteN===5){
quote="'The best way to predict the future is to create it.'";
}
document.querySelector("h1").textContent =quote;
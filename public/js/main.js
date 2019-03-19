const curtain = document.querySelector('.curtain')
console.log(curtain);

(function () {
  setTimeout(function(){
    curtain.classList.add('curtain-up')
  }, 1000);
})();

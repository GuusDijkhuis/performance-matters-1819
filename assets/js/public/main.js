const curtain = document.querySelector('.curtain')

(function () {
  setTimeout(function(){
    curtain.classList.add('curtain-up')
  }, 3000);
})();

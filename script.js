// DOM Var
var $bomb = document.querySelector('.bomb')
  , $time = document.querySelector('.time')
  , $game = document.querySelector('.game')
  , $cell = document.querySelectorAll('.cell');
// Game Var 
var rows = 15
  , cols = 39
  , grid = 20
  , bombCount = 99;
// Bombs positions 
bombs = {
    posX: []
    , posY: []
  , }
  /* Reset all the bombs */
function reset() {
  for (var i = 0; i < $cell.length; i++) {
    $cell[i].className = 'cell';
  }
  bombs.posX = [];
  bombs.posY = [];
}
/* Generate all the bombs */
function generate_bomb() {
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      var ratio = bombCount / (rows * cols);
      if (rdm(0, 1) < ratio) {
        $cell[(i * cols) + j].classList.add('cell-bomb');
        $cell[(i * cols) + j].classList.add('x' + j);
        $cell[(i * cols) + j].classList.add('y' + i);
        bombs.posX[(i * cols) + j] = j;
        bombs.posY[(i * cols) + j] = i;
      }
    }
  }
}
generate_bomb();
// Generate all EventListeners
for (var i = 0; i < $cell.length; i++) $cell[i].addEventListener('click', detect);

function detect(e) {
  var bombAround = 0;
  // Lose
  if (this.classList.contains('cell-bomb')) {
    reset();
    generate_bomb();
  }
  // Other possibilities
  else {
    _index = parseInt(this.getAttribute('data-index')) - 1;
    // There's nothing around
    if ($cell[_index + 1].classList.contains('cell-bomb')) {
      bombAround++;
    }
    if ($cell[_index - 1].classList.contains('cell-bomb')) {
      bombAround++;
    }
    if ($cell[(_index - cols)].classList.contains('cell-bomb')) {
      bombAround++;
    }
    if ($cell[(_index - cols) + 1].classList.contains('cell-bomb')) {
      bombAround++;
    }
    if ($cell[(_index - cols) - 1].classList.contains('cell-bomb')) {
      bombAround++;
    }
    if ($cell[(_index + cols)].classList.contains('cell-bomb')) {
      bombAround++;
    }
    if ($cell[(_index + cols) + 1].classList.contains('cell-bomb')) {
      bombAround++;
    }
    if ($cell[(_index + cols) - 1].classList.contains('cell-bomb')) {
      bombAround++;
    } {
      $bomb.innerHTML = bombAround;
      this.innerHTML = bombAround;
    }
  }
}
/* Reveal cell */
for (var i = 0; i < $cell.length; i++) $cell[i].addEventListener('click', reveal);

function reveal(e) {
  if (!this.classList.contains('cell-bomb')) {
    this.style.background="green";
    _index = parseInt(this.getAttribute('data-index')) - 1;
    if (!$cell[_index + 1].classList.contains('cell-bomb')) {
      $cell[_index + 1].style.background="green";
    }
    if (!$cell[_index - 1].classList.contains('cell-bomb')) {
      $cell[_index - 1].style.background="green";
    }
    if (!$cell[(_index - cols)].classList.contains('cell-bomb')) {
      $cell[_index - cols].style.background="green";
    }
    if (!$cell[(_index - cols) + 1].classList.contains('cell-bomb')) {
      $cell[(_index - cols) + 1].style.background="green";
    }
    if (!$cell[(_index - cols) - 1].classList.contains('cell-bomb')) {
      $cell[(_index - cols) - 1].style.background="green";
    }
    if (!$cell[(_index + cols)].classList.contains('cell-bomb')) {
      $cell[(_index + cols)].style.background="green";
    }
    if (!$cell[(_index + cols) + 1].classList.contains('cell-bomb')) {
      $cell[(_index + cols) + 1].style.background="green";
    }
    if (!$cell[(_index + cols) - 1].classList.contains('cell-bomb')) {
      $cell[(_index + cols) - 1].style.background="green";
    }
  }}
  /* Function Random Generator */
  function rdm(min, max) {
    return Math.random() * (max - min) + min;
  }
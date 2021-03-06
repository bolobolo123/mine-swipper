/* Variables */
// DOM Var
var $bomb = document.querySelector('.bomb'), 
	$time = document.querySelector('.time'),
	$game = document.querySelector('.game'),
	$cell = document.querySelectorAll('.cell');
// Game Var 
var rows = 15,
	cols = 39,
	grid = 20,
	bombCount = 99;
// Bombs positions 
bombs = {
    posX: [],
    posY: [],
    };
// BombAround Values
bombArounds = [];    

/* Algorithm */

/* 

GENERATIONS & RESET 

*/
/* Function that Reset all the bombs */
function reset() 
{
  for (var i = 0; i < $cell.length; i++) 
  {
  	$cell[i].className = 'cell';
  	$cell[i].innerHTML = '';
  }
  bombs.posX = [];
  bombs.posY = [];
}

/* Function that Generate all the bombs */
function generate_bomb() 
{
  for (var i = 0; i < rows; i++) 
  {
    for (var j = 0; j < cols; j++) 
    {
      var ratio = bombCount / (rows * cols);
      if (rdm(0, 1) < ratio) 
      {
        $cell[(i * cols) + j].classList.add('cell-bomb');
        $cell[(i * cols) + j].classList.add('x' + j);
        $cell[(i * cols) + j].classList.add('y' + i);
        bombs.posX[(i * cols) + j] = j;
        bombs.posY[(i * cols) + j] = i;
      }
    }
  }
}
// Function that save all bomb around each cells
function pre_detect()
{
  for (var i = 0; i < $cell.length; i++)
  {
  	var bombAround = 0;
    // There's nothing around
    if (i + 1 <= $cell.length-1) 		if ($cell[i + 1].classList.contains('cell-bomb')) bombAround++;
    if (i - 1 >= 0 ) 			 		if ($cell[i - 1].classList.contains('cell-bomb')) bombAround++;
	if (i - cols>= 0 ) 			 		if ($cell[(i - cols)].classList.contains('cell-bomb')) bombAround++;
   	if (i - cols + 1 >= 0) 		 		if ($cell[(i - cols) + 1].classList.contains('cell-bomb')) bombAround++;
    if (i - cols - 1 >= 0) 				if ($cell[(i - cols) - 1].classList.contains('cell-bomb')) bombAround++;
    if (i + cols <= $cell.length-1)		if ($cell[(i + cols)].classList.contains('cell-bomb')) bombAround++;
    if (i + cols + 1 <= $cell.length-1) if ($cell[(i + cols) + 1].classList.contains('cell-bomb')) bombAround++;
    if (i + cols - 1 <= $cell.length-1) if ($cell[(i + cols) - 1].classList.contains('cell-bomb')) bombAround++;
    bombArounds[i] = bombAround;
  }
}

/* 

EVENTLISTENERS 

*/

// Detect Bombs
for (var i = 0; i < $cell.length; i++) $cell[i].addEventListener('click', detect);
// Put a flag on r-click
for (var i = 0; i < $cell.length; i++) $cell[i].addEventListener('contextmenu', rclick);


/* 

FUNCTIONS 

*/

// Function that detect bomb
function detect(e) 
{
  var bombAround = 0;
  // Lose
  if (this.classList.contains('cell-bomb')) 
  {
  	alert('perdu !');
    reset();
    generate_bomb();
    pre_detect();
  }
  // Other possibilities
  else 
  {
    _index = parseInt(this.getAttribute('data-index')) - 1;
    // There's nothing around
    if (_index + 1 <= $cell.length - 1) 	  if ($cell[_index + 1].classList.contains('cell-bomb')) bombAround++;
    if (_index - 1 >= 0)					  if ($cell[_index - 1].classList.contains('cell-bomb')) bombAround++;
    if (_index - cols >= 0)					  if ($cell[(_index - cols)].classList.contains('cell-bomb')) bombAround++;
    if (_index - cols + 1 >= 0)				  if ($cell[(_index - cols) + 1].classList.contains('cell-bomb')) bombAround++;
    if (_index - cols - 1 >= 0)				  if ($cell[(_index - cols) - 1].classList.contains('cell-bomb')) bombAround++;
    if (_index + cols  <= $cell.length - 1)	  if ($cell[(_index + cols)].classList.contains('cell-bomb')) bombAround++;
    if (_index + cols + 1 <= $cell.length - 1)if ($cell[(_index + cols) + 1].classList.contains('cell-bomb')) bombAround++;
    if (_index + cols - 1 <= $cell.length - 1)if ($cell[(_index + cols) - 1].classList.contains('cell-bomb')) bombAround++;
	// if there st around we write the value
	if (bombAround > 0) {
      $bomb.innerHTML = bombAround;
      this.innerHTML = bombAround;
      this.classList.add('secure');
     }
     // if there nt around we only reveal
     if (bombAround == 0) reveal(_index);
    }
  }

// Function for r-click
function rclick(e)
{
  if(this.classList.contains('flag'))
    {
      this.classList.remove('flag');
      
    }
  else 
  {
    this.classList.add('flag');
  }
}

/* Function Reveal cell if there no bomb around */
function reveal(_index) 
{
  if (!$cell[_index].classList.contains('cell-bomb')) 
  {
    $cell[_index].classList.add('secure');
    _index = parseInt($cell[_index].getAttribute('data-index')) - 1;
    if (!$cell[_index + 1].classList.contains('cell-bomb')) {
      $cell[_index + 1].classList.add('secure');
      if (bombArounds[_index + 1] > 0) $cell[_index + 1].innerHTML = bombArounds[_index + 1];
    }
    if (!$cell[_index - 1].classList.contains('cell-bomb')) {
      $cell[_index - 1].classList.add('secure');
      if (bombArounds[_index - 1] > 0) $cell[_index - 1].innerHTML = bombArounds[_index - 1];
    }
    if (!$cell[(_index - cols)].classList.contains('cell-bomb')) {
      $cell[_index - cols].classList.add('secure');
      if (bombArounds[_index - cols] > 0) $cell[_index - cols].innerHTML = bombArounds[_index - cols];

    }
    if (!$cell[(_index - cols) + 1].classList.contains('cell-bomb')) {
      $cell[(_index - cols) + 1].classList.add('secure');
      if (bombArounds[(_index - cols) + 1] > 0) $cell[(_index - cols) + 1].innerHTML = bombArounds[_index - cols + 1];

    }
    if (!$cell[(_index - cols) - 1].classList.contains('cell-bomb')) {
      $cell[(_index - cols) - 1].classList.add('secure');
      if (bombArounds[(_index - cols) - 1] > 0) $cell[(_index - cols) - 1].innerHTML = bombArounds[_index - cols + 1];
    }
    if (!$cell[(_index + cols)].classList.contains('cell-bomb')) {
      $cell[(_index + cols)].classList.add('secure');
      if (bombArounds[(_index + cols)] > 0) $cell[(_index + cols)].innerHTML = bombArounds[_index + cols];

    }
    if (!$cell[(_index + cols) + 1].classList.contains('cell-bomb')) {
      $cell[(_index + cols) + 1].classList.add('secure');
      if (bombArounds[(_index + cols) + 1] > 0) $cell[(_index + cols) + 1].innerHTML = bombArounds[_index + cols + 1];
    }
    if (!$cell[(_index + cols) - 1].classList.contains('cell-bomb')) {
      $cell[(_index + cols) - 1].classList.add('secure');
      if (bombArounds[(_index + cols) - 1] > 0) $cell[(_index + cols) - 1].innerHTML = bombArounds[_index + cols - 1];
    }
  }
}

/* Function Random Generator */
function rdm(min, max) {
  return Math.random() * (max - min) + min;
}

// Init
generate_bomb();
pre_detect();

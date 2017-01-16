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
}

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
	for (var i =0; i < rows; i++) {
		for (var j = 0; j < cols; j++) {
			var ratio = bombCount/(rows*cols);
			if ( rdm(0,1) < ratio ) {
				$cell[(i*cols)+j].classList.add('cell-bomb');
				$cell[(i*cols)+j].classList.add('x'+j);
				$cell[(i*cols)+j].classList.add('y'+i);
				bombs.posX[(i*cols)+j] = j;
				bombs.posY[(i*cols)+j] = i;
			}

		}
	}
}
generate_bomb();

// Generate all EventListeners
for (var i = 0; i < $cell.length; i++) {
	$cell[i].addEventListener('click', detect );
}

function detect(e) {
	if ( this.classList.contains('cell-bomb') ) {
		console.log('Perdu');
		console.log(this.getAttribute('class') );
		var posTemp = this.getAttribute('class');
		posTemp = (posTemp.indexOf('x'))+1;
		console.log(posTemp);
	} 
	else {
		
		// if (




		// 	)



	}

}



/* Function Random Generator */
function rdm(min, max) {
	return Math.random()*(max-min)+min;
}
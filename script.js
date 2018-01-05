var SQUARE_SIZE = 10;
var BRUSH_SIZE = 20;

var ctx;

var grid, dirty;
var width, height;

function main(){
	var canvas = document.getElementById('background');
	ctx = canvas.getContext('2d');

	ctx.canvas.width  = window.innerWidth;
	ctx.canvas.height = window.innerHeight;

	width = Math.round(canvas.width / SQUARE_SIZE);
	height = Math.round(canvas.height / SQUARE_SIZE);

	grid = clear();
	dirty = clear();

	grid[10][10] = true;
	grid[11][10] = true;
	grid[11][8] = true;
	grid[13][9] = true;
	grid[14][10] = true;
	grid[15][10] = true;
	grid[16][10] = true;

	requestAnimationFrame(step);
}

function clear(){
	var array = Array(width);
	for(var i = 0; i < width; i ++){
		array[i] = Array(height).fill(false);
	}
	return array;
}

function step(){
	update();
	render();
	requestAnimationFrame(step);
}

function update(){
	var next = clear();
	for(var x = 0; x < width; x ++){
		for(var y = 0; y < height; y ++){
			var count = 0;
			for(var xx = x-1; xx <= x+1; xx ++){
				for(var yy = y-1; yy <= y+1; yy ++){
					var rx = xx;
					var ry = yy;
					if(rx == -1)
						rx = width-1
					if(rx == width)
						rx = 0;
					if(ry == -1)
						ry = height-1
					if(ry == height)
						ry = 0;
					if(grid[rx][ry] == true){
						count ++;
					}
				}
			}

			if(grid[x][y]){
				if(count < 3 || count > 4){
					next[x][y] = false;
				}else{
					next[x][y] = true;
				}
			}else{
				if(count == 3){
					next[x][y] = true;
				}else{
					next[x][y] = false;
				}
			}

			if(next[x][y] != grid[x][y]){
				dirty[x][y] = true;
			}
		}
	}
	grid = next;
}

function render(){
	for(var x = 0; x < width; x ++){
		for(var y = 0; y < height; y ++){
			if(dirty[x][y]){
				dirty[x][y] = false;
				if(grid[x][y]){
					ctx.fillStyle = "rgb(255,0,0)";
				}else{
					ctx.fillStyle = "rgb(0,255,0)";
				}
				ctx.fillRect(x*SQUARE_SIZE, y*SQUARE_SIZE,SQUARE_SIZE/2, SQUARE_SIZE/2);
			}
		}
	}
}

function onClick(event){
	var x = Math.round(event.clientX / SQUARE_SIZE);
	var y = Math.round(event.clientY / SQUARE_SIZE);
	// next[x][y] = true;
	for(var xx = x-BRUSH_SIZE; xx < x + BRUSH_SIZE; xx ++){
		for(var yy = y-BRUSH_SIZE; yy < y + BRUSH_SIZE; yy ++){
			if(xx >= 0 && xx < width && yy >= 0 && yy < height){
				grid[xx][yy] = true;
				dirty[xx][yy] = true;
			}
		}
	}
}
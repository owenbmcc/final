/* 
	final project	
	mmp 310 
	fall 2019
*/

var scene = 'owen';

function setup() {
	createCanvas(windowWidth, windowHeight);
	
	var sceneSelector = createSelect();
	sceneSelector.option('owen');
    sceneSelector.option('marsii');
    
	sceneSelector.changed(selectScene);
}

function selectScene() {
	scene = sceneSelector.value;
}



function draw() {
	if (scene == 'owen') {
		owen();
	}
}
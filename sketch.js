/* 
	final project	
	mmp 310 
	fall 2019
*/

var scene = 'owen';

var sceneManager = {};
sceneManager['owen'] = new owen();
sceneManager['nick'] = new nick();
sceneManager['marsii'] = new Scene();
sceneManager['nelson'] = new Scene();
sceneManager['ekaterina'] = new Scene();
sceneManager['jonathan'] = new Scene();
sceneManager['maryam'] = new Scene();

function preload() {
	for (var scene in sceneManager) {
		sceneManager[scene].preload();	
	}
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	
	var sceneSelector = createSelect();
	var scenes = Object.keys(sceneManager);
	for (var i = 0; i < scenes.length; i++) {
		sceneSelector.option(scenes[i]);
	}
	sceneSelector.changed(selectScene);
}

function selectScene() {
	scene = this.value();
}

function draw() {
	sceneManager[scene].draw();
}
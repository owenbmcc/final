/* 
	final project	
	mmp 310 
	fall 2019
*/

var scene = 'rpg';

var sceneObjects = {};
sceneObjects['owen'] = new owen();
sceneObjects['rpg'] = new rpg();

function preload() {
	for (var scene in sceneObjects) {
		sceneObjects[scene].preload();
	}
}

function setup() {
	createCanvas(windowWidth, windowHeight);

	for (var scene in sceneObjects) {
		sceneObjects[scene].setup();
	}

	var sceneSelector = createSelect();
	var scenes = Object.keys(sceneObjects);
	for (let i = 0; i < scenes.length; i++) {
		sceneSelector.option(scenes[i]);
	}
	sceneSelector.changed(selectScene);
}

function selectScene() {
	scene = this.value();
}

function draw() {
	sceneObjects[scene].draw();
}
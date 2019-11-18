/* 
	final project	
	mmp 310 
	fall 2019
*/

var scene = 'rpg';

var sceneManager = {};
sceneManager['owen'] = new owen();
sceneManager['rpg'] = new rpg();

function preload() {
	for (var scene in sceneManager) {
		sceneManager[scene].preload();
	}
}

function setup() {
	createCanvas(windowWidth, windowHeight);

	for (var scene in sceneManager) {
		sceneManager[scene].setup();
	}

	var sceneSelector = createSelect();
	var scenes = Object.keys(sceneManager);
	for (let i = 0; i < scenes.length; i++) {
		sceneSelector.option(scenes[i]);
	}
	sceneSelector.changed(selectScene);
}

function selectScene() {
	sceneManager[scene].start();
	scene = this.value();
	sceneManager[scene].end();
}

function draw() {
	sceneManager[scene].draw();
}
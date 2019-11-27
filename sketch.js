/* 
	final project	
	mmp 310 
	fall 2019
*/

var scene = 'paralax';

var sceneManager = {};
sceneManager['owen'] = new owen();
sceneManager['rpg'] = new rpg();
sceneManager['rpg2'] = new rpg2();
sceneManager['paralax'] = new paralax();

var paralaxScroll = 0;


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
	scene = this.value();
}

function draw() {
	sceneManager[scene].draw(paralaxScroll);
}

function mouseWheel(event) {
	paralaxScroll = event.delta;
}
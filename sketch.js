/* 
	final project	
	mmp 310 
	fall 2019
*/




var scene = 'ekaterinaStart';

var sceneManager = {};
sceneManager['owen'] = new owen();
sceneManager['paralax'] = new ParalaxScene();
sceneManager['nick'] = new nick();
sceneManager['marsii'] = new marsii();
sceneManager['nelson'] = new nelson();
sceneManager['ekaterinaStart'] = new ekaterinaStart();
sceneManager['ekaterinaInstructions'] = new ekaterinaInstructions();
sceneManager['ekaterina'] = new ekaterina();
sceneManager['mousewins'] = new mousewins();
sceneManager['lionwins'] = new lionwins();
sceneManager['jonathan'] = new Scene();
sceneManager['adonis'] = new adonis();
sceneManager['maryam'] = new maryam();



function preload() {
	for (var s in sceneManager) {
		sceneManager[s].preload();
	}
}

function setup() {
	var canvas = createCanvas(windowWidth, windowHeight);
	canvas.drawingContext.miterLimit = 2;

	for (var s in sceneManager) {
		sceneManager[s].setup();
	}

	var sceneSelector = createSelect();
	var scenes = Object.keys(sceneManager);
	for (var i = 0; i < scenes.length; i++) {
		sceneSelector.option(scenes[i]);
	}
	sceneSelector.changed(selectScene);

	sceneManager[scene].start();
}

function changeScene(_scene) {
	sceneManager[scene].end();
	scene = _scene;
	sceneManager[scene].start();
}

function selectScene() {
	changeScene(this.value());
	this.elt.blur();
}

function draw() {
	sceneManager[scene].draw(paralaxScroll);
}

var paralaxScroll = 0;

function mouseWheel(event) {
	paralaxScroll = event.delta;
}
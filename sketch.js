/* 
	final project	
	mmp 310 
	fall 2019
*/

var scene = 'nick';

var sceneManager = {};
sceneManager['owen'] = new owen();
sceneManager['paralax'] = new ParalaxScene();
sceneManager['nick'] = new nick();
sceneManager['marsii'] = new Scene();
sceneManager['marsii'] = new marsii();
sceneManager['nelson'] = new Scene();
sceneManager['ekaterina'] = new ekaterina();
sceneManager['jonathan'] = new Scene();
sceneManager['maryam'] = new Scene();
sceneManager['adonis'] = new adonis();
sceneManager['maryam'] = new maryam();


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
	for (var i = 0; i < scenes.length; i++) {
		sceneSelector.option(scenes[i]);
	}
	sceneSelector.changed(selectScene);
	
	
	// scene = 'owen';
	// sceneManager[scene].start();
	
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






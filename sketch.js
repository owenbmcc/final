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

function selectScene() {
	sceneManager[scene].end();
	scene = this.value();
	sceneManager[scene].start();
	this.elt.blur();
}

function draw() {
	sceneManager[scene].draw();
}






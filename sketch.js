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

	sceneSelector.option('nick');
    sceneSelector.option('marsii');
    sceneSelector.option('nelson');
    sceneSelector.option('ekaterina');
    sceneSelector.option('jonathan');
    sceneSelector.option('maryam');


	sceneSelector.changed(selectScene);
}

function selectScene() {
	scene = this.value();
}



function draw() {
	if (scene == 'owen') {
		owen();
	}

    
    if (scene == 'nick') {
		nick();
	}

    if (scene == 'marsii'){
        marsii();
    }

    
    if (scene == 'nelson'){
        nelson();
    }

    if (scene == 'ekaterina') {
		ekaterina();
	}

    if (scene == 'jonathan'){
        jonathan();
    }
    
    if (scene =='maryam'){
        maryam();    
    }

}
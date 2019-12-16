//2nd scene
class ekaterinaInstructions extends Scene {

    preload() {
        
        this.instructions = new EkaterinaMap();
        this.instructions.preload('data/ekaterina/instructions.json');

        var startGame = loadImage('images/ekaterina/start.gif');
        this.startGame = new NPCimage(0, 685, startGame);
        
        this.press = loadSound('sounds/ekaterina/press.mp3');
        this.press.setVolume(1.0);
    }

    setup() {

        createCanvas(1435, 735);
        
        this.instructions.setup();
        this.startGame.setup();
    }

     start() {

         this.instructions.start();
      }

    draw() {
    
        this.instructions.display();
        this.startGame.display();
 
        if (keyIsDown(SHIFT)) {
                changeScene('ekaterina');
                this.press.play();
    	}
    }
    
    end() {
        
		this.instructions.end();
	}

}

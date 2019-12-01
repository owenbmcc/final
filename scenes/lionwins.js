class LionwinsScene extends Scene {
    	preload() {
		this.map = new ParalaxMap();
		this.map.preload('data/lionwins.json');
        
        var spriteSheet = loadSpriteSheet('images/ekaterina/lion.png', 900, 900, 83);
		this.sceneLink = new NPC(0, 60, spriteSheet);
            
        var spriteSheet = loadSpriteSheet('images/ekaterina/restart.png', 900, 67, 8);
		this.restartLink = new NPC(0, -300, spriteSheet);
	}

	setup() {
		this.map.setup();
        this.sceneLink.setup();
        this.restartLink.setup();
	}
	
	start() {
		this.map.start();	
	}
	
	draw() {
        background('white');
        
        textAlign(CENTER);
		textSize(150);
        textFont("Krungthep");
        fill('black');
        stroke('red');
        strokeWeight(15);
		text('LION WINS', 0, -120);
        
        if (keyIsDown(ENTER)) {
            changeScene('ekaterina');
			}
        
        this.restartLink.display();
        this.sceneLink.display();
        this.map.display();
	}
}
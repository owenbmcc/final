class MousewinsScene extends Scene {
	
    preload() {
                
		this.map = new ParalaxMap();
		this.map.preload('data/mousewins.json');	
        
        var spriteSheet = loadSpriteSheet('images/ekaterina/mouse.png', 900, 900, 46);
		this.sceneLink = new NPC(0, 100, spriteSheet);
        
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
		text('MOUSE WINS', 0, -120);
        
        if (keyIsDown(ENTER)) {
            changeScene('ekaterina');
			}
        
        this.restartLink.display();
        this.sceneLink.display();
        this.map.display();
	}
}
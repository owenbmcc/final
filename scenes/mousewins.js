class MousewinsScene extends Scene {
	
    preload() {
                
		this.map = new ParalaxMap();
		this.map.preload('data/mousewins.json');	
        
        var spriteSheet = loadSpriteSheet('images/ekaterina/mouse.png', 900, 900, 46);
		this.sceneLink = new NPC(0, 100, spriteSheet);
	}
	
	setup() {
        
		this.map.setup();
        this.sceneLink.setup();
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
        this.sceneLink.display();
        this.map.display();
	}
}
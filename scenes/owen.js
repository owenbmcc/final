class owen extends Scene {

	preload() {
		
//		this.character.img = loadImage('images/character.png');
		// sprite sheet - src, width, height, number of sprites
		this.walk = loadSpriteSheet('images/owen/walk.png', 68, 104, 5);
	}
	
	setup() {
		const animations = {
			walk: loadAnimation(this.walk)
		};
		this.character = new Character(animations);
	}
	
	draw() {
		background(51);
		textSize(100);
		textAlign(CENTER, CENTER);
		text("Owen's Scene", width/2, height/2);
		text("BLAH BLAH BLAH", width/2, height/2 + 100);
		
		
		this.character.update();
		this.character.move();
		this.character.display();
	}
}
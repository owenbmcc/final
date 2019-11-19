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
		background(220);
		textAlign(CENTER);
		textSize(20);
		text('move the character with arrows', width/2, 100);

		this.character.update();
		this.character.display();
		
		/* user input - move character around */
		if (keyIsDown(RIGHT_ARROW)) {
			this.character.speedX = 5;
		} else if (keyIsDown(LEFT_ARROW)) {
			this.character.speedX = -5;
		} else {
			this.character.speedX = 0;
		}
		
		if (keyIsDown(DOWN_ARROW)) {
			this.character.speedY = 5;
		} else if (keyIsDown(UP_ARROW)) {
			this.character.speedY = -5;	
		} else {
			this.character.speedY = 0;	
		}
	}
}
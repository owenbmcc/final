class rpg2 extends Scene {
	constructor() {
		super();
		this.map = new Map('scenes/rpg.json');

	}

	preload() {
		this.characterDefault = loadSpriteSheet('images/test.png', 160, 160, 2);
		this.map.preload();
	}

	setup() {
		const anims = {
			default: loadAnimation(this.characterDefault)
		};
		this.character = new Character(anims);
		this.map.setup();
	}

	draw() {
		background('lightgreen');

		
		// this.map.update(this.character);
		this.map.move(this.character);
		this.map.update();
		this.map.draw();
		this.map.collide(this.character);
		
		this.character.update();
		this.character.display();

		/* user input */
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





class rpg extends Scene {
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
		this.character.img = this.characterImage;
		this.map.setup();
	}

	draw() {
		background('lightblue');

		
		this.map.update();
		this.map.draw();
		this.map.collide(this.character);
		
		this.character.display();

		/* user input */
		if (keyIsDown(RIGHT_ARROW)) {
			this.map.speedX = -5;
		} else if (keyIsDown(LEFT_ARROW)) {
			this.map.speedX = 5;
		} else {
			this.map.speedX = 0;
		}
		
		if (keyIsDown(DOWN_ARROW)) {
			this.map.speedY = -5;
		} else if (keyIsDown(UP_ARROW)) {
			this.map.speedY = 5;	
		} else {
			this.map.speedY = 0;	
		}
		
	}
}
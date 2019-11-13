class rpg extends Scene {
	constructor() {
		super();
		this.map = new Map('scenes/rpg.json');
	}

	preload() {
		this.characterImage = loadImage('images/char.png');
		this.map.preload();
	}

	setup() {
		this.character = new Character();
		this.character.img = this.characterImage;
		this.map.setup();
	}

	draw() {
		background('lightblue');
		this.character.update();
		this.character.move();
		this.character.display();
	}
}
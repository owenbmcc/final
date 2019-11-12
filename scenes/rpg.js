class rpg {
	constructor() {
		this.character = new Character();
	}

	preload() {
		this.character.preload();
	}

	draw() {
		background('blue');
		this.character.update();
		this.character.move();
		this.character.display();
	}
}
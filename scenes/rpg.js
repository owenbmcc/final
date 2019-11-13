class rpg extends Scene {
	preload() {
		this.characterImage = loadImage('images/char.png');
	}

	setup() {
		this.character = new Character();
		this.character.img = this.characterImage;
	}

	draw() {
		background('lightblue');
		this.character.update();
		this.character.move();
		this.character.display();
	}
}
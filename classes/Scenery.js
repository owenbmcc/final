class Scenery extends Thing {
	constructor(x, y, anim) {
		super();
		this.sprite = createSprite(x, y);
		this.anim = loadAnimation(anim);
	}

	setup() {
		this.sprite.addAnimation('default', this.anim);
	}

	display() {
		this.sprite.display();
	}

	collide(other) {
		this.sprite.collide(other.sprite);
	}
}
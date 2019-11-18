class Scenery extends Thing {
	constructor(x, y, anim) {
		super(x, y, 100);
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
class Scenery extends Thing {
	constructor(x, y, anim) {
		super(0, 0);
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
	
	overlap(other) {
		return this.sprite.overlap(other.sprite);
	}
}
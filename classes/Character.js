class Character extends Thing {
	constructor(anims) {
		super();
		this.sprite = createSprite(width/2, height/2);
		for (var a in anims) {
			this.sprite.addAnimation(a, anims[a]);
		}
	}

	display() {
		this.sprite.display();
	}

	get x() {
		return this.sprite.position.x;
	}

	get y() {
		return this.sprite.position.y;
	}
	
}
class Character extends Thing {
	constructor(anims) {
		super(width/2, height/2, 50, 8, 8);
		this.sprite = createSprite(width/2, height/2);
		for (var a in anims) {
			this.sprite.addAnimation(a, anims[a]);
		}
	}

	display() {
		this.sprite.display();
	}
	
}
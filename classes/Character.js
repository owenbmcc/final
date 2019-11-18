class Character extends Thing {
	constructor(animations) {
		super(width/2, height/2, 100, 0, 0);
		this.sprite = createSprite(width/2, height/2);
		for (var a in animations) {
			this.sprite.addAnimation(a, animations[a]);
		}
	}
	
	display() {
		this.sprite.display();
	}
	
	move() {
		if (keyIsDown(RIGHT_ARROW)) {
			this.speedX = 5;
		} else if (keyIsDown(LEFT_ARROW)) {
			this.speedX = -5;
		} else {
			this.speedX = 0;
		}
		
		if (keyIsDown(DOWN_ARROW)) {
			this.speedY = 5;
		} else if (keyIsDown(UP_ARROW)) {
			this.speedY = -5;	
		} else {
			this.speedY = 0;	
		}
	}
}
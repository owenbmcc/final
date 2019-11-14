class Character extends Thing {

	constructor() {
		super(width/2, height/2, 50, 8, 8);
	}

	display() {
		imageMode(CENTER);
		image(this.img, this.x, this.y);
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
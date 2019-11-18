class Thing {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.speedX = 0;
		this.speedY = 0;
	}
		
	update() {
		this.sprite.position.x += this.speedX;
		this.sprite.position.y += this.speedY;
	}
}
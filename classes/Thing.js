class Thing {
	constructor(x, y, speedX, speedY) {
		this.speedX = speedX;
		this.speedY = speedY;
		this.debug = false;
	}
		
	update() {
		this.sprite.position.x += this.speedX;
		this.sprite.position.y += this.speedY;
	}

	get x() {
		return this.sprite.position.x;
	}

	get y() {
		return this.sprite.position.y;
	}

	set x(_x) {
		this.sprite.position.x = _x;
	}

	set y(_y) {
		this.sprite.position.y = _y;
	}
}
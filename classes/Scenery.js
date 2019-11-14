class Scenery extends Thing {
	constructor(x, y, img) {
		super(x, y, 100);
		this.img = img;
		console.log(img);
		this.debug = true;
	}

	setup() {
		this.size = this.img.width;
	}

	display(x, y) {
		super.display(this.x + x, this.y + y);
		image(this.img, this.x + x, this.y + y);
	}
}
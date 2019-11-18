class NPC extends Scenery {
	constructor(x, y, img, dialog) {
		super(x, y, img);
		this.dialog = dialog;
		this.displayDialog = false;
	}

	display() {
		super.display();
		if (this.displayDialog) {
			fill(0);
			noStroke();
			textSize(20);
			text(this.dialog, this.sprite.position.x, this.sprite.position.y);
		}
	}
}
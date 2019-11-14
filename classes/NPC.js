class NPC extends Scenery {
	constructor(x, y, img, dialog) {
		super(x, y, img);
		this.dialog = dialog;
		this.displayDialog = false;
	}

	display(x, y) {
		super.display(x, y);
		console.log(this.displayDialog);
		if (this.displayDialog) {
			fill(0);
			noStroke();
			textSize(20);
			text(this.dialog, this.x + x, this.y + y);
		}
	}
}
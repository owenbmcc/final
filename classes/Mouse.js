class Mouse extends Thing {
	constructor(animations) {
		super(width/2, height/2, 100, 0, 0);
		this.sprite = createSprite(1000, 470);
		for (var a in animations) {
        this.sprite.addAnimation(a, animations[a]);
		}
        
	}
	
	display() {
		this.sprite.display();
	}
	
	changeAnimation(animation) {
		this.sprite.changeAnimation(animation);
	}
}
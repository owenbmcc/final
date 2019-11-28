class ParalaxScene extends Scene {
	preload() {
		this.map = new ParalaxMap();
		this.map.preload('data/paralax.json');
		
		var spriteSheet = loadSpriteSheet('images/paralax/another_cat.png', 100, 88, 1);
		this.cat = new ParalaxScenery(300, 600, spriteSheet, 0.15);
		this.map.addSprite('cat', this.cat, 'scenery');
		
	}
	
	setup() {
		this.map.setup();
		this.cat.setup();

		
		this.cat.sprite.onMousePressed = function() {
			changeScene('owen');	
		};
	}
	
	start() {
		this.map.start();	
	}
	
	draw(paralaxScroll) {
		background('pink');
		this.map.display();
		this.map.paralax(paralaxScroll);
		
		this.cat.display();

	}
}
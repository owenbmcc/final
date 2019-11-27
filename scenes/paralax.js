class ParalaxScene extends Scene {
	preload() {
		this.map = new ParalaxMap();
		this.map.preload('data/paralax.json');
		
		var spriteSheet = loadSpriteSheet('images/paralax/another_cat.png', 100, 88, 1);
		this.cat = new Scenery(300, 600, spriteSheet);
		
		
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
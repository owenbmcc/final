class LionwinsScene extends Scene {
	
   /* preload() {
		this.map = new ParalaxMap();
		this.map.preload('data/mousewins.json');
		
	}
	
	setup() {
		this.map.setup();
	}
	
	start() {
		this.map.start();	
	} */
	
	draw() {
		background('grey');
        
		textSize(200);
        textFont("Krungthep");
        fill('black');
        stroke('red');
        strokeWeight(15);
		text('LION', 150, 200);
        
        textSize(200);
        textFont("Krungthep");
        fill('black');
        stroke('red');
        strokeWeight(15);
		text('WINS', 150, 400);
	}
}
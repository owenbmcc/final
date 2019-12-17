//lionwins scene
class lionwins extends Scene {

    preload() {
        
        this.nextSound = loadSound('sounds/ekaterina/next.mp3');
        this.nextSound.setVolume(1.0);

        this.lionwins = new EkaterinaMap();
        this.lionwins.preload('data/ekaterina/lionwins.json');
        
        var next = loadImage('images/ekaterina/next.gif');
        this.next = new NPCimage(0, 680, next);
        
        var confetti = loadImage('images/ekaterina/confetti.gif');
        this.confetti = new NPCimage(0, 305, confetti);
        
        var mouse = loadSpriteSheet('images/ekaterina/lion.png', 520, 467, 22);
        this.mouse = new NPC(-140, 400, mouse);
    }

    setup() {

//        createCanvas(1435, 735);
        
        this.lionwins.setup();
        this.confetti.setup();
        this.mouse.setup();
        this.next.setup();
    }

     start() {
         
         this.lionwins.start();
      }

    draw() {
    
        this.lionwins.display();
        this.mouse.display();
        this.confetti.display();
        this.next.display();

        if (keyIsDown(32)) {
                changeScene('owen');
                this.nextSound.play();
    	}
    }
    
    end() {
        
		this.lionwins.end();
	}

}

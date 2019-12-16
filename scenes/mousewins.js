//mousewins scene
class mousewins extends Scene {

    preload() {
        
        this.nextSound = loadSound('sounds/ekaterina/next.mp3');
        this.nextSound.setVolume(1.0);
        
        this.mousewins = new EkaterinaMap();
        this.mousewins.preload('data/ekaterina/mousewins.json');
        
        var next = loadImage('images/ekaterina/next.gif');
        this.next = new NPCimage(0, 680, next);
        
        var confetti = loadImage('images/ekaterina/confetti.gif');
        this.confetti = new NPCimage(0, 305, confetti);
        
        var mouse = loadSpriteSheet('images/ekaterina/mouse.png', 700, 324, 11);
        this.mouse = new NPC(-200, 400, mouse);
    }

    setup() {

        createCanvas(1435, 735);
        
        this.mousewins.setup();
        this.confetti.setup();
        this.mouse.setup();
        this.next.setup();
    }

     start() {

         this.mousewins.start();
      }

    draw() {

        this.mousewins.display();
        this.mouse.display();
        this.confetti.display();
        this.next.display();

        if (keyIsDown(32)) {
                changeScene('owen');
                this.nextSound.play();
    	}
    }
    
    end() {

        this.mousewins.end();
	}

}

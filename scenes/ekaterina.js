class ekaterina extends Scene {


	preload() {
        
		// sprite sheet - src, width, height, number of sprites
        this.mousemovesright = loadSpriteSheet('images/ekaterina/mousemovesright.png', 150, 93, 4);
        this.mousemovesleft = loadSpriteSheet('images/ekaterina/mousemovesleft.png', 150, 93, 4);
        this.mouseidle = loadSpriteSheet('images/ekaterina/mouseidle.png', 100, 106, 15);
       
        
        
        this.lionmovesright = loadSpriteSheet('images/ekaterina/lionmovesright.png', 400, 212, 11);
        this.lionmovesleft = loadSpriteSheet('images/ekaterina/lionmovesleft.png', 400, 212, 11);
		this.lionidle = loadSpriteSheet('images/ekaterina/lionidle.png', 200, 216, 15),
        
        //this.remixSound = loadSound('sounds/ekaterina/remix.mp3');
        
        this.MouseSounds = [];
		this.MouseSounds[0] = loadSound('sounds/ekaterina/mousemoves.mp3');
		this.MouseSounds[0].playMode('sustain');
        
        this.LionSounds = [];
        this.LionSounds[0] = loadSound('sounds/ekaterina/lionmoves.mp3');
        this.LionSounds[0].playMode('sustain');
        
        this.WinSound = [];
        this.WinSound[0] = loadSound('sounds/ekaterina/winsound.mp3');
        this.WinSound[0].playMode('sustain');
        
        this.obstacles = new Map();
        this.obstacles.preload('data/obstacles.json');
        
        this.map = new Map();
        this.map.preload('data/ekaterina.json');
        
        var spriteSheet = loadSpriteSheet('images/ekaterina/gateway.png', 350, 350, 4);
		this.sceneLink = new NPC(-100, 400, spriteSheet);
	}

	
	setup() {
        
		const animations = {
            
            mousemovesright: loadAnimation(this.mousemovesright),
            mousemovesleft: loadAnimation(this.mousemovesleft),
            mouseidle: loadAnimation(this.mouseidle),
            
            lionmovesright: loadAnimation(this.lionmovesright),
            lionmovesleft: loadAnimation(this.lionmovesleft),
			lionidle: loadAnimation(this.lionidle),
		};

        
        this.characterMouse = new Mouse(animations);
        this.characterMouse.changeAnimation('mouseidle');
        
        this.characterLion = new Lion(animations);
		this.characterLion.changeAnimation('lionidle');
        
        this.obstacles.setup();
        
        this.map.setup();
        this.sceneLink.setup();
	}
    
    start() {
        //this.remixSound.play();
    }

	draw() {
        
        this.characterMouse.update();
		this.characterMouse.display();
        
        this.characterLion.update();
		this.characterLion.display();
        

		/* user input - move character around */
		var isWalkingRightLion = false;
        var isWalkingLeftLion = false;
        
        var isWalkingRightMouse = false;
        var isWalkingLeftMouse = false;
        
        
		if (keyIsDown(88))//Key X 
        {
			this.characterLion.speedX = 7;
			isWalkingRightLion = true;
		} else if (keyIsDown(90))//Key Z 
        {
			this.characterLion.speedX = -7;
			isWalkingLeftLion = true;
		} else {
			this.characterLion.speedX = 0;
		}
        
        if (keyIsDown(RIGHT_ARROW)) {
			this.characterMouse.speedX = 7;
			isWalkingRightMouse = true;
		} else if (keyIsDown(LEFT_ARROW)) {
			this.characterMouse.speedX = -7;
			isWalkingLeftMouse = true;
		} else {
			this.characterMouse.speedX = 0;
		}
		
		
		if (isWalkingRightLion) {
			this.characterLion.changeAnimation('lionmovesright');
            if (this.LionSounds.every(sound => sound.isPlaying() == false))
                random(this.LionSounds).play();
		} else {
			this.characterLion.changeAnimation('lionidle');
		}
        
        if (isWalkingLeftLion) {
			this.characterLion.changeAnimation('lionmovesleft');
            if (this.LionSounds.every(sound => sound.isPlaying() == false))
                random(this.LionSounds).play();
		} 
        
        if (isWalkingRightMouse) {
			this.characterMouse.changeAnimation('mousemovesright');
            if (this.MouseSounds.every(sound => sound.isPlaying() == false))
                random(this.MouseSounds).play();
		} else {
			this.characterMouse.changeAnimation('mouseidle');
		}
        if (isWalkingLeftMouse) {
			this.characterMouse.changeAnimation('mousemovesleft');
            if (this.MouseSounds.every(sound => sound.isPlaying() == false))
                random(this.MouseSounds).play();
		}
          
        this.obstacles.collide(this.characterMouse);
        this.obstacles.move(this.characterMouse);
        
        this.obstacles.collide(this.characterLion);
        this.obstacles.move(this.characterLion);

        this.map.display();
        this.obstacles.display();
        
        this.characterLion.update();
		this.characterLion.display();
        
        this.characterMouse.update();
		this.characterMouse.display();
        
        this.sceneLink.display();
		if (this.sceneLink.overlap(this.characterMouse))
        {
                changeScene('mousewins');
                if (this.WinSound.every(sound => sound.isPlaying() == false))
                random(this.WinSound).play();
		}
        
        this.sceneLink.display();
		if (this.sceneLink.overlap(this.characterLion)) 
        {
				changeScene('lionwins');
                if (this.WinSound.every(sound => sound.isPlaying() == false))
                random(this.WinSound).play();
		}
}

}
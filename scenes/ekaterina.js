class ekaterina extends Scene {


	preload() {
        
		// sprite sheet - src, width, height, number of sprites
        this.mousemovesright = loadSpriteSheet('images/ekaterina/mousemovesright.png', 200, 200, 4);
        this.mousemovesleft = loadSpriteSheet('images/ekaterina/mousemovesleft.png', 200, 200, 4);
        this.mouseidle = loadSpriteSheet('images/ekaterina/mouseidle.png', 200, 200, 15);
        
        this.lionmovesright = loadSpriteSheet('images/ekaterina/lionmovesright.png', 500, 500, 11);
        this.lionmovesleft = loadSpriteSheet('images/ekaterina/lionmovesleft.png', 500, 500, 11);
		this.lionidle = loadSpriteSheet('images/ekaterina/lionidle.png', 500, 500, 15),
        
        this.background = loadImage('images/ekaterina/background.png');
        this.remixSound = loadSound('sounds/ekaterina/remix.mp3');
        
        this.MouseSounds = [];
		this.MouseSounds[0] = loadSound('sounds/ekaterina/mousemoves.mp3');
		this.MouseSounds[0].playMode('sustain');
        
        this.LionSounds = [];
        this.LionSounds[0] = loadSound('sounds/ekaterina/lionmoves.mp3');
        this.LionSounds[0].playMode('sustain');
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

        
        this.characterMouse = new Character(animations);
        this.characterMouse.changeAnimation('mouseidle');
        
        this.characterLion = new Character(animations);
		this.characterLion.changeAnimation('lionidle');
        
	}
    
    start() {
        this.remixSound.play();
    }

	draw() {
		background(this.background);
        
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
			this.characterLion.speedX = 10;
			isWalkingRightLion = true;
		} else if (keyIsDown(90))//Key Z 
        {
			this.characterLion.speedX = -10;
			isWalkingLeftLion = true;
		} else {
			this.characterLion.speedX = 0;
		}
        
        if (keyIsDown(RIGHT_ARROW)) {
			this.characterMouse.speedX = 10;
			isWalkingRightMouse = true;
		} else if (keyIsDown(LEFT_ARROW)) {
			this.characterMouse.speedX = -10;
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
	}

}
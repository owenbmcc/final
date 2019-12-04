class CombatScene extends Scene {
	preload() {
		this.playerSpriteSheet = loadSpriteSheet('images/owen/idle.png', 68, 104, 12);
		this.npcSpriteSheet = loadSpriteSheet('images/owen/bird.png', 180, 200, 1);
		
		this.balloonSheet = loadSpriteSheet('images/paralax/balloon.png', 128, 128, 1);
		this.cloudSheet = loadSpriteSheet('images/paralax/cloud.png', 96, 56, 1);
		this.kiteSheet = loadSpriteSheet('images/paralax/kite.png', 128, 128, 1);
	}
	
	setup() {
		var playerAnimations = {
			idle: this.playerSpriteSheet	
		};
		this.player = new Character(playerAnimations, 
	}
}
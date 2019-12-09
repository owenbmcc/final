class BattleScene extends Scene {
    
    constructor(name, attacks) {
        super();
        this.name = name;
        this.attacks = attacks;

    }
	
	preload() {
		
		// character graphics
		this.playerSpriteSheet = loadSpriteSheet('images/nick/idle.png', 68, 104, 12);
		this.npcSpriteSheet = loadSpriteSheet('images/nick/ben.png', 68, 104, 1);
		
		// action choices graphics
		this.slashSheet = loadSpriteSheet('images/nick/slash.png', 80, 80, 1);
		this.cloudSheet = loadSpriteSheet('images/paralax/cloud.png', 96, 56, 1);
		this.kiteSheet = loadSpriteSheet('images/paralax/kite.png', 128, 128, 1);
	}
	
	setup() {
		var playerAnimations = {
			idle: this.playerSpriteSheet	
		};
		this.player = new Character(playerAnimations, 200, height/2);
		
		var npcAnimations = {
			idle: this.npcSpriteSheet	
		};
		this.npc = new Character(npcAnimations, width - 200, height/2);
		
		/* setting up combat */
		// player, npc, npc name, timeout duration
		this.combat = new Combat(this.player, this.npc, this.name, 50);
		// possible states turn, message, win, lose
		
		// name, max value, min value, callback
		this.combat.addMetric('health', 100, 0, function(isPlayer, combat) {
			// when one character has 0 health
			if (isPlayer) {
				combat.state = 'lose';
				combat.message = "You lost.";
			} else {
				combat.state = 'win';
				combat.message = "You win.";
			}
		});
		
		// graphics, metric, probability, damage
		this.combat.addPlayerAttack(this.slashSheet, 'health', 0.5, -20);
		this.combat.addPlayerAttack(this.cloudSheet, 'health', 0.2, -40);
		this.combat.addPlayerAttack(this.kiteSheet, 'health', 0.8, -10);
		
        for (let i = 0; i < this.attacks.length; i++) {
            var attack = this.attacks[i];
            this.combat.addNPCAttack('health', attack.probability, attack.damage);
        }
				
		this.combat.onWin = function() {
			changeScene('nick');	
		};
		
		this.combat.onLose = function() {
			changeScene('nick');
		};
		
	}
	
	start() {
		this.combat.reset();
	}
	
	draw() {
		background('#34c6eb');
		
		this.combat.update();
		this.combat.display();
		
		// this.combat.message
		textSize(40);
		textAlign(CENTER, CENTER);
		noStroke();
		fill('blue');
		text(this.combat.message, width/2, height - 100);
		
		// this.combat.counter 
		fill('blue');
		ellipse(width - 100, height - 100, this.combat.counter * 2);
		noFill();
		stroke('green');
		ellipse(width - 100, height - 100, 50 * 2);
		
		// this.player.health, this.npc.health
		fill('red');
		noStroke();
		rect(this.player.x, this.player.y - 100, max(0, this.player.health), 10);
		stroke(0);
		noFill();
		rect(this.player.x, this.player.y - 100, 100, 10);
		
		fill('red');
		noStroke();
		rect(this.npc.x, this.npc.y - 100, max(0, this.npc.health), 10);
		stroke(0);
		noFill();
		rect(this.npc.x, this.npc.y - 100, 100, 10);
	}
}

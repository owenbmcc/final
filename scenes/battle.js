class BattleScene extends Scene {
    
    constructor(name, attacks) {
        super();
        this.name = name;
        this.attacks = attacks;

    }
	
	preload() {
		
        this.map = new Map();
		
		/* 
			test your json data before committing
			its creating errors breaking the project
		*/
		
//		this.map.preload('data/battle.json');
        
        this.bg = loadSound('sounds/nick/combatmusic.m4a');
        
		// character graphics
		this.playerSpriteSheet = loadSpriteSheet('images/nick/idle.png', 68, 104, 12);
		this.attack1SpriteSheet = loadSpriteSheet('images/nick/animateslash.png', 80, 88, 3);
		this.attack2SpriteSheet = loadSpriteSheet('images/nick/animatefire.png', 60, 51, 7);
		this.attack2SpriteSheet = loadSpriteSheet('images/nick/animatelightning.png', 69, 66, 4);
		this.npcSpriteSheet = loadSpriteSheet('images/nick/ben.png', 68, 104, 7);
		
		// action choices graphics
		this.slashSheet = loadSpriteSheet('images/nick/slash.png', 110, 110, 1);
		this.fireSheet = loadSpriteSheet('images/nick/fire.png', 110, 110, 1);
		this.lightningSheet = loadSpriteSheet('images/nick/lightning.png', 110, 110, 1);
	}
	
	setup() {
        
        this.map.setup();
        
        
		var playerAnimations = {
			idle: this.playerSpriteSheet,
            attack1: this.attack1SpriteSheet
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
		this.combat.addPlayerAttack(this.slashSheet, 'health', 0.9, -20,'slashed','missed','attack1');
		this.combat.addPlayerAttack(this.fireSheet, 'health', 0.7, -40,'fireball','missed','attack1');
		this.combat.addPlayerAttack(this.lightningSheet, 'health', 0.2, -90,'lightning','missed','attack1');
		
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
        this.map.start();
        this.bg.loop();
	}
    end() {
		this.bg.pause();
    }
	
	draw() {
        
		background('#4d0505');
		this.map.display();
		this.combat.update();
		this.combat.display();
		
		// this.combat.message
		textSize(40);
		textAlign(CENTER, CENTER);
		noStroke();
		fill('#054d36');
		text(this.combat.message, width/2, height - 100);
		
		// this.combat.counter 
		fill('#054d36');
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

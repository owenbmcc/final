class marsii extends Scene {


    preload() {

        //Main character - Astronaut
        this.walkright = loadSpriteSheet('images/marsii/astwalkr.png', 64, 128, 8);
        this.walkleft = loadSpriteSheet('images/marsii/astwalkl.png', 64, 128, 8);
        this.walkup = loadSpriteSheet('images/marsii/astwalku.png', 64, 128, 8);
        this.walkdown = loadSpriteSheet('images/marsii/astwalkd.png', 64, 128, 8);
        this.idle = loadSpriteSheet('images/marsii/astidle.png', 64, 128, 15);
        //this.startSet = loadImage('images/marsii/testmap.png', 4830 , 3150);

        //Sounds

        /*  
        this.walkSounds = [];
		this.walkSounds[0] = loadSound('sounds/marsii/asttalk.wav');
		
		this.walkSounds[0].playMode('sustain');
        
        this.talkSounds = [];
		this.talkSounds[0] = loadSound('sounds/marsii/footsteps.wav');

		this.talkSounds[0].playMode('sustain');
        
        this.bgSounds = [];
		this.bgSounds[0] = loadSound('sounds/marsii/goodjob.wav'); //used when task completed
        this.bgSounds[1] = loadSound('sounds/marsii/select.wav'); //used when selecting dialogue and path

		this.bgSounds[0].playMode('sustain');
        this.bgSounds[1].playMode('sustain');
        */


        //key items
        //
        //        var shiprepaired = false;
        //        var key = false;
        //        var shipuprighted = false;
        //        var navimap = false;
        //        var mapnoted = false;
        //        var shipunattended = false;

        //quest items


        //this.objective.good = "You need", shiprepair, map, shipuprighted;
        //this.objective.bad = "You need", key, shipunattended;


        //NPC

        var staticAlienSheet = loadSpriteSheet('images/marsii/npcs/staticAlien.png', 64, 128, 8);
        this.staticAlien = new NPC(400, -600, staticAlienSheet, "Hi. you need me for energy.");
        this.staticAlien.dialogCount = 0;
        //400, -600

        var cosmicAlienSheet = loadSpriteSheet('images/marsii/npcs/cosmicAlien.png', 64, 130, 6);
        this.cosmicAlien = new NPC(100, 1000, cosmicAlienSheet, "Hi. you need me for my power.");
        this.cosmicAlien.dialogCount = 0;
        //-2700, -570


        var liquidAlienSheet = loadSpriteSheet('images/marsii/npcs/liquidAlien.png', 64, 128, 4);
        //var liquidAlienSheetFrozen = loadSpriteSheet('/images/marsii/npcs/liquidAlienFrozen.png', 64, 128, 1);
        this.liquidAlien = new NPC(200, 1200, liquidAlienSheet, "(Needed for map and key(if doing bad route))");
        this.liquidAlien.dialogCount = 0;
        //200, 1200

        var plantAlienSheet = loadSpriteSheet('images/marsii/npcs/plantAlien.png', 64, 128, 4);
        this.plantAlien = new NPC(-1700, 500, plantAlienSheet, "(Needed to fix ship,)");
        this.plantAlien.dialogCount = 0;
        //-1700, 500

        var creepAlienSheet = loadSpriteSheet('images/marsii/npcs/creepAlienB.png', 252, 252, 5);
        this.creepAlien = new NPC(-1800, 1600, creepAlienSheet, "(Need to upright ship");
        this.creepAlien.dialogCount = 0;
        //-1800, 1600

        var astShipSheet = loadSpriteSheet('images/marsii/npcs/brokenship.png', 353, 188, 1);
        this.astShip = new NPC(847, 359, astShipSheet, "Your ship");
        this.astShip.dialogCount = 0;


        var alienShipSheet = loadSpriteSheet('images/marsii/npcs/ufo.png', 359, 244, 1);
        this.alienShip = new NPC(-2200, 500, alienShipSheet, "Alien ship");
        this.alienShip.dialogCount = 0;




        this.map = new Map();
        this.map.preload('data/marsii.json');
    }

    setup() {
        this.hitEnter = false;
        const animations = {

            //Main character directional and idle animation
            walkright: loadAnimation(this.walkright),
            walkleft: loadAnimation(this.walkleft),
            walkup: loadAnimation(this.walkup),
            walkdown: loadAnimation(this.walkdown),
            idle: loadAnimation(this.idle)

        };

        this.character = new Character(animations);
        this.character.changeAnimation('idle');

        this.map.setup();

        this.liquidAlien.setup();
        this.cosmicAlien.setup();
        this.staticAlien.setup();
        this.plantAlien.setup();
        this.creepAlien.setup();
        this.astShip.setup();
        this.alienShip.setup();
        //Interactable Objects
        //this.ship.setup();

    }

    start() {
        //		this.bg.play();
        //		this.bg.loop();
        this.map.start();
    }

    end() {
        //this.bg.pause();	
    }

    draw() {
        //Debugging stuff
        //map maybe big, helps to have camera
        if (mouseIsPressed)
            camera.zoom = 0.3;
        else
            camera.zoom = 1;
        //console.log(this.character.x, this.character.y)
        /*
    //bg = this.startSet;
         //.5 zoom is zooming out (50% of the normal size)
            
    
   */

        //camera.position.x = this.sprite.position.x;
        //camera.position.y = this.sprite.position.y;


        // background(this.startSet);
        textSize(10);
        //background('DarkBlue');
        //fill('black');
        //textAlign(CENTER, 100);
        //text("Naomi's Scene", width / 2, height / 2);

        //this.character.update();
        //this.character.display();

        /*
        for(humandialog;){
            fill('white');
            stroke('Midnight');
            strokeWeight(1);
            text(humandialog, this.character.x, this.character.y - 20);
        }
        */


        // user input - move character around 

        //let bboxH = font.textBounds(textString, 10, 30, 12);
        //rect(bbox.x, bbox.y, bbox.w, bbox.h);
        //let textString = 'Lorem ipsum dolor sit amet.';

        // Needed for Liquid Alien
        var blackhole = false;
        var bhNeed = false;
        var icepick = false;
        // Needed from Liquid Alien
        var frozenmap = false;
        var frozenkey = false;
        var unmarkedmap = false;
        // Needed for Cosmic Alien
        var logneed = false;
        var fakelog = false;
        var reallog = false;
        var cJournalNeed = false;

        // Needed from Cosmic Alien
        var markedmap = false;
        var cJournal = false;
        var anomalyPiece = false;
        var astJournalNeed = false;
        var astJournal = false;

        // Needed from Creepy Alien
        var unfrozenkey = false;

        // Needed for Plant Alien
        var anomalyNeed = false;
        // Needed from Plant Alien
        var shipUnattended = false;

        // Needed for Static Alien

        // Needed from Static Alien
        var partBattery = false;
        var fullBattery = false;
        var emptyBattery;


        // user input - move character around 
        var isWalkingR = false;
        var isWalkingL = false;
        var isWalkingU = false;
        var isWalkingD = false;

        if (keyIsDown(RIGHT_ARROW) && this.character.x) {
            this.character.speedX = 5;
            isWalkingR = true;
        } else if (keyIsDown(LEFT_ARROW) && this.character.x) {
            this.character.speedX = -5;
            isWalkingL = true;
        } else {
            this.character.speedX = 0;
        }

        if (keyIsDown(DOWN_ARROW)) {
            this.character.speedY = 5;
            isWalkingD = true;
        } else if (keyIsDown(UP_ARROW)) {
            this.character.speedY = -5;
            isWalkingU = true;
        } else {
            this.character.speedY = 0;
        }

        if (isWalkingR) {
            this.character.changeAnimation('walkright');
        } else if (isWalkingL) {
            this.character.changeAnimation('walkleft');
        } else if (isWalkingD) {
            this.character.changeAnimation('walkdown');
        } else if (isWalkingU) {
            this.character.changeAnimation('walkup');
        } else {
            this.character.changeAnimation('idle');
        }


        /* update map */
        this.map.collide(this.character);
        this.map.move(this.character);
        //		this.map.update(this.character);
        this.map.display();

        /* update character */
        //console.log(this.character.x, this.character.y)
        this.character.update();
        this.character.display();

        var humanDialog;

        /* check npcs */
        this.staticAlien.display();
        if (this.staticAlien.overlap(this.character)) {
            /* style dialog */
            console.log("Static Alien", this.staticAlien.dialogCount);
            textSize(15);
            fill('gray');
            stroke('black');
            strokeWeight(1);
            var dialog;
            var humanDialogS;
            if (this.staticAlien.dialogCount == 0) {
                dialog = 'hi...';
            } else if (this.staticAlien.dialogCount == 0.5) {
                humanDialogS = "Hello...? Are you ok?";
            } else if (this.staticAlien.dialogCount == 1) {
                dialog = "I guess. I don't really know.";
            } else if (this.staticAlien.dialogCount == 1.5) {
                humanDialogS = "Okay... well do you have anything I can use to get off this planet?";
            } else if (this.staticAlien.dialogCount == 2) {
                dialog = "I don't think so.";
            } else if (this.staticAlien.dialogCount == 2.5) {
                humanDialogS = "(I think this thing's made of energy, I can feel the static through my suit.) Is there something you need?";
            } else if (this.staticAlien.dialogCount == 3) {
                dialog = "I want to learn about other alien species.";
            } else if (this.staticAlien.dialogCount == 3.5) {
                humanDialogS = "If I help you do that, will you help me and give some energy";
            } else if (this.staticAlien.dialogCount == 4) {
                dialog = "Okay, I can't give you too much though";
            } else if (this.staticAlien.dialogCount == 4.5) {
                humanDialogS = "Alright, I'll be back";
                cJournalNeed = true;
                this.staticAlien.dialogCount = 5;
            }
            if (cJournal == true) {
                if (this.staticAlien.dialogCount = 6) {
                    dialog = 'Oh, you got something';
                } else if (this.staticAlien.dialogCount = 6.5) {
                    humanDialogS = "Yup, it's a chronicle of numerous different species, exactly what you wanted.";
                } else if (this.staticAlien.dialogCount = 7) {
                    dialog = 'Thank you. What do you want me to do?';
                } else if (this.staticAlien.dialogCount = 6.5) {
                    humanDialogS = "Yup, it's a chronicle of numerous different species, exactly what you wanted.";
                }
            }

            if (this.staticAlien.dialogCount == 5) {
                dialog = 'It has nothing else to say to you';
                if (cJournal == true) {
                    this.staticAlien.dialogCount = 6;
                }
                this.staticAlien.dialogCount = 5;
            }


            text(dialog, this.staticAlien.x, this.staticAlien.y, 200, 200);
            text(humanDialogS, this.character.x, this.character.y, 200, 200);
            fill(255);
            text("hit enter", this.staticAlien.x, this.staticAlien.y + 50);

            if (keyIsDown(ENTER) && !this.hitEnter) {
                this.staticAlien.dialogCount = this.staticAlien.dialogCount + .5;
                this.hitEnter = true;
            } else if (!keyIsDown(ENTER)) {
                this.hitEnter = false;
            }
        }

        this.liquidAlien.display();
        if (this.liquidAlien.overlap(this.character)) {
            /* style dialog */

            console.log("Liquid Alien", this.liquidAlien.dialogCount);
            textSize(15);
            if (this.liquidAlien.dialogCount % 1 == .5) {
                fill('white');
                text(humanDialogL, this.character.x, this.character.y - 20, 200, 200);
            } else {
                fill('Cyan');
            }
            stroke('black');
            strokeWeight(1);
            var dialog;
            var humanDialogL;
            if (this.liquidAlien.dialogCount == 0) {
                dialog = 'hello';
            } else if (this.liquidAlien.dialogCount == 0.5) {
                humanDialogL = "hello, do you have something I can use to get out of here? I need help."
            } else if (this.liquidAlien.dialogCount == 1) {
                dialog = "I have a map. I also have a key, but I don't know what it unlocks. Anyway, what can you give me in return?";
            } else if (this.liquidAlien.dialogCount == 1.5) {
                humanDialogL = "(That key probably unlocks something important around here.) Well I do need a map, what do you want?";
            } else if (this.liquidAlien.dialogCount == 2) {
                dialog = 'Well, maps are pretty valuable, so can you help me achieve a dream?';
            } else if (this.liquidAlien.dialogCount == 2.5) {
                humanDialogL = "I guess I can try. what is it?";
            } else if (this.liquidAlien.dialogCount == 3) {
                dialog = "I want to see what freezing feels like, but it's hard to find anything cold enough.";
            } else if (this.liquidAlien.dialogCount == 3.5) {
                humanDialogL = "What would be cold enough?";
            } else if (this.liquidAlien.dialogCount == 4) {
                dialog = "Maybe like a black hole? But it would have to be small and contained. I don't want to completely freeze.";
                bhNeed = true;
                console.log("Black Hole Need", bhNeed);
            } else if (this.liquidAlien.dialogCount == 4.5) {
                humanDialogL = "that sounds hard to find, is there anything else you would want?";
            } else if (this.liquidAlien.dialogCount == 5) {
                dialog = "Well, I wouldn't mind having another pet (I'll change this later)";
            } else if (this.liquidAlien.dialogCount == 5.5) {
                humanDialogL = "I'll try to find something.";
            }

            if (blackhole == false && this.liquidAlien.dialogCount == 6.5) {
                this.liquidAlien.dialogCount = 6;
                //there needs to be a good, bad option here. One where you just get the map, one where you freeze her for other items.
            } else if (blackhole == true) {
                this.liquidAlien.dialogCount = 7;
                if (this.liquidAlien.dialogCount == 7) {
                    dialog = "Did you manage to find something?";

                    //user prompt

                    humanDialogL = "choice [1]: heres the blackhole.choice [2]: *throw blackhole into alien and freeze her* choice [3]: heres a pet. press [4]: not yet"
                    if (keyIsDown(1)) {
                        this.liquidAlien.dialogCount = 8;
                        if (this.liquidAlien.dialogCount == 8) {
                            dialog = "Thank you very much, here's a map.";
                            unmarkedmap = true;
                        }
                    } else if (keyIsDown(2)) {
                        this.liquidAlien.dialogCount = 9;
                        if (this.liquidAlien.dialogCount == 9) {
                            dialog = "!!!";
                            //freezes alien
                            //liquid 
                            if (icepick == true) {

                                humanDialogL = "You break off pieces with key and the map";
                                var frozenmap = true;
                                var frozenkey = true;
                            } else {
                                humanDialogL = "I need something to break off the pieces I want"
                                this.liquidAlien.dialogCount = 15;
                            }

                        }
                    } else if (keyIsDown(3)) {
                        if (this.liquidAlien.dialogCount == 10) {
                            dialog = "Thank you, here's the map."
                        }
                    } else if (keyIsDown(4)) {
                        this.liquidAlien.dialogCount = 6;
                    }
                }

            }

            if (this.liquidAlien.dialogCount == 6) {
                dialog = "(She has nothing else to say to you right now.)";
            }
            if (this.liquidAlien.dialogCount == 15) {
                if (icepick = false) {
                    humanDialogL = "You break off pieces with key and the map";
                    frozenmap = true;
                    frozenkey = true;
                } else {
                    dialog = "(You need something sharp to break off pieces)";
                    this.liquidAlien.dialogCount = 15;
                }
            }


            text(dialog, this.liquidAlien.x, this.liquidAlien.y, 200, 200);
            text(humanDialogL, this.character.x, this.character.y - 20, 200, 200);
            fill(255);
            text("hit enter", this.liquidAlien.x, this.liquidAlien.y + 50);

            if (keyIsDown(ENTER) && !this.hitEnter) {
                this.liquidAlien.dialogCount = this.liquidAlien.dialogCount + 0.5;
                this.hitEnter = true;
            } else if (!keyIsDown(ENTER)) {
                this.hitEnter = false;
            }
        }

        this.creepAlien.display();
        if (this.creepAlien.overlap(this.character)) {
            /* style dialog */
            console.log("Creep Alien", this.creepAlien.dialogCount);
            textSize(15);
            if (this.creepAlien.dialogCount % 1 == .5) {
                fill('white');
            } else {
                fill('red');
            }
            stroke('black');
            strokeWeight(1);
            var dialog;
            var humanDialogCr;

            if (this.creepAlien.dialogCount == 0) {
                dialog = "Greetings, I'm suprised you approached me";
            } else if (this.creepAlien.dialogCount == 0.5) {
                humanDialogCr = "Oh? Why is that?";
            } else if (this.creepAlien.dialogCount == 1) {
                dialog = "Most beings are too intimidated by my apperance. It's pretty saddening. Anyway why did you approach me?";
            } else if (this.creepAlien.dialogCount == 1.5) {
                humanDialogCr = "I need to get off this planet. Do you have anything I could use?";
            } else if (this.creepAlien.dialogCount == 2) {
                dialog = "Probably not. Unless you need something heated up";
            } else if (this.creepAlien.dialogCount == 2.5) {
                humanDialogCr = "You look strong, do you think you can you lift a ship?";
            } else if (this.creepAlien.dialogCount == 3) {
                dialog = "Probably, but it would talk a lot of effort, I wouldn't do it unless it was worth it";
            } else if (this.creepAlien.dialogCount == 3.5) {
                humanDialogCr = "If I get you something that makes it worth it will you do it?";
            } else if (this.creepAlien.dialogCount == 4) {
                dialog = "Sure";
            } else if (this.creepAlien.dialogCount == 4.5) {
                humanDialogCr = "( I'll have to find something to make him less intimidating)";
            }


            text(dialog, this.creepAlien.x, this.creepAlien.y - 60, 200, 200);
            text(humanDialogCr, this.character.x - 20, this.character.y - 20, 200, 200);
            fill(255);
            text("hit enter", this.creepAlien.x, this.creepAlien.y + 50);

            if (keyIsDown(ENTER) && !this.hitEnter) {
                this.creepAlien.dialogCount = this.creepAlien.dialogCount + 0.5;
                this.hitEnter = true;
            } else if (!keyIsDown(ENTER)) {
                this.hitEnter = false;
            }
        }

        this.plantAlien.display();
        if (this.plantAlien.overlap(this.character)) {
            /* style dialog */
            textSize(15);
            if (this.plantAlien.dialogCount % 1 == .5) {
                fill('white');
            } else {
                fill('green');
            }
            stroke('black');
            strokeWeight(1);
            var dialog;
            var humanDialogP;

            if (this.plantAlien.dialogCount == 0) {
                dialog = "Hey, what's up?";
            } else if (this.plantAlien.dialogCount == 0.5) {
                humanDialogP = "Hey, do you have something I can use to get off this planet?";
            } else if (this.plantAlien.dialogCount == 1) {
                dialog = "Depends. What do you need?";
            } else if (this.plantAlien.dialogCount == 1.5) {
                humanDialogP = "Energy, a map, ship repairs and my ship uprighted.";
            } else if (this.plantAlien.dialogCount == 2) {
                dialog = "Well, I've built a ship, so I can probably repair yours. What species made it?";
            } else if (this.plantAlien.dialogCount == 2.5) {
                humanDialogP = "I don't really know. I'm not even sure how I got here. I was in my ship one minute and I just woke up in there and crashed shortly after";
            } else if (this.plantAlien.dialogCount == 3) {
                dialog = "Interesting. It's probably a species from around here. I can probably repair it.";
            } else if (this.plantAlien.dialogCount == 3.5) {
                humanDialogP = "So, what do you want in exchange?.";
            } else if (this.plantAlien.dialogCount == 4) {
                dialog = " Non-essentials from 'your' ship, and some technology from your species?";
            } else if (this.plantAlien.dialogCount == 4.5) {
                humanDialogP = "I don't really have much of my own tech on me.";
            } else if (this.plantAlien.dialogCount == 5) {
                dialog = "I see. Well give me whatever you can spare and if you get me a piece of that anomaly up there I'll fix your ship.";
                anomalyNeed = true;
            } else if (this.plantAlien.dialogCount == 5.5) {
                humanDialogP = "I don't really know. I'm not even sure how I got here. I was in my ship one minute and I just woke up in there and crashed shortly after";
            } else if (this.plantAlien.dialogCount == 6) {
                dialog = "Interesting. It's probably a species from around here. I can probably repair it.";
            }

            text(dialog, this.plantAlien.x - 20, this.plantAlien.y - 50, 200, 200);
            text(humanDialogP, this.character.x, this.character.y, 200, 200);
            fill(255);
            text("hit enter", this.plantAlien.x, this.plantAlien.y + 50);

            if (keyIsDown(ENTER) && !this.hitEnter) {
                this.plantAlien.dialogCount = this.plantAlien.dialogCount + 0.5;
                this.hitEnter = true;
            } else if (!keyIsDown(ENTER)) {
                this.hitEnter = false;
            }
        }

        this.cosmicAlien.display();
        if (this.cosmicAlien.overlap(this.character)) {
            /* style dialog */

            textSize(15);
            if (this.cosmicAlien.dialogCount % 1 == .5) {
                fill('LightCyan');
            } else {
                fill('purple');
            }
            console.log("Cosmic Alien", this.cosmicAlien.dialogCount);
            stroke('black');
            strokeWeight(1);
            var firstchatC = false;
            var secondchatC;
            var dialog;
            var humanDialogC;
            if (this.cosmicAlien.dialogCount == 0) {
                dialog = "Hello, human. You are a human, correct?";
            } else if (this.cosmicAlien.dialogCount == 0.5) {
                humanDialogC = "Yes? How did you know?";
            } else if (this.cosmicAlien.dialogCount == 1) {
                dialog = "I don't know much about your race. I would like to know more but it's hard to get info on isolated.";
            } else if (this.cosmicAlien.dialogCount == 1.5) {
                humanDialogC = "Can you give me something useful in exchange for some info?";
            } else if (this.cosmicAlien.dialogCount == 2) {
                dialog = "I doubt I'd have anything you would want, but what do you need?";
                console.log("Blackhole Need", bhNeed);
                firstchatC = true;
                console.log("First Chat", firstchatC);
            }

            if (bhNeed == false && firstchatC == true) {
                this.cosmicAlien.dialogCount = 2.5;
            } else if (bhNeed == true && firstchatC == true) {
                this.cosmicAlien.dialogCount = 5.5;
            }


            if (this.cosmicAlien.dialogCount == 2.5) {
                humanDialogC = "I need a map, energy, ship repairs and my ship uprighted. Do you have any of those?";
            } else if (this.cosmicAlien.dialogCount == 3) {
                dialog = "No, but if you do get a map, I'll mark it for you. It's hard to navigate around here";
            } else if (this.cosmicAlien.dialogCount == 3.5) {
                humanDialogC = "Thanks, I don't really know how I got here. I'll come back when I have one.";
            } else if (this.cosmicAlien.dialogCount == 4) {
                this.cosmicAlien.dialogCount = 10;
            }



            if (this.cosmicAlien.dialogCount == 5.5) {
                humanDialogC = "I need energy, ship repairs and my ship uprighted. I also need a blackhole so I can trade it for a map";
            } else if (this.cosmicAlien.dialogCount == 6) {
                dialog = "Oh! I can make those, I'll give you one for human info."
                logneed = true;
            } else if (this.cosmicAlien.dialogCount == 6.5) {
                humanDialogC = "Ok. I should have something that should work on my ship. I'll be back."
            } else if (this.cosmicAlien.dialogCount == 7) {
                this.cosmicAlien.dialogCount = 19
            }


            if (this.cosmicAlien.dialogCount == 10) {
                secondchatC = true;
            }
            if (bhNeed == true && secondchatC == true) {
                if (this.cosmicAlien.dialogCount == 15.5) {
                    humanDialogC = "Hey, do you know where I can get a black hole? I need one to trade for a map."
                } else if (this.cosmicAlien.dialogCount == 16) {
                    dialog = "Oh! I can make those, I'll mark your map and give you one for human info."
                    logneed = true;
                } else if (this.cosmicAlien.dialogCount == 16.5) {
                    humanDialogC = "Ok. I should have something that should work on my ship. I'll be back."
                } else if (this.cosmicAlien.dialogCount == 17) {
                    this.cosmicAlien.dialogCount = 19;
                }
            } else if (bhNeed == true && secondchatC == false) {
                this.cosmicAlien.dialogCount = 13;
            }

            if (this.cosmicAlien.dialogCount == 21) {
                dialog = "Did you get the info?";
            } else if (this.cosmicAlien.dialogCount == 21.5) {
                if (fakelog == true || reallog == true) {
                    humanDialog = "Yup, here you go"
                } else if (this.cosmicAlien.dialogCount == 22) {
                    dialog = "Thank you very much human. I look forward to reading this. Here's a blackhole, be very careful with that.";
                    blackhole = true;
                    this.cosmicAlien.dialogCount = 25;
                }
                this.cosmicAlien.dialogCount = 22.5;
            } else if (this.cosmicAlien.dialogCount == 22.5) {
                humanDialogC = "No, I'll be back";
            } else if (this.cosmicAlien.dialogCount == 23) {
                this.cosmicAlien.dialogCount = 19;
            }
            //  dialog = "(She has nothing more to say to you.)"


            if (this.cosmicAlien.dialogCount == 19) {
                dialog = "She has nothing else to say to you right now"
            } else if (this.cosmicAlien.dialogCount == 19.5) {
                this.cosmicAlien.dialogCount = 21;
            }
            if (this.cosmicAlien.dialogCount == 13) {
                dialog = "She has nothing more to say to you right now"
                this.cosmicAlien.dialogCount = 10;
            }

            if (this.cosmicAlien.dialogCount == 25) {
                if (unmarkedmap = true) {
                    dialog = "I see you have the map, I'll mark it";
                    markedmap = true;
                    unmarkedmap = false;
                    this.cosmicAlien.dialogCount = 25;
                } else if (cJournalNeed = true) {
                    this.cosmicAlien.dialogCount = 35.5;
                } else if (anomalyNeed = true) {
                    this.cosmicAlien.dialogCount = 45.5;
                } else if (astJournal = true) {
                    this.cosmicAlien.dialogCount = 40.5;
                } else {
                    dialog = "She's grateful, but has nothing more to say to you for now"
                    this.cosmicAlien.dialogCount = 25;
                }
            }

            if (this.cosmicAlien.dialogCount == 35.5) {
                humanDialogC = "Hey, you collect information on various different species right?"
            } else if (this.cosmicAlien.dialogCount == 36) {
                dialog = "Yes."
            } else if (this.cosmicAlien.dialogCount == 36.5) {
                humanDialogC = "Can I have a copy of some of that information?"
            } else if (this.cosmicAlien.dialogCount == 37) {
                dialog = "Maybe. Do you have something you can give me in exchange?"
            } else if (this.cosmicAlien.dialogCount == 37.5) {
                humanDialogC = "But I already gave you my log, can't you just give me it?"
            } else if (this.cosmicAlien.dialogCount == 38) {
                dialog = "Yeah but a lot of that information is personal. Your log is mostly informational. Do you have something more personal?"
            } else if (this.cosmicAlien.dialogCount == 38.5) {
                humanDialogC = "Not on me. I may have a journal in my ship. I was hoping to keep it though. "
            } else if (this.cosmicAlien.dialogCount == 39) {
                dialog = "Well, I'll add it to the collection and you can have that."
            } else if (this.cosmicAlien.dialogCount == 39.5) {
                humanDialogC = "Fine."
                astJournalNeed = true;
                this.cosmicAlien.dialogCount = 25;
            }


            if (this.cosmicAlien.dialogCount == 40.5) {
                humanDialogC = "Here's my journal"
            } else if (this.cosmicAlien.dialogCount == 41) {
                dialog = "Here's the collection";
                astJournal = false;
                cJournalNeed = false;
                cJournal = true;
                this.cosmicAlien.dialogCount = 25;
            }

            if (this.cosmicAlien.dialogCount == 45.5) {
                humanDialogC = "Hey, you see that anomaly?"
            } else if (this.cosmicAlien.dialogCount == 46) {
                dialog = "Yeah, I'm guessing you want a piece."
            } else if (this.cosmicAlien.dialogCount == 46.5) {
                humanDialogC = "Can you get me a piece?"
            } else if (this.cosmicAlien.dialogCount == 47) {
                dialog = "Sure."
                anomalyNeed = false;
                anomalyPiece = true;
                this.cosmicAlien.dialogCount = 25;
            }



            /*
            if(navimap == true && mapnoted == false){
                dialog = "I see you have a map now, I'll mark it for you so you can find your way home."
                //thanks
                mapnoted = true;
            }*/

            text(dialog, this.cosmicAlien.x, this.cosmicAlien.y, 200, 200);
            text(humanDialogC, this.character.x, this.character.y, 200, 200);
            fill(255);
            text("hit enter", this.cosmicAlien.x, this.cosmicAlien.y + 50);

            if (keyIsDown(ENTER) && !this.hitEnter) {
                this.cosmicAlien.dialogCount = this.cosmicAlien.dialogCount + 0.5;
                this.hitEnter = true;
            } else if (!keyIsDown(ENTER)) {
                this.hitEnter = false;
            }
        }

        this.astShip.display();
        if (this.astShip.overlap(this.character)) {
            /* style dialog */

            console.log("Astronaut Ship", this.astShip.dialogCount);
            textSize(15);
            if (this.astShip.dialogCount % 1 == .5) {
                fill('white');
                text(humanDialogSh, this.character.x, this.character.y - 20, 200, 200);
            } else {
                fill('LightSteelBlue');
            }
            stroke('black');
            strokeWeight(1);
            var dialog;
            var humanDialogSh;


            text(dialog, this.astShip.x, this.astShip.y, 200, 200);
            text(humanDialogL, this.character.x, this.character.y - 20, 200, 200);
            fill(255);
            text("hit enter", this.astShip.x, this.astShip.y + 50);

            if (keyIsDown(ENTER) && !this.hitEnter) {
                this.astShip.dialogCount = this.astShip.dialogCount + 0.5;
                this.hitEnter = true;
            } else if (!keyIsDown(ENTER)) {
                this.hitEnter = false;
            }
        }


        this.alienShip.display();
        if (this.alienShip.overlap(this.character)) {
            /* style dialog */

            console.log("Astronaut Ship", this.alienShip.dialogCount);
            textSize(15);
            if (this.alienShip.dialogCount % 1 == .5) {
                fill('white');
                text(humanDialogUfo, this.character.x, this.character.y - 20, 200, 200);
            } else {
                fill('LightSlateGray');
            }
            stroke('black');
            strokeWeight(1);
            var dialog;
            var humanDialogUfo;


            if (this.alienShip.dialogCount == 0) {
                dialog = "Take Alien Ship?";
            } else if (this.alienShip.dialogCount == 0.5) {
                humanDialogUfo = " [1] Yes || [2] No ";
                if (keyIsDown(1)) {
                    this.alienShip.dialogCount = 5;
                } else if (keyIsDown(2)) {
                    this.alienShip.dialogCount = 1;
                }
            }

            if (this.alienShip.dialogCount == 2) {
                dialog = "You've decided not to take the ship for now";
            } else if (this.alienShip.dialogCount == 2.5) {
                humanDialogUfo = "(Press enter if you change your mind)";
            } else if (this.alienShip.dialogCount == 3) {
                this.alienShip.dialogCount = 0;
            }

            if (this.alienShip.dialogCount == 5) {
                dialog = "You'll need certain things:";
            } else if (this.alienShip.dialogCount == 5.5) {
                this.alienShip.dialogCount = 6;
            } else if (this.alienShip.dialogCount == 6) {
                if (markedmap = false) {
                    fill('red');
                    text("You need a unfrozen, marked map", this.alienShip.x, this.alienShip.y - 75);
                } else if (markedmap = true) {
                    fill('green');
                    text("You have a marked map", this.alienShip.x, this.alienShip.y - 75);
                }

                if (unfrozenkey = false) {
                    fill('red');
                    text("You need an unfrozen key", this.alienShip.x, this.alienShip.y - 50);
                } else if (unfrozenkey = true) {
                    fill('green');
                    text("You have an unfrozen key", this.alienShip.x, this.alienShip.y - 50);
                }

                if (shipUnattended = false) {
                    fill('red');
                    text("You need the ship to be unatteded", this.alienShip.x, this.alienShip.y - 50);
                } else if (shipUnattended = true) {
                    ill('green');
                    text("You already have the ship unatteded", this.alienShip.x, this.alienShip.y - 50);
                }

                if (shipUnattended = false) {
                    fill('red');
                    text("You need the ship to be unatteded", this.alienShip.x, this.alienShip.y - 50);
                } else if (shipUnattended = true) {
                    ill('green');
                    text("You already have the ship unatteded", this.alienShip.x, this.alienShip.y - 50);
                }


            }


            text(dialog, this.alienShip.x, this.alienShip.y, 200, 200);
            text(humanDialogUfo, this.character.x, this.character.y - 20, 200, 200);
            fill(255);
            text("hit enter", this.alienShip.x, this.alienShip.y + 50);

            if (keyIsDown(ENTER) && !this.hitEnter) {
                this.alienShip.dialogCount = this.alienShip.dialogCount + 0.5;
                this.hitEnter = true;
            } else if (!keyIsDown(ENTER)) {
                this.hitEnter = false;

            }
        }
        /* 
               //this.cosmicAlien.displayDialog();
               //*/
        //this.ship.display();
        // if (this.ship.overlap(this.character)) {
        /* style dialog */

        /*
         this.ship.display();
        if (this.ship.overlap(this.character)) {
        
        textSize(20);
        fill('gray');
        stroke('black');
        strokeWeight(1);
        var dialog;
        var humanDialogSh;





        text(dialog, this.ship.x, this.ship.y);

        fill(255);
        text(humanDialogSh, this.character.x, this.character.y);
        text("hit enter", this.ship.x, this.ship.y + 50);



        if (keyIsDown(ENTER) && !this.hitEnter) {
            this.ship.dialogCount++;
            this.hitEnter = true;
        } else if (!keyIsDown(ENTER)) {
            this.hitEnter = false;
        }
    }
    */

        text(humanDialog, this.character.x, this.character.y);

    }


}



/* json stuff I need later
{
    "scenery": {
        "background": {
			"img":	"images/marsii/testmap.png",
			"width": 4830,
			"height": 3150,
			"frames": 1,
			"positions": [
				{ "x": 2415, "y": 1575 }
			]
		}
	},
    
    "scenery": {
        "background": {
			"img":	"images/marsii/testset.png",
			"width": 1200,
			"height": 1000,
			"frames": 1,
			"positions": [
				{ "x": 700, "y": 600 }
			]
		}
	},
    
    
    
    
    "npc": {
		"static": {
			"img": "images/marsii/npcs/staticAlien.png",
			"width": 64,
			"height": 128,
			"frames": 8,
			"x": 1000,
			"y": 400,
			"dialog": "H?, you need me for energy."
		},
		"cosmica": {
			"img": "images/marsii/npcs/cosmicAlien.png",
			"width": 64,
			"height": 128,
			"frames": 6,
			"x": 1000,
			"y": 400,
			"dialog": "Hey, you need me to mark your map, freeze liquid,  ."
		},
		"creep": {
			"img": "images/marsii/npcs/creepAlien.png",
			"width": 126,
			"height": 126,
			"frames": 5,
			"x": 1000,
			"y": 400,
			"dialog": "Greetings, you need me to lift your ship, or for my translator ."
		},
		"branch": {
			"img": "images/marsii/npcs/plantAlien.png",
			"width": 64,
			"height": 128,
			"frames": 4,
			"x": 900,
			"y": 1000,
			"dialog": "Hello, you need me to for my ship, or to repair yours ."
		},
		"liqua": {
			"img": "images/marsii/npcs/liquidAlien.png",
			"width": 64,
			"height": 128,
			"frames": 4,
			"x": 2800,
			"y": 2400,
			"dialog": "Hi, you need me for a map and tools, or a key ."
		}
*/
/*
        var spriteSheet = loadSpriteSheet('/images/marsii/npcs/staticAlien.png', 64, 128, 8);
		this.sceneLinkS = new NPC(-900, 420, spriteSheet, "Hi. you need me for energy.");
        
        var spriteSheet = loadSpriteSheet('/images/marsii/npcs/cosmicAlien.png', 64, 130, 6);
		this.sceneLink = new NPC(1200, 1200, spriteSheet, "Hi");

        var spriteSheet = loadSpriteSheet('/images/marsii/npcs/liquidAlien.png', 64, 128, 4);
		this.sceneLinkL = new NPC(200, 1200, spriteSheet, "Hi");
        
            "scenery": {
        "background": {
            "img": "images/marsii/testmap.png",
            "width": 4830,
            "height": 3150,
            "frames": 1,
            "positions": [
                {
                    "x": -900,
                    "y": 425
                }
			]
        }
    },
    /* style dialog */
/*
            textSize(20);
            if (this.cosmicAlien.dialogCount.endsWith('.5'){
            fill('white');
        }else{
            fill('purple');
        }
            */
/*
                        stroke('black');
                        strokeWeight(1);
                        var dialog;
                        if (this.cosmicAlien.dialogCount == 0) {
                            dialog = "Greetings, human. You are a human, correct?";
                        }else if (this.cosmicAlien.dialogCount == 0.5){
                            humandialog = "Yes? How did you know?";
                        } else if (this.cosmicAlien.dialogCount == 1) {
                            dialog = "I don't know much about your race. I would like to know more but it's hard to get info on isolated.";
                            humandialog = "Can you give me something useful in exchange for some info?";
                        } else if (this.cosmicAlien.dialogCount == 2) {
                            dialog = "I doubt I have anything you would want, or that you would be able to give enough information for that, but what do you need?"
                            //logneed = true;
                            humandialog = "I need a map, ship repairs and my ship uprighted."; 
                          /*  if (blackholeneed = false;)
                                 let font;
       // font = loadFont('.././p5.min.js/Regular.otf');
       let font;
                let bboxL = font.textBounds(dialog, 10, 30, 12);
                rect(bboxL.x, bboxL.y, bboxL.w, bboxL.h);
                    */

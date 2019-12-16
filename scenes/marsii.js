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
        */
        this.bgSounds = [];
        this.bgSounds[0] = loadSound('sounds/marsii/goodjob.wav'); //used when task completed
        this.bgSounds[1] = loadSound('sounds/marsii/select.wav'); //used when selecting dialogue and path

        //this.bgSounds[0].playMode('sustain');
        //this.bgSounds[1].playMode('sustain');



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

        var liquidAlienFrozen = loadSpriteSheet('/images/marsii/npcs/liquidAlienF.png', 64, 128, 1);
        this.liquidAlien = new NPC(200, 1200, liquidAlienSheet, "(Needed for map and key(if doing bad route))");
        this.liquidAlien.dialogCount = 0;
        //200, 1200

        var plantAlienSheet = loadSpriteSheet('images/marsii/npcs/plantAlien.png', 64, 128, 10);
        this.plantAlien = new NPC(-1700, 500, plantAlienSheet, "(Needed to fix ship,)");
        this.plantAlien.dialogCount = 0;
        //-1700, 500

        var creepAlienSheet = loadSpriteSheet('images/marsii/npcs/creepAlienB.png', 252, 252, 5);
        this.creepAlien = new NPC(-1800, 1600, creepAlienSheet, "(Need to upright ship");
        this.creepAlien.dialogCount = 0;
        //-1800, 1600

        //Ships
        var trailSheet = loadSpriteSheet('images/marsii/scenery/crashtrail.png', 546, 90, 1);
        this.shipTrail = new Scenery(1177, 552, trailSheet);

        var astShipSheet = loadSpriteSheet('images/marsii/npcs/brokenship.png', 353, 188, 1);
        this.astShip = new NPC(730, 500, astShipSheet, "Your ship");
        this.astShip.dialogCount = 0;

        var alienShipSheet = loadSpriteSheet('images/marsii/npcs/ufo.png', 359, 244, 1);
        this.alienShip = new NPC(-2200, 500, alienShipSheet, "Alien ship");
        this.alienShip.dialogCount = 0;

        //Scenery needed that dosen't work in json
        var treeSheet = loadSpriteSheet('images/marsii/scenery/treeoverlay.png', 1485, 1100, 1);
        this.treeOverlay = new Scenery(-1892, 203, treeSheet);

        var caveSheet = loadSpriteSheet('images/marsii/scenery/caveoverlay.png', 1808, 830, 1);
        this.caveOverlay = new Scenery(-1365, 1577, caveSheet);

        var pondSheet = loadSpriteSheet('images/marsii/scenery/pond.png', 848, 810, 5);
        this.pond = new Scenery(50, 1595, pondSheet);

        var lightningSheet = loadSpriteSheet('images/marsii/scenery/lightning.png', 1480, 560, 8);
        this.lightning = new Scenery(220, -700, lightningSheet);

        var watertreeSheet = loadSpriteSheet('images/marsii/scenery/watertree.png', 470, 640, 6);
        this.watertree = new Scenery(597, 1225, watertreeSheet);



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
        //Characters
        this.liquidAlien.setup();
        this.cosmicAlien.setup();
        this.staticAlien.setup();
        this.plantAlien.setup();
        this.creepAlien.setup();
        //Interactable Objects
        this.astShip.setup();
        this.alienShip.setup();
        this.shipTrail.setup();
        //Overlay
        this.treeOverlay.setup();
        this.caveOverlay.setup();
        //Scenery
        this.pond.setup();
        this.watertree.setup();
        this.lightning.setup();
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



        //LOOK INTO EVENT LISTENERS
        //FINISH UP STORIES (EVEN IF YOU CAN'T MAKE THEM WORK YET)

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
        //this.bhNeed = new need(this.liquidAlien.dialogCount == 4, this.cosmicAlien.dialogCount == 25, bhNeed, true, false);

        var icepick = false;
        // Needed from Liquid Alien
        var frozenmap = false;
        var frozenkey = false;
        var unmarkedmap = false;
        //this.unmarkedmap = new need(this.liquidAlien.dialogCount == 8, this.cosmicAlien.dialogCount == 25, unmarkedmap, true, false);
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
        var shipUprighted = false;
        //Needed for Creepy Alien
        var deviceNeed = false;
        var dfufilled = false;
        // Needed for Plant Alien
        var anomalyNeed = false;
        var backupneed = false;
        var backuplog = false;
        var bfufilled = false;
        var afufilled = false;
        // Needed from Plant Alien
        var shipUnattended = false;
        var shipRepaired = false;
        var gooddevice = false;
        var baddevice = false;

        // Needed for Static Alien
        var emptyBattery;
        // Needed from Static Alien
        var partBattery = false;
        var fullBattery = false;



        // user input - move character around 
        var isWalkingR = false;
        var isWalkingL = false;
        var isWalkingU = false;
        var isWalkingD = false;

        if (keyIsDown(RIGHT_ARROW) && this.character.x) {
            this.character.speedX = 8;
            isWalkingR = true;
        } else if (keyIsDown(LEFT_ARROW) && this.character.x) {
            this.character.speedX = -8;
            isWalkingL = true;
        } else {
            this.character.speedX = 0;
        }

        if (keyIsDown(DOWN_ARROW)) {
            this.character.speedY = 8;
            isWalkingD = true;
        } else if (keyIsDown(UP_ARROW)) {
            this.character.speedY = -8;
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
            if (this.staticAlien.dialogCount % 1 == .5) {
                fill('black');
            } else {
                fill('DimGray');
            }
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
                dialog = "Okay, I can't give you too much though, I don't want to cease to exist.";
            } else if (this.staticAlien.dialogCount == 4.5) {
                humanDialogS = "Alright, I'll be back";
                cJournalNeed = true;
                this.staticAlien.dialogCount = 5;
            }

            if (cJournal == true)
                if (this.staticAlien.dialogCount = 6) {
                    dialog = 'Oh, you got something';
                } else if (this.staticAlien.dialogCount = 6.5) {
                humanDialogS = "Yup, it's a chronicle of numerous different species, exactly what you wanted.";
            } else if (this.staticAlien.dialogCount = 7) {
                cJournal = false;
                dialog = 'Thank you. What do you want me to do?';
            } else if (this.staticAlien.dialogCount = 7.5) {
                humanDialog = 'Have refill battery [1]partially or [2]completely?'
                if (key == 1) {
                    this.cosmicAlien.dialogCount = 9.5;
                } else if (key == 2) {
                    this.cosmicAlien.dialogCount = 11.5;
                }
            }

            if (this.cosmicAlien.dialogCount == 9.5) {
                humanDialogS = "You will be safe, just touch here."
            } else if (this.cosmicAlien.dialogCount == 10) {
                dialog = "*You refill the battery just enough to get home*"
                partBattery = true;
            } else if (this.cosmicAlien.dialogCount == 10.5) {
                this.cosmicAlien.dialogCount = 25;
            }

            if (this.cosmicAlien.dialogCount == 11.5) {
                humanDialogS = "You'll probably be okay, just touch here."
            } else if (this.cosmicAlien.dialogCount == 12) {
                dialog = "*You refill the battery completely and the alien disappears*"
                fullBattery = true;
            } else if (this.cosmicAlien.dialogCount == 12.5) {
                humanDialogS = "It dropped the chronicle of other aliens, It'll be great to take with me to earth. *You pick it up*"
                cJournal = true;
                this.cosmicAlien.dialogCount = 15;
            }


            if (this.staticAlien.dialogCount == 5) {
                dialog = 'It has nothing else to say to you';
                if (cJournal == true) {
                    this.staticAlien.dialogCount = 6;
                }
                this.staticAlien.dialogCount = 5;
            }

            if (this.staticAlien.dialogCount == 15) {
                dialog = "There's nothing here.";
                this.staticAlien.dialogCount = 15;
            }

            if (this.staticAlien.dialogCount == 25) {
                dialog = "*It seems content and has nothing else to say*";
                this.staticAlien.dialogCount = 25;
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
            console.log("Black Hole Need", bhNeed);
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
                humanDialogL = "Hello, do you have something I can use to get out of here? I need help."
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
                //bhNeed = true;
                console.log("Black Hole Need", bhNeed);
                //this.bgSounds[1].play(); 
            } else if (this.liquidAlien.dialogCount == 4.5) {
                humanDialogL = "That sounds hard to find, is there anything else you would want?";
            } else if (this.liquidAlien.dialogCount == 5) {
                dialog = "No.";
            } else if (this.liquidAlien.dialogCount == 5.5) {
                humanDialogL = "Great. I'll try to find something.";
            }

            /*            if (this.liquidAlien.dialogCount >= 4) {
                            bhNeed = true;
                        }*/
            //this.bhNeed.firstupdate(this.liquidAlien.dialogCount <= 4);


            if (blackhole == false && this.liquidAlien.dialogCount == 6.5) {
                this.liquidAlien.dialogCount = 6;
                //there needs to be a good, bad option here. One where you just get the map, one where you freeze her for other items.
            } else if (blackhole == true) {
                this.liquidAlien.dialogCount = 7;
            }

            if (this.liquidAlien.dialogCount == 7) {
                dialog = "Did you manage to find something?";

                //user prompt

                humanDialogL = "choice [1]: heres the blackhole.choice [2]: *throw blackhole into alien and freeze her* choice [3]: heres a pet. press [4]: not yet"
                if (key == "1") {
                    this.liquidAlien.dialogCount = 8;
                } else if (key == "2") {
                    this.liquidAlien.dialogCount = 9;
                } else if (key == "3") {
                    this.liquidAlien.dialogCount = 10;

                } else if (key == "4") {
                    this.liquidAlien.dialogCount = 6;
                }
            }

            if (this.liquidAlien.dialogCount == 8) {
                dialog = "Thank you very much, here's a map.";
                unmarkedmap = true;
            } else if (this.liquidAlien.dialogCount == 9) {
                dialog = "!!!";
                //liquidAlienSheet = loadSpriteSheet('/images/marsii/npcs/liquidAlienF.png', 64, 128, 1);
                //freezes alien
                //liquid 
                if (icepick == true) {
                    this.liquidAlien.dialogCount = 9.5;
                } else {
                    this.liquidAlien.dialogCount = 10.5;
                }
            }
            if (this.liquidAlien.dialogCount == 9.5) {
                humanDialogL = "You break off pieces with key and the map";
                var frozenmap = true;
                var frozenkey = true;
            } else if (this.liquidAlien.dialogCount == 10.5) {
                humanDialogL = "I need something to break off the pieces I want"
                this.liquidAlien.dialogCount = 15;
            }

            if (this.liquidAlien.dialogCount == 10) {
                dialog = "Thank you, here's the map."
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


            text(dialog, this.liquidAlien.x - 30, this.liquidAlien.y - 145, 200, 200);
            text(humanDialogL, this.character.x, this.character.y - 40, 200, 200);
            fill(255);
            text("hit enter", this.liquidAlien.x - 30, this.liquidAlien.y + 70);

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
                deviceNeed = true;
            }

            if (baddevice == true) {
                if (this.creepAlien.dialogCount == 7.5) {
                    humanDialogCr = "Here's a device that should make you less intimidating";
                } else if (this.creepAlien.dialogCount == 8) {
                    dialog = "Ah, thank you! Let me know if there's something you need me to do.";
                    dfufilled = true;
                }
            }

            if (dfufilled == true) {
                if (frozenkey == true && frozenmap == true) {
                    if (this.creepAlien.dialogCount == 10.5) {
                        humanDialogCr = "Can you melt the ice around this map and key for me?";
                    } else if (this.creepAlien.dialogCount == 11) {
                        dialog = "Of course";
                        unfrozenkey = true;
                        unmarkedmap = true;
                    } else if (this.creepAlien.dialogCount == 11.5) {
                        humanDialogCr = "Thanks"
                        frozenkey = false;
                        frozenmap = false;
                    }

                }
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
                dialog = "Interesting. It's probably a species from around here. Some of them like to abduct others. I can probably repair it.";
            } else if (this.plantAlien.dialogCount == 3.5) {
                humanDialogP = "So, what do you want in exchange?.";
            } else if (this.plantAlien.dialogCount == 4) {
                dialog = " Non-essentials from 'your' ship, and some technology from your species?";
            } else if (this.plantAlien.dialogCount == 4.5) {
                humanDialogP = "I don't really have much of my own tech on me.";
            } else if (this.plantAlien.dialogCount == 5) {
                dialog = "I see. Well give me whatever you can spare and if you get me a piece of that anomaly up there I'll fix your ship.";
                anomalyNeed = true;
                backupneed = true;
            } else if (this.plantAlien.dialogCount == 5.5) {
                humanDialogP = " I can probably manage that.";
            } else if (this.plantAlien.dialogCount == 6) {
                dialog = "Great.";
            } else if (this.plantAlien.dialogCount == 6.5) {
                this.plantAlien.dialogCount = 7;
            }


            if (backuplog == true) {
                if (this.plantAlien.dialogCount == 10) {
                    dialog = "I see you got your tech. It's different from what I've seen. I'll enjoy studying it."
                    bfufilled = true;
                } else if (this.plantAlien.dialogCount == 10.5) {
                    backuplog = false;
                    this.plantAlien.dialogCount = 7;
                }
            }
            if (anomalyPiece == true) {
                if (this.plantAlien.dialogCount == 11) {
                    dialog = "You got the anomaly piece. It great to incorporate into future tech. Thanks."
                    afufilled = true;
                } else if (this.plantAlien.dialogCount == 11.5) {
                    anomalyPiece = false;
                    this.plantAlien.dialogCount = 7;
                }
            }

            if (this.plantAlien.dialogCount == 7) {
                dialog = "(They have nothing else to say to you right now.)"
            } else if (this.plantAlien.dialogCount == 7.5) {
                this.plantAlien.dialogCount = 7;
            }

            if (afufilled == true && bfufilled == true) {
                this.plantAlien.dialogCount = 15;
            }

            if (this.plantAlien.dialogCount == 15) {
                dialog = "Alright, I'll start fixing your ship"
                // Position needs to change to near ship.
            } else if (this.plantAlien.dialogCount == 15.5) {
                this.plantAlien.dialogCount = 17;
            }

            if (deviceNeed == true) {
                this.plantAlien.dialogCount = 21.5;
                if (this.plantAlien.dialogCount == 21.5) {
                    humanDialogP = "Do you have anything that could make someone come off as less intimidating?"
                } else if (this.plantAlien.dialogCount == 22) {
                    dialog = "Yeah, I'm working on a device to do that. It works, but it's not quite finished. I can give you a complete one later."
                } else if (this.plantAlien.dialogCount == 22.5) {
                    humanDialogP = "Can I see a prototype?"
                } else if (this.plantAlien.dialogCount == 23) {
                    dialog = "Sure, here you go."
                    baddevice = true;
                    deviceNeed = false;
                }

            }

            if (this.plantAlien.dialogCount == 17) {
                dialog = "*They're currently fixing your ship and you have nothing to say to them*"
            } else if (this.plantAlien.dialogCount == 17.5) {
                this.plantAlien.dialogCount = 17;
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
                fill('Indigo');
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
            } else if (this.cosmicAlien.dialogCount == 10.5) {
                if (bhNeed == true && secondchatC == true) {
                    this.cosmicAlien.dialogCount = 15.5;
                } else {
                    this.cosmicAlien.dialogCount = 10;
                }
            }

            if (this.cosmicAlien.dialogCount == 15.5) {
                humanDialogC = "Hey, do you know where I can get a black hole? I need one to trade for a map."
            } else if (this.cosmicAlien.dialogCount == 16) {
                dialog = "Oh! I can make those, I'll mark your map and give you one for human info."
                logneed = true;
            } else if (this.cosmicAlien.dialogCount == 16.5) {
                humanDialogC = "Ok. I should have something that should work on my ship. I'll be back."
            } else if (this.cosmicAlien.dialogCount == 17) {
                this.cosmicAlien.dialogCount = 19;
            } else if (bhNeed == true && secondchatC == false) {
                this.cosmicAlien.dialogCount = 13;
            }

            if (this.cosmicAlien.dialogCount == 21) {
                dialog = "Did you get the info?";
            } else if (this.cosmicAlien.dialogCount == 21.5) {
                if (fakelog == true || reallog == true) {
                    if (fakelog == true) {
                        "Give fake log? [1] Yes || [2] No "
                        if (key == 1) {
                            fakelog = false;
                            this.cosmicAlien.dialogCount = 27.5;
                        } else if (key == 2) {
                            this.cosmicAlien.dialogCount = 22.5;
                        }
                    } else if (reallog == true) {
                        "Give real log? [1] Yes || [2] No "
                        if (key == 1) {
                            reallog = false;
                            this.cosmicAlien.dialogCount = 27.5;
                        } else if (key == 2) {
                            this.cosmicAlien.dialogCount = 22.5;
                        }
                    }
                } else {
                    this.cosmicAlien.dialogCount = 22.5;
                }

            } else if (this.cosmicAlien.dialogCount == 22.5) {
                humanDialogC = "No, I'll be back";
            } else if (this.cosmicAlien.dialogCount == 23) {
                this.cosmicAlien.dialogCount = 19;
            }
            //  dialog = "(She has nothing more to say to you.)"
            if (this.cosmicAlien.dialogCount == 27.5) {
                humanDialog = "Yup, here you go"
            } else if (this.cosmicAlien.dialogCount == 28) {
                dialog = "Thank you very much human. I look forward to reading this. Here's a blackhole, be very careful with that.";
                blackhole = true;
                this.cosmicAlien.dialogCount = 25;
            }

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

            text(dialog, this.cosmicAlien.x + 20, this.cosmicAlien.y - 85, 200, 200);
            text(humanDialogC, this.character.x, this.character.y, 200, 200);
            fill(255);
            text("hit enter", this.cosmicAlien.x, this.cosmicAlien.y + 70);

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

            if (this.astShip.dialogCount == 0) {
                dialog = "Your Ship";
            } else if (this.astShip.dialogCount == 0.5) {
                /*
                                if (shipRepaired == true && shipUprighted == true) {
                                    if (markedmap == true && partBattery == true) {
                                        this.astShip.dialogCount = 30;
                                    }
                                } else {
                                    this.astShip.dialogCount = 1;
                                }*/
                this.astShip.dialogCount = 1;
            } else if (this.astShip.dialogCount == 1) {
                dialog = "Do you need something from your Ship?";
            } else if (this.astShip.dialogCount == 1.5) {
                humanDialogSh = " [1] Yes || [2] No ";
                if (key == "1") {
                    this.astShip.dialogCount = 10;
                } else if (key == "2") {
                    this.astShip.dialogCount = 2;
                }
            }

            if (this.astShip.dialogCount == 2) {
                dialog = "Do you need to know what else you need to take off? "
                // this.astShip.dialogCount = 0;
            } else if (this.astShip.dialogCount == 2.5) {
                humanDialogSh = " [1] Yes || [2] No ";
                if (key == "1") {
                    this.astShip.dialogCount = 5;
                } else if (key == "2") {
                    this.astShip.dialogCount = 0;
                }

            } else if (this.astShip.dialogCount == 3) {
                this.astShip.dialogCount = 0;
            }

            if (this.astShip.dialogCount == 5) {
                dialog = "You'll need certain things:";
            } else if (this.astShip.dialogCount == 5.5) {
                this.astShip.dialogCount = 6;
            } else if (this.astShip.dialogCount == 6) {
                console.log("Ship Repaired", shipRepaired);
                if (shipRepaired == false) {
                    fill('red');
                    text("You need ship repairs", this.astShip.x, this.astShip.y - 75);
                } else if (shipRepaired == true) {
                    fill('green');
                    text("You're ship has been repaired", this.astShip.x, this.astShip.y - 75);
                }
                console.log("Ship Uprighted", shipUprighted);
                if (shipUprighted == false) {
                    fill('red');
                    text("You need your ship uprighted", this.astShip.x, this.astShip.y - 50);
                } else if (shipUprighted == true) {
                    fill('green');
                    text("Your ship has been uprighted", this.astShip.x, this.astShip.y - 50);
                }
                console.log("Battery", fullBattery, partBattery);
                if (fullBattery == false || partBattery == false) {
                    fill('red');
                    text("You need a battery with energy", this.astShip.x, this.astShip.y - 25);
                } else if (fullBattery == true || partBattery == true) {
                    fill('green');
                    text("Your battery has energy", this.astShip.x, this.astShip.y - 25);
                }
                console.log("Map", markedmap);
                if (markedmap == false) {
                    fill('red');
                    text("You need an unfrozen, marked map", this.astShip.x, this.astShip.y);
                } else if (markedmap == true) {
                    fill('green');
                    text("You're map's marked.", this.astShip.x, this.astShip.y);
                    text("You're map's marked.", this.astShip.x, this.astShip.y);
                }
            }

            if (this.astShip.dialogCount == 10) {
                if (astJournalNeed = true) {
                    this.astShip.dialogCount = 11;
                } else if (logneed = false) {
                    this.astShip.dialogCount = 12;
                }
            }


            if (this.astShip.dialogCount == 11) {
                astJournal = true;
                dialog = "You recieved your journal."

                astJournalNeed = false;
            } else if (this.astShip.dialogCount == 11.5) {
                this.astShip.dialogCount == 10
            }

            if (this.astShip.dialogCount == 12) {
                dialog = " [1] Take real log (your only actual record of your travels) || [2] Take fake log (with inaccuarate information, usually used to mislead enemies) ";
                if (key == "1") {
                    this.astShip.dialogCount = 12.5;
                } else if (key == "2") {
                    this.astShip.dialogCount = 13.5;
                }
            }
            if (this.astShip.dialogCount == 12.5) {
                humanDialogSh = " *Takes the real log* "
                reallog = true;
                logneed = false;
                this.astShip.dialogCount = 1;
            }
            if (this.astShip.dialogCount == 13.5) {
                humanDialogSh = " *Takes the fake log* "
                fakelog = true;
                logneed = false;
                this.astShip.dialogCount = 1;
            }



            if (this.astShip.dialogCount == 30) {
                dialog = "You have everything you need to take off"
            }

            text(dialog, this.astShip.x, this.astShip.y - 100, 200, 200);
            text(humanDialogSh, this.character.x, this.character.y - 20, 200, 300);
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
        this.shipTrail.display();
        //this.shipTrail.collide(this.character);

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
                if (key == "1") {
                    this.alienShip.dialogCount = 5;
                } else if (key == "2") {
                    this.alienShip.dialogCount = 2;
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
                console.log("Map", markedmap);
                if (markedmap == false) {
                    fill('red');
                    text("You need an unfrozen, marked map", this.alienShip.x, this.alienShip.y - 75);
                } else if (markedmap == true) {
                    fill('green');
                    text("You have a marked map", this.alienShip.x, this.alienShip.y - 75);
                }
                console.log("Key", unfrozenkey);
                if (unfrozenkey == false) {
                    fill('red');
                    text("You need an unfrozen key", this.alienShip.x, this.alienShip.y - 50);
                } else if (unfrozenkey == true) {
                    fill('green');
                    text("You have an unfrozen key", this.alienShip.x, this.alienShip.y - 50);
                }
                console.log("Battery", partBattery, fullBattery);
                if (fullBattery == false || partBattery == false) {
                    fill('red');
                    text("You need a battery with energy", this.alienShip.x, this.alienShip.y - 25);
                } else if (fullBattery == true || partBattery == true) {
                    fill('green');
                    text("You have a battery with energy", this.alienShip.x, this.alienShip.y - 25);
                }
                console.log("Ship free", shipUnattended);
                if (shipUnattended == false) {
                    fill('red');
                    text("You need to be alone with the ship.", this.alienShip.x, this.alienShip.y);
                } else if (shipUnattended == true) {
                    fill('green');
                    text("You're alone with the ship.", this.alienShip.x, this.alienShip.y);
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

        this.treeOverlay.display();
        this.caveOverlay.display();
        this.pond.display();
        this.watertree.display();
        this.lightning.display();
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
    
    //PARALLAX
    
    "scenery": {
        "background": {
            "img": "images/marsii/skyback.png",
            "width": 4830,
            "height": 3150,
            "frames": 1,
            "positions": [
                {
                    "x": -900,
                    "y": 425
                }
			]
        },
        "stars1": {
            "img": "images/marsii/stars1.png",
            "width": 4830,
            "height": 3150,
            "frames": 1,
            "positions": [
                {
                    "x": -900,
                    "y": 425
                }
			],
            "speed": 0.2
        },
        "stars2": {
            "img": "images/marsii/stars2.png",
            "width": 4830,
            "height": 3150,
            "frames": 1,
            "positions": [
                {
                    "x": -900,
                    "y": 425
                }
			],
            "speed": -0.2
        },
        "foreground": {
            "img": "images/marsii/testmapnosky.png",
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
//addEventListener x(_x) {
// this.sprite.position.x = _x;
//}


Choices
ex
var map = false;
 
 Choices.
 var unmarkedmap = false;
 this.unmarkedmap = new need(this.liquidAlien.dialogCount == 8, unmarkedmap, true, false )
 
 
 this.bhNeed = new need(this.liquidAlien.dialogCount == 4, this.cosmicAlien.dialogCount == 25, bhNeed, true, false)
 
 
  if (this.liquidAlien.dialogCount == 8) {
                dialog = "Thank you very much, here's a map.";
                unmarkedmap = true;
 
 
 this.creepAlien = new NPC(-1800, 1600, creepAlienSheet, "(Need to upright ship");
 class NPC extends Scenery {
	constructor(x, y, spriteSheet, dialog) {
		super(x, y, spriteSheet);
		this.dialog = dialog;
	}

	display() {
		super.display();
	}

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

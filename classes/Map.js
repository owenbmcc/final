class Map {
	constructor(src) {
		this.sprites = { scenery: {}, characters: {} };
		this.src = src;
		
	}

	preload() {
		var _this = this;
		fetch(this.src)
			.then(function(response) {
				return response.json();
			}).then(function(data) {
				var scenery = data.scenery;
				for (var key in scenery) {
					var img = loadImage(scenery[key].img);
					_this.sprites.scenery[key] = [];
					for (var i = 0; i < scenery[key].positions.length; i++) {
						var position = scenery[key].positions[i];
						_this.sprites.scenery[key].push(new Scenery(position.x, position.y, img));
					}
				}

				var characters = data.characters;
				for (var key in characters) {
					var character = characters[key];
					var img = loadImage(character.img);
					console.log(img);
					_this.sprites.characters[key] = new NPC(character.x, character.y, img, character.dialog);
				}
			});
	}
	
	setup() {
		this.x = width/2;
		this.y = height/2;
		this.speedX = 0;
		this.speedY = 0;

		for (var key in this.sprites.scenery) {
			var list = this.sprites.scenery[key];
			for (var i = 0; i < list.length; i++) {
				list[i].setup();
			}
		}

		for (var key in this.sprites.characters) {
			this.sprites.characters[key].setup();
		}
	}
	
	collide(other) {
		for (var key in this.sprites.scenery) {
			var list = this.sprites.scenery[key];
			for (var i = 0; i < list.length; i++) {
				var d = dist(list[i].x + this.x, list[i].y + this.y, other.x, other.y);
				var s = list[i].size + other.size;
				if (d < s/2) {
					// console.log('collide');
				}
			}
		}

		for (var key in this.sprites.characters) {
			var character = this.sprites.characters[key];
			var d = dist(this.x + character.x, this.y + character.y, other.x, other.y);
			var s = character.size + other.size;
			character.displayDialog = (d < s/2);
		}
	}

	draw() {
		for (var key in this.sprites.scenery) {
			var list = this.sprites.scenery[key];
			for (var i = 0; i < list.length; i++) {
				list[i].display(this.x, this.y);
			}
		}

		for (var key in this.sprites.characters) {
			this.sprites.characters[key].display(this.x, this.y);
		}
	}
	
	update() {
		this.x += this.speedX;
		this.y += this.speedY;
	}
	
	move() {
		if (keyIsDown(RIGHT_ARROW)) {
			this.speedX = -5;
		} else if (keyIsDown(LEFT_ARROW)) {
			this.speedX = 5;
		} else {
			this.speedX = 0;
		}
		
		if (keyIsDown(DOWN_ARROW)) {
			this.speedY = -5;
		} else if (keyIsDown(UP_ARROW)) {
			this.speedY = 5;	
		} else {
			this.speedY = 0;	
		}
	}
	
	
}
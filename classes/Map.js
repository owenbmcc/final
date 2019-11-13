class Map {
	constructor(src) {
		this.sprites = { scenery: [] };
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
					for (var i = 0; i < scenery[key].positions.length; i++) {
						var position = scenery[key].positions[i];
						var sprite = new Scenery(position.x, position.y, img);
						console.log(_this.sprites);
						this.sprites.scenery[key] = [];
						this.sprites.scenery[key].push(sprite);
					}
				}
			});
	}

	setup() {

	}

	draw() {
		for (var key in sprites) {
			var list = sprites[key];
			for (var i = 0; i < list.length; i++) {
				list[i].display();
			}
		}
	}
}
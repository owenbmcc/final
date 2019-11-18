class marsii extends Scene {

    preload() {
        this.character = new Character();
        this.character.img = loadImage('images/astronaut.png');
    }

    draw() {

        background('DodgerBlue');
        textSize(100);
        fill('black');
        textAlign(CENTER, CENTER);
        text("Naomi's Scene", width / 2, height / 2);
        text("Space game", width / 2, height / 2 + 100);


        this.character.update();
        this.character.move();
        this.character.display();
    }
}

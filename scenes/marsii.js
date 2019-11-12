/*function setup() {
    createCanvas(800, 800);
    //background('black');
    //alien(600, 200, 150, 0, 0);
    gren(250,200,150);
    //semi-working but flawed
    //gren(250, 200, 150);
    textSize(20)
    text(100,10, "Just something to have here")

}
*/
/*
function gren(x) {
//function gren(x, y, size)
//need to make body change properly based on size
    fill(50, 186, 78);
    
    y = x/1.25
    size = y*.75

    ellipse(x, y, size); //face
    fill('black');
    stroke('white');
    //rotate();
    ellipse(x - size/5, y, size/5, size/2.5); //left eye
    ellipse(x + size/5, y, size/5, size/2.5); //right eye
    noStroke();
    fill(50, 186, 78);
    triangle(x-x/5, y*1.875, x, y, x+x/5, y*1.875); //body
    rect(x - 8, y/2.5, size/10, size/3); //antenna
    ellipse(x, y/2.5, size/3); //antenna top

    rect(x/1.15, y*1.8, size/10, size/3); //left leg
    rect(x/.95, y*1.8, size/10, size/3); //right leg
}
*/

function marsii() {
    
    background('midnight');
	textSize(100);
	textAlign(CENTER, CENTER);
	text("Naomi's Scene", width/2, height/2);
	text("Space game", width/2, height/2 + 100);
    textSize(20);
    text("yay aliens", width/2, height/2 + 300);
    
    fill('plum')
    noStroke();
    ellipse(250, 200, 150); //face
    fill('black');
    stroke('white');
    //rotate();
    ellipse(50, 200, 50, 100); //left eye
    ellipse(50, 200, 50, 100); //right eye
    noStroke();
    fill('plum');
    triangle(200, 375, 250, 200, 250, 375); //body
    strokeWeight(10);
    stroke('plum');
    line(250, 80, 250, 200);
    noStroke();
    ellipse(250, 80, 50); //antenna top

    rect(220, 360, 15, 50); //left leg
    rect(260, 360, 15, 50); //right leg
}




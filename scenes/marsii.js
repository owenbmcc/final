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

function marsii(x, y, size) {
    fill('plum')
    noStroke();
    ellipse(x, y, size); //face
    fill('black');
    stroke('white');
    //rotate();
    ellipse(x - size/5, y, size/5, size/2.5); //left eye
    ellipse(x + size/5, y, size/5, size/2.5); //right eye
    noStroke();
    fill('plum');
    triangle(x-x/5, y*1.875, x, y, x+x/5, y*1.875); //body
    strokeWeight(size/15);
    stroke('plum');
    line(x, y/2.5, x, y);
    //rect(x - 8, y/2.5, size/10, size/3); //antenna
    noStroke();
    ellipse(x, y/2.5, size/3); //antenna top

    rect(x/1.15, y*1.8, size/10, size/3); //left leg
    rect(x/.95, y*1.8, size/10, size/3); //right leg
}




var asteroids = [];
var ships = [];
var canvassize = [];
var bullets = [];
var explosions = [];
var points = 0;
canvassize.x = 500;
canvassize.y = 500;
paused = false;

function startGame() {
    myGameArea.start();
}

var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function() {
        canvassize.x = window.innerWidth;
        canvassize.y = window.innerHeight;
        this.canvas.width = canvassize.x;
        this.canvas.height = canvassize.y;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        updateGameArea();

        for (var i = 0; i < (canvassize.y * canvassize.x) / 50000; i++) {
            asteroids[i] = new Asteroid;
        }
        ships[0] = new Ship;
    },
    clear: function() {
        this.context.fillStyle = 'rgba(0, 0, 0, 0.4)';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        //this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function updateGameArea() {
    if (!paused) {
        requestAnimationFrame(updateGameArea);
    } else {
        return false;
    }
    myGameArea.clear();
    for (var len = asteroids.length, i = (len - 1); i >= 0; i--) {
        asteroids[i].draw();
        for (var len = bullets.length, j = (len - 1); j >= 0; j--) {
            for (var k = 0; k < bullets[j].bulletspeed / 2; k++) {
                var POS = [];
                POS.x = bullets[j].pos.x - bullets[j].speed.x / (bullets[j].bulletspeed / 2) * k;
                POS.y = bullets[j].pos.y - bullets[j].speed.y / (bullets[j].bulletspeed / 2) * k;
                //console.log(i);
                if (cn_PnPoly(POS, asteroids[i].poly) == 1) {
                    if (asteroids[i].r > 16) {
                        asteroids.push(new Asteroid(asteroids[i].r / 2, asteroids[i].pos));
                        asteroids.push(new Asteroid(asteroids[i].r / 2, asteroids[i].pos));
                    }
                    var snd1 = new Audio();
                    var src1 = document.createElement("source");
                    src1.type = "audio/mpeg";
                    src1.src = "assets/SFX/RockHit.mp3";
                    snd1.appendChild(src1);
                    snd1.play();
                    points = points + Math.round(1 / asteroids[i].r * 200);
                    console.clear();
                    console.log("Score: " + points);
                    explosions.push(new Explosion(asteroids[i].pos));
                    asteroids.splice(i, 1);
                    k = bullets[j].bulletspeed;
                    j = 0;
                    bullets[j].age = 10000;

                }
            }
        }
    }
    if (asteroids.length < ((canvassize.y * canvassize.x) / 50000)) {
        asteroids.push(new Asteroid);
    }
    for (var i = 0, len = ships.length; i < len; i++) {
        ships[i].draw();
        for (var k = 0; k < ships[i].poly.length; k++) {
            for (var lena = asteroids.length, j = (lena - 1); j >= 0; j--) {
                if (cn_PnPoly(ships[i].poly[k], asteroids[j].poly) == 1) {
                    var snd2 = new Audio();
                    var src2 = document.createElement("source");
                    src2.type = "audio/mpeg";
                    src2.src = "assets/SFX/Crash.mp3";
                    snd2.appendChild(src2);
                    snd2.play();
                    console.clear();
                    console.log("Score: " + points);
                    console.log("You were hit by a massive space rock!");
                    paused = true;
                    var ctx = myGameArea.context;
                    ctx.font = "30px Arial";
                    ctx.textAlign = "center";
                    ctx.fillStyle = '#ffffff';
                    ctx.fillText("Refresh to replay", canvassize.x / 2, canvassize.y / 2);
                }
            }
        }
    }
    for (len = bullets.length, i = (len - 1); i >= 0; i--) {
        bullets[i].draw();
        if (bullets[i].age > (0.7 * Math.pow(canvassize.x * canvassize.y, 0.5) / bullets[i].bulletspeed)) {
            bullets.splice(i, 1);
        }
    }
    for (len = explosions.length, i = (len - 1); i >= 0; i--) {
        explosions[i].draw();
        if (explosions[i].age > 10) {
            explosions.splice(i, 1);
        }
    }

    //Score Board
    var ctx = myGameArea.context;
    ctx.shadowBlur = 0;
    ctx.font = "30px Arial";
    ctx.textAlign = "left";
    ctx.fillStyle = '#aaaaaa';
    ctx.fillText("Score: " + points, 10, 50);

    var ctx = myGameArea.context;
    ctx.font = "30px Arial";
    ctx.textAlign = "left";
    ctx.fillStyle = '#aaaaaa';
    ctx.fillText("Score: " + points, 10, 50);
}

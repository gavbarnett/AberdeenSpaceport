function Asteroid(r, pos, heading) {
    //r = radius (size)
    //pos = [x,y] starting coordinate
    //heading = [x,y] direction & speed
    if (r) {
        this.r = r;
    } else {
        var r_init = 40;
        this.r = r_init + Math.random() * r_init * 0.5;
    }
    this.pos = [];
    if (pos) {
        this.pos.x = pos.x;
        this.pos.y = pos.y;
    } else {
        if (Math.random() > 0.5) {
            this.pos.x = canvassize.x * Math.round(Math.random());
            this.pos.y = Math.random() * canvassize.y;
        } else {
            this.pos.x = Math.random() * canvassize.x;
            this.pos.y = canvassize.y * Math.round(Math.random());
        }
    }
    this.shape = [];
    var points = 4 + Math.random() * 6;
    for (var i = 0; i < points; i++) {
        this.shape[i] = []; //x,y
        this.shape[i].ang = 2 * Math.PI / points * i - (2 * Math.PI / points * 0.8) + Math.random() * (2 * Math.PI / points * 0.8);
        this.shape[i].len = this.r * 0.2 + Math.random() * this.r;
    }
    this.poly = [];
    this.heading = [];
    this.speed = [];
    this.speed.x = 0;
    this.speed.y = 0;
    if (heading) {
        this.heading.ang = heading.ang;
        this.heading.acceleration = heading.acceleration;
        this.heading.rotation = 0;
        this.speed.x = Math.random() * init_speed * Math.cos(this.heading.ang);
        this.speed.y = Math.random() * init_speed * Math.sin(this.heading.ang);
    } else {
        var init_speed = 3;
        this.heading.ang = Math.random() * Math.PI * 2;
        this.heading.acceleration = 0;
        this.heading.rotation = Math.PI / 100 * Math.random();
        this.speed.x = Math.random() * init_speed * Math.cos(this.heading.ang);
        this.speed.y = Math.random() * init_speed * Math.sin(this.heading.ang);
    }

    this.speedupdate = function() {
        this.heading.ang += this.heading.rotation;
        var speedlimit = 10;
        this.speed.x += this.heading.acceleration * Math.cos(this.heading.ang);
        if (this.speed.x > speedlimit) {
            this.speed.x = speedlimit
        };
        if (this.speed.x < -speedlimit) {
            this.speed.x = -speedlimit
        };
        this.speed.y += this.heading.acceleration * Math.sin(this.heading.ang);
        if (this.speed.y > speedlimit) {
            this.speed.y = speedlimit
        };
        if (this.speed.y < -speedlimit) {
            this.speed.y = -speedlimit
        };
        this.speed.x *= 0.999;
        this.speed.y *= 0.999;
        this.heading.rotation *= 0.999;
    }
    this.update = function() {
        this.speedupdate();
        this.pos.x = this.pos.x + this.speed.x;
        this.pos.y = this.pos.y + this.speed.y;
        if (this.pos.x > (canvassize.x + this.r)) {
            this.pos.x = 0 - this.r;
        }
        if (this.pos.x < (0 - this.r)) {
            this.pos.x = canvassize.x + this.r;
        }
        if (this.pos.y > (canvassize.y + this.r)) {
            this.pos.y = 0 - this.r;
        }
        if (this.pos.y < (0 - this.r)) {
            this.pos.y = canvassize.y + this.r;
        }
    }
    this.hit = function() {
        for (len = bullets.length, j = (len - 1); j >= 0; j--) {
            if (cn_PnPoly(bullets[j].pos, asteroids[i].poly) == 1) {
                asteroids.splice(i, 1);
                bullets[j].age = 100;
            }
        }
    }
    this.draw = function() {
        this.update();
        var ctx = myGameArea.context;
        ctx.beginPath();
        var XY = xy(this.shape[0].ang, this.shape[0].len, this.heading.ang);
        this.poly[0] = [];
        this.poly[0].x = this.pos.x + XY.x;
        this.poly[0].y = this.pos.y + XY.y;
        this.poly[this.shape.length] = [];
        this.poly[this.shape.length].x = this.pos.x + XY.x;
        this.poly[this.shape.length].y = this.pos.y + XY.y;
        ctx.moveTo(this.poly[0].x, this.poly[0].y);
        //ctx.arc(this.pos.x, this.pos.y, this.r, 0, 2*Math.PI, false);
        for (var i = 1; i < this.shape.length; i++) {
            XY = xy(this.shape[i].ang, this.shape[i].len, this.heading.ang);
            this.poly[i] = [];
            this.poly[i].x = this.pos.x + XY.x;
            this.poly[i].y = this.pos.y + XY.y;
            ctx.lineTo(this.poly[i].x, this.poly[i].y);
        }
        ctx.closePath();
        ctx.strokeStyle = '#bbbbbb';
        ctx.lineWidth = 1.5;
        ctx.shadowColor = '#dddddd';
        ctx.shadowBlur = 10;
        ctx.stroke();
    }
}

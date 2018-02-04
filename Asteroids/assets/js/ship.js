function Ship(pos, heading) {
    //r = radius (size)
    //pos = [x,y] starting coordinate
    //heading = [x,y] direction & speed
    this.pos = [];
    if (pos) {
        this.pos.x = pos.x;
        this.pos.y = pos.y;
    } else {
        this.pos.x = canvassize.x / 2;
        this.pos.y = canvassize.y / 2;
    }
    var shipsize = 10;
    this.shape = [];
    this.shape[0] = [];
    this.shape[0].ang = 0;
    this.shape[0].len = shipsize;
    this.shape[1] = [];
    this.shape[1].ang = 2 * Math.PI / 2.5;
    this.shape[1].len = shipsize;
    this.shape[2] = [];
    this.shape[2].ang = 2 * Math.PI / 2;
    this.shape[2].len = shipsize * 0.6;
    this.shape[3] = [];
    this.shape[3].ang = -2 * Math.PI / 2.5;
    this.shape[3].len = shipsize;
    this.poly = [];
    this.heading = [];
    if (heading) {
        this.heading.ang = heading.ang;
        this.heading.acceleration = heading.acceleration;
        this.heading.rotation = 0;
    } else {
        var init_speed = 2;
        this.heading.ang = -Math.PI / 2;
        this.heading.acceleration = 0;
        this.heading.rotation = 0;
    }
    this.speed = [];
    this.speed.x = 0;
    this.speed.y = 0;
    this.speedupdate = function() {
        this.heading.ang += this.heading.rotation;
        var speedlimit = 10;
        this.speed.x += this.heading.acceleration * Math.cos(this.heading.ang);
        if (this.speed.x > speedlimit) {
            this.speed.x = speedlimit;
        };
        if (this.speed.x < -speedlimit) {
            this.speed.x = -speedlimit;
        };
        this.speed.y += this.heading.acceleration * Math.sin(this.heading.ang);
        if (this.speed.y > speedlimit) {
            this.speed.y = speedlimit;
        };
        if (this.speed.y < -speedlimit) {
            this.speed.y = -speedlimit;
        };
        this.speed.x *= 0.999;
        this.speed.y *= 0.999;
        this.heading.rotation *= 0.999;
    }

    this.update = function() {
        this.speedupdate();
        this.pos.x = this.pos.x + this.speed.x;
        this.pos.y = this.pos.y + this.speed.y;
        if (this.pos.x > canvassize.x) {
            this.pos.x = 0;
        }
        if (this.pos.x < 0) {
            this.pos.x = canvassize.x;
        }
        if (this.pos.y > canvassize.y) {
            this.pos.y = 0;
        }
        if (this.pos.y < 0) {
            this.pos.y = canvassize.y;
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
        ctx.fillStyle = '#000000';
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.shadowColor = '#ffffff';
        ctx.shadowBlur = 5;
        ctx.fill();
        ctx.stroke();
        if (this.heading.acceleration > 0.01) {
            ctx.beginPath();
            XY = xy(this.shape[2].ang, this.shape[2].len, this.heading.ang);
            ctx.moveTo(this.pos.x + XY.x, this.pos.y + XY.y);
            XY = xy(this.shape[2].ang, this.shape[2].len * 2, this.heading.ang);
            ctx.lineTo(this.pos.x + XY.x, this.pos.y + XY.y);
            ctx.closePath();
        }
        ctx.fillStyle = '#000000';
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.shadowColor = '#ffffff';
        ctx.shadowBlur = 0;
        ctx.stroke();
    }
}
var xy = function(angle, length, heading) {
    var pos = [];
    if (heading) {
        pos.x = Math.cos(angle + heading) * length;
        pos.y = Math.sin(angle + heading) * length
    } else {
        pos.x = Math.cos(angle) * length;
        pos.y = Math.sin(angle) * length;
    }
    return pos;
}

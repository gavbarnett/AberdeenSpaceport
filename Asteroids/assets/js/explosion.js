function Explosion(pos) {
    //r = radius (size)
    //pos = [x,y] starting coordinate
    //heading = [x,y] direction & speed
    this.pos = [];
    this.age = 0;
    if (pos) {
        this.pos.x = pos.x;
        this.pos.y = pos.y;
    }
    this.dust = [];
    for (var i = 0; i < 20; i++) {
        this.dust[i] = [];
        this.dust[i].x = this.pos.x;
        this.dust[i].y = this.pos.y;
        this.dust[i].speed = Math.random() * 7;
        this.dust[i].ang = Math.random() * 2 * Math.PI;
    }
    this.update = function() {
        for (var i = 0; i < this.dust.length; i++) {
            this.dust[i].x += this.dust[i].speed * Math.cos(this.dust[i].ang);
            this.dust[i].y += this.dust[i].speed * Math.sin(this.dust[i].ang);
        }
        this.age += 1;

    }
    this.draw = function() {
        this.update();
        var ctx = myGameArea.context;
        for (var i = 0; i < this.dust.length; i++) {
            ctx.beginPath();
            ctx.arc(this.dust[i].x, this.dust[i].y, 1, 0, 2 * Math.PI, false)
            ctx.strokeStyle = '#bbbbbb';
            ctx.lineWidth = 1;
            ctx.shadowColor = '#ffffff';
            ctx.shadowBlur = 40;
            ctx.stroke();
        }
    }
}

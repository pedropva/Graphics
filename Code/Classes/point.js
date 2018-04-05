function Point(x,y,w,h,color) {
  this.x = x || 400;
  this.y = y || 300;
  this.w = w || 5;
  this.h = h || 5;
  this.color = color || '#AAAAAA';
}

// Draws this shape to a given context
Point.prototype.draw = function(ctx) {
  ctx.fillStyle = this.color;
  ctx.fillRect(this.x, this.y, this.w, this.h);
}
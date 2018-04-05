function Text(x,y,text,color,font) {
  this.x = x || 400;
  this.y = y || 300;
  this.text = text || "hello world";
  this.font = font || "30px Arial";
  this.color = color || '#AAAAAA';
}

// Draws this shape to a given context
Text.prototype.draw = function(ctx) {
	ctx.fillStyle = this.color;
	ctx.font = this.font;
	ctx.fillText(this.text, this.x, this.y);
}

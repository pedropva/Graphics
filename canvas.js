
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var file ="file:///C:/your/path/to/file.txt";
var grd; //holds gradient data
/*FONTS:
https://www.w3schools.com/tags/ref_canvas.asp
https://stackoverflow.com/questions/14446447/how-to-read-a-local-text-file
https://www.w3schools.com/html/html5_canvas.asp
*/
function drawPoint(x,y){
	ctx.moveTo(x, y);
	ctx.lineTo(x, y);
	ctx.stroke();
}

function drawLine(Sx,Sy,Ex,Ey){//starting x, starting y, ending x, ending y
	ctx.moveTo(Sx, Sy);
	ctx.lineTo(Ex, Ey);
	ctx.stroke();	
}
function drawPoligon(){
	//draw multiple lines
}
function drawBezier(Sx,Sy,C1x,C1y,C2x,C2y,Ex,Ey){//C1 and C2: Control point 1 and 2
	ctx.beginPath();
	ctx.moveTo(Sx,Sy);
	ctx.bezierCurveTo(C1x,C1y,C2x,C2y,Ex,Ey);
	ctx.stroke();
}

function drawArc(Cx,Cy,Sa,Ea){//Sa and Ea: starting and Ending angle, C: center
	ctx.beginPath();
	ctx.arc(Cx,Cy,Sa,Ea);//Example: (100,75,50,0*Math.PI,1.5*Math.PI
	ctx.stroke();
}
function drawText(text,x,y){
	ctx.font = "30px Arial";
	ctx.fillText("Hello World", 10, 50);
}
function drawLinearGradient(Sx,Sy,Ex,Ey,colors){//implement colors vector
	// Create gradient
	grd = ctx.createLinearGradient(Sx,Sy,Ex,Ey);
	grd.addColorStop(0, "red");
	grd.addColorStop(1, "white");
}
function drawCircularGradient(C0x,C0y,R0,C1x,C1y,R1){
	// Create gradient
	var grd = ctx.createRadialGradient(C0x,C0y,R0,C1x,C1y,R1);
	grd.addColorStop(0, "red");
	grd.addColorStop(1, "white");
}
function drawImage(imgId,x,y){
	var img = document.getElementById(imgId);
	ctx.drawImage(img, x, y);
}
function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                drawFromFile(allText);
            }
        }
    }
    rawFile.send(null);
}
function drawFromFile(data){
	alert("foi:"+data);
}
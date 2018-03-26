
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var file ="./draw.txt";
var grd; //holds gradient data
/*FONTS:
https://www.w3schools.com/tags/ref_canvas.asp
https://stackoverflow.com/questions/14446447/how-to-read-a-local-text-file
https://www.w3schools.com/html/html5_canvas.asp
*/
readTextFile(file);
function drawPoint(x,y){
	ctx.moveTo(x, y);
	ctx.fillRect(x,y,5,5);
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

function drawArc(Cx,Cy,R,Sa,Ea){//Sa and Ea: starting and Ending angle, C: center R:Radius
	ctx.beginPath();
	ctx.arc(Cx,Cy,R,Sa,Ea);//Example: (100,75,50,0*Math.PI,1.5*Math.PI
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
	var curLine="";
	var nLine=0;
	data = data.toLowerCase();
	var dataSize = parseInt(data.length);
	curMode = "none";
	while(nLine< dataSize ){//while we're not in the end of file 
		curLine = "";
		while(data[nLine]!='\n' && nLine < dataSize ){//read each line
			curLine += data[nLine];
			nLine++;
		}
		nLine++;//go to next line
		//now we have the entire line ready to process
		if(curLine.indexOf("point") !== -1){
			curMode = "point";
		}else if(curLine.indexOf("line") !== -1){
			curMode = "line";
		}else if(curLine.indexOf("polygon") !== -1){
			curMode = "polygon";
		}else if(curLine.indexOf("arc") !== -1){
			curMode = "arc";
		}else if(curLine.indexOf("bezier") !== -1){
			curMode = "bezier";
		}else if(curLine.indexOf("text") !== -1){
			curMode = "text";
		}else{//if its not a mode-changing  line then its a element line
			switch(curMode){
				case "point":
					curLine = curLine.split(",");
					drawPoint(curLine[0],curLine[1]);
					break;
				case "line":
					curLine = curLine.split(",");
					drawLine(curLine[0],curLine[1],curLine[2],curLine[3]);
					break;
				case "polygon":
					curLine = curLine.split(",");
					for (var i = 0; i <= parseInt(curLine.length)/2; i=i+2) {
						if(i==0){
							drawLine(curLine[i],curLine[i+1],curLine[i+2],curLine[i+3]);
						}else{
							drawLine(curLine[i],curLine[i+1],curLine[i+2],curLine[i+3]);
						}
					}
					drawLine(curLine[i],curLine[i+1],curLine[0],curLine[1]);
					break;
				case "arc":
					
					break;
				case "bezier":
					
					break;
				case "text":
					
					break;
				default:
					//?
			}
		}
	}	
}

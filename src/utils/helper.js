/****绘制自动换行的字符串****/
export function drawText(context,t,x,y,w){
	
	var chr = t.split(" ");
	var temp = "";				
	var row = [];
	
	context.font = "15px Arial";
	context.fillStyle = "#fff";
	context.textBaseline = "middle";
	
	for(var a = 0; a < chr.length; a++){
		if( context.measureText(temp).width >= w ){
			row.push(temp);
			temp = "";
		}
		temp += chr[a];
	}
	
	row.push(temp);
	
	for(var b = 0; b < row.length; b++){
		context.fillText(row[b],x,y+(b+1)*25);
	}
}

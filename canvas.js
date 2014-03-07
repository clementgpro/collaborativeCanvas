var tabCanvas = [];
var tabCtx = [];

// Numero permettant d'identifier l'utilisateur.
var idUtilisateur = 0;

function createNewCanvas(id){
	canvas = document.createElement('canvas');
	canvas.id = "canvas" + id;
	canvas.style.border = '2px solid black';
	canvas.height = '300';
	canvas.width = '1000';
	canvas.style.position = 'absolute';
	canvas.style.left = '0px';
	canvas.style.top = '0px';
	canvas.style.zIndex = '-1';

	ctx = canvas.getContext("2d");
	ctx.lineWidth = pencil.size;
	ctx.lineCap = pencil.type;
	ctx.strokeStyle = pencil.color;

	// sauvegarde dans le tableau
	tabCanvas[id] = canvas;
	tabCtx[id] = ctx;
	document.addEventListener('mousedown', send);
  	document.addEventListener('mousemove', send);
  	document.addEventListener('mouseup', send);
	// ajout dans la page
	document.getElementById('zoneCanvas').appendChild(canvas);
}

function init() {
	createNewCanvas(idUtilisateur);
}

function send(event) {
	var donnees = { 
		idCanvas: idUtilisateur,
		x: event.pageX, 
		y: event.pageY,
		evenement: event.type,
		type: pencil.type,
		color: pencil.color
	};
	ws.send(JSON.stringify(donnees));
}

function update(data){
	
	if(data.type == "id"){
		idUtilisateur = data.val;
		init();
	}else{
		// dessiner sur le bon canvas
		if(tabCtx[data.idCanvas] == null){
			createNewCanvas(data.idCanvas);
		}
		pencil.setType(data.type);
		pencil.setColor(data.color);
		pencil.x = data.x;
		pencil.y = data.y;
		if(data.evenement == 'mousemove'){
			pencil.mousemove();	
		}else if(data.evenement == 'mousedown'){
			pencil.mousedown();
		}else if(data.evenement == 'mouseup'){
			pencil.end();
		}		
	}
}

function clearAll(){
	tabCtx[idUtilisateur].save();
	tabCtx[idUtilisateur].setTransform(1, 0, 0, 1, 0, 0);
	tabCtx[idUtilisateur].clearRect(0, 0, canvas.width, canvas.height);
	tabCtx[idUtilisateur].restore();
}

// Setup WebSockets
var url = 'ws:' + document.URL.split(':')[1] + ':8080';
var ws = new WebSocket(url);
ws.onopen = function() { 
	console.log('CONNECTED');
};
ws.onclose = function() { console.log('DISCONNECTED'); };
ws.onmessage = function(event) {
	var data = JSON.parse(event.data);
	update(data);
};
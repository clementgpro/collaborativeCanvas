var dotPencil = {
	draw : function(){
		tabCtx[idUtilisateur].lineTo(pencil.x,pencil.y); 
		tabCtx[idUtilisateur].stroke();
	},

	end: function(event){
		pencil.active = false;
	}
}

var linePencil = {
	draw : function(event){
		// pencil.updatePosition(event);
	},

	end: function(event){
		tabCtx[idUtilisateur].lineTo(pencil.x,pencil.y); 
		tabCtx[idUtilisateur].stroke();
		pencil.active = false;
	}
}

/**
	Classe fille.
**/
var pencil = {
	// instance de classe sélectionnée
	__proto__ : dotPencil,
	x: 0,
	y: 0,
	active : false,
	size : 10,
	color : 'yellow',
	type : 'dot',

	// AbstractPencil.prototype.draw = function(){...};
	updatePosition : function(event) {
		pencil.x = event.pageX;
		pencil.y = event.pageY;
	},

	/** Fonction permettant de changer de couleur. */
	setColor : function(color){
		if(color == null){
			// changemet via input
			pencil.color = document.getElementById("iptColor").value;
		}else{
			// changement via send
			pencil.color = color;
		}
		tabCtx[idUtilisateur].strokeStyle = pencil.color;
	},

	setType : function(type){
		if(type == 'dot'){
			pencil.type = 'dot';
			pencil.__proto__ = dotPencil;
		}else if(type == 'line'){
			pencil.type = 'line';
			pencil.__proto__ = linePencil;
			pencil.active = true;
		}
		// tabCtx[idUtilisateur].lineCap = linePencil;
	},

	mousemove : function(event){
		if(pencil.active){
			pencil.draw(event);
		}
	},

	mousedown : function(event) {
	  // pointeur de la souris par defaut
	  document.body.style.cursor = "default";
	  // pencil.updatePosition(event);
	  tabCtx[idUtilisateur].beginPath();
	  tabCtx[idUtilisateur].moveTo(pencil.x, pencil.y);
	  pencil.active = true;
	},

	mouseup : function (event){
		pencil.end(event);
	}
}
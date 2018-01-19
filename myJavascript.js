var g = {};

function clearPatterns(){

	for (cntr = 0; cntr < g.gameBoardPatterns.length; cntr++) {
		g.gameBoardPatterns[cntr].src = g.blankImg;
	}
}

function changeBackgroundImg(){
	g.backgroundCntr++;
	
	if(g.backgroundCntr == g.backgrounds.length)
	{
		g.backgroundCntr = 0;
	}
	
	g.gameBoardBackground.src = g.backgrounds[g.backgroundCntr];
}

function checkMatch(){
	var element1 = g.tempArray[0];
	var element2 = g.tempArray[1];
	
	//MATCH
	if(g.gameBoardPatterns[element1].src == g.gameBoardPatterns[element2].src){
		g.gameBoardPatterns[element1].style.visibility = "hidden";
		g.gameBoardPatterns[element2].style.visibility = "hidden";
		g.matchesFound++;
		
		if(g.matchesFound == 8){
			alert("Congratulations, you won!");
		}
	}
	//NO MATCH
	else
	{
		g.gameBoardLetters[element1].style.visibility = "visible";
		g.gameBoardLetters[element2].style.visibility = "visible";
	}
	
	g.tempArray = new Array(2);
	g.pickCntr = 0;
}

function resetGameBoard(e){
	for (cntr = 0; cntr < g.gameBoardLetters.length; cntr++) {
		g.gameBoardLetters[cntr].style.visibility = "visible";
		g.gameBoardPatterns[cntr].style.visibility = "visible";
		g.pickCntr = 0;
		g.tempArray = new Array(2);
		g.matchesFound = 0;
	}
	
	clearPatterns();
	initializePatterns();
	changeBackgroundImg();
}

function clearGameBoard(e){
	if(g.pickCntr != 2){
		for (cntr = 0; cntr < g.gameBoardLetters.length; cntr++) {
			g.gameBoardLetters[cntr].style.visibility = "hidden";
			g.gameBoardPatterns[cntr].style.visibility = "hidden";
		}
	}
}

function getElementNumber(element){
	var elementNum;
	
	switch (element) {
		case 65: case 97: case 'picA': elementNum = 0; break;
		case 66: case 98: case 'picB': elementNum = 1; break;
		case 67: case 99: case 'picC': elementNum = 2; break;
		case 68: case 100: case 'picD': elementNum = 3; break;
		case 69: case 101: case 'picE': elementNum = 4; break;
		case 70: case 102: case 'picF': elementNum = 5; break;
		case 71: case 103: case 'picG': elementNum = 6; break;
		case 72: case 104: case 'picH': elementNum = 7; break;
		case 73: case 105: case 'picI': elementNum = 8; break;
		case 74: case 106: case 'picJ': elementNum = 9; break;
		case 75: case 107: case 'picK': elementNum = 10; break;
		case 76: case 108: case 'picL': elementNum = 11; break;
		case 77: case 109: case 'picM': elementNum = 12; break;
		case 78: case 110: case 'picN': elementNum = 13; break;
		case 79: case 111: case 'picO': elementNum = 14; break;
		case 80: case 112: case 'picP': elementNum = 15; break;
		default: elementNum = -1; break;
	}
	
	return elementNum;
}

function patternKeyPressed(e){
	addEvent(window,"keyup", revealPattern);
}

function revealPattern(e){
	if(g.pickCntr != 2){
		var evt = e || window.event;
		var charCode = evt.which || evt.keyCode;
		var target = evt.target || evt.srcElement;
		
		if(charCode == 1 && target == "[object HTMLImageElement]"){
			
			target.style.visibility = "hidden";
			
			
			g.tempArray[g.pickCntr] = getElementNumber(target.id);
			g.pickCntr++;
		}
		else{
			var theElement = getElementNumber(charCode);
			
			if(theElement != -1){
				if(g.gameBoardLetters[theElement].style.visibility == "visible"){
					g.gameBoardLetters[theElement].style.visibility = "hidden";
					g.tempArray[g.pickCntr] = theElement;
					g.pickCntr++;
				}
			}
		}
		
		if(g.pickCntr == 2){
			setTimeout(checkMatch, 1250);
		}
	}
		
}

function addEvent(obj, type, fnName){

	if(obj.addEventListener){
		obj.addEventListener(type, fnName, false);
	}	
	else if(obj.attachEvent){
		obj.attachEvent("on" + type, fnName);
	}
	else{
		alert("Browser not compatible with application");
	}	
}

//Quick fix for problem with detecting that visibility property is set to "visible",for onkeypress event. 
//It would detect that the visibility is set to nothing rather than "visibile" when it actually is visible.
function fixVisibilityProblem(){
	for (cntr = 0; cntr < g.gameBoardLetters.length; cntr++) {
		g.gameBoardLetters[cntr].style.visibility = "visible";
	}
}

function setAllTheEvents(){
	addEvent(g.topLayer, "click", revealPattern);
	addEvent(window,"keydown", patternKeyPressed); 
	addEvent(g.newGameButon, "click", resetGameBoard);
	addEvent(g.quitButon,"click", clearGameBoard);
}

function initializePatterns(){
	var boardCntr = 0;
	var patternCntr = 0;
	var patternNumber = 0;
	var randomNumber = 0;
		
	while(boardCntr < g.gameBoardPatterns.length){
		while(patternCntr < 2){
			randomNumber = Math.floor(Math.random() * (16));
			
			if(g.gameBoardPatterns[randomNumber].getAttribute('src') == "img/blank.jpg")
			{	
				g.gameBoardPatterns[randomNumber].src = g.patterns[patternNumber];
				patternCntr++;
			}
		}
		
		patternCntr = 0;
		patternNumber++;
		boardCntr += 2;
	}
	
}

function cacheElements(){
	g.gameBoardPatterns = document.querySelectorAll(".gameBoardPatterns");
	g.gameBoardLetters = document.querySelectorAll(".gameBoardLetters");
	g.gameBoardBackground = document.getElementById("gameBoardBackground");
	g.newGameButon = document.getElementById("newGameButon");
	g.quitButon = document.getElementById("quitButon");
	g.topLayer = document.getElementById("topLayer");
	
	g.patterns = ["img/patterns/pattern1.jpg", "img/patterns/pattern2.jpg", "img/patterns/pattern3.jpg", "img/patterns/pattern4.jpg", "img/patterns/pattern5.jpg",
					"img/patterns/pattern6.jpg", "img/patterns/pattern7.jpg", "img/patterns/pattern8.jpg"];
	
	g.backgrounds = ["img/animals/animal1.jpg","img/animals/animal2.jpg", "img/animals/animal3.jpg", 
						"img/animals/animal4.jpg", "img/animals/animal5.jpg","img/animals/animal6.jpg"]
	
	var imgSource = new Image();
	var imgArray = g.patterns.concat(g.backgrounds);
	
	for(var i = 0; i < imgArray.length; i++){
		imgSource.src = imgArray[i];
	}
}

function init(){
	g.blankImg = "img/blank.jpg";
	g.pickCntr = 0;
	g.tempArray = new Array(2);
	g.matchesFound = 0;
	g.backgroundCntr = 0;
	
	cacheElements();
	initializePatterns();
	setAllTheEvents();
	fixVisibilityProblem();
}


window.ondragstart = function() { return false; } 
window.onload = init;
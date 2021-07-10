var temp = document.querySelector('.time');
 	var button = document.querySelector("button");
 	var words = document.querySelector(".words");
 	var timerDiv = document.querySelector(".time");
 	var scoreDiv = document.querySelector(".score");
 	var points = 0;
 	var spans;
 	var typed;
 	var seconds = 20;
  var spark = new Audio("http://k003.kiwi6.com/hotlink/qdpr7bioht/spark.mp3");

 	function countdown() {
 		points = 0;
 		var timer = setInterval(function(){
 			button.disabled = true;
    		seconds--;
    		temp.innerHTML = seconds;
    		if (seconds === 0) {
				spark.pause();
    			alert("Game over! Your score is " + points);
    			scoreDiv.innerHTML = "0";
    			words.innerHTML = "";
    			button.disabled = false;
    			clearInterval(timer);
    			seconds = 20;
    			timerDiv.innerHTML = "20";
    			button.disabled = false;	
    		}
 		}, 1000);
		

	var audio = new Audio('gamesong.mp3');
	  audio.play();
  	}

  	function random() {
  		words.innerHTML = "";
  		var random = Math.floor(Math.random() * (10 - 0 + 1)) + 0;
  		var wordArray = list[random].split("");
  		for (var i = 0; i < wordArray.length; i++) { 
			
  			var span = document.createElement("span");
  			span.classList.add("span");
  			span.innerHTML = wordArray[i];
  			words.appendChild(span);
  		}
  		spans = document.querySelectorAll(".span");
  	}


  	const list = ['ACCOUNT','ACCURATE','ACRES','ACROSS','ACT','ACTION','ACTIVE','ACTIVITY',
  'ACTUAL','ACTUALLY'];

  	button.addEventListener("click", function(e){
  		countdown();
  		random();
  		button.disabled = true;	
  	});


  	function typing(e) {
  			typed = String.fromCharCode(e.which);
  			for (var i = 0; i < spans.length; i++) {
  				if (spans[i].innerHTML === typed) { 
					
  					if (spans[i].classList.contains("bg")) { 
  						continue;
  					} else if (spans[i].classList.contains("bg") === false && spans[i-1] === undefined || spans[i-1].classList.contains("bg") !== false ) { 
  						spans[i].classList.add("bg");
  						break;
  					}
  				}
  			}
  			var checker = 0;
  			for (var j = 0; j < spans.length; j++) { //checking if all the letters are typed
  				if (spans[j].className === "span bg") {
  					checker++;
  				}
  				if (checker === spans.length) { 
            spark.pause();
					  spark.currentTime = 0;
            spark.play();
  					words.classList.add("animated");
  					words.classList.add("fadeOut");
  					points++; 
  					scoreDiv.innerHTML = points; 
  					document.removeEventListener("keydown", typing, false);
  					setTimeout(function(){
  						words.className = "words";  
  						random(); 
  						document.addEventListener("keydown", typing, false);
  					}, 400);
  				}

  			}
  	}

  	document.addEventListener("keydown", typing, false);
	
    var val=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25];
    let newpos,
      temp;
    let n=0;
    let k=1;
    var inputVal="";
    let body = document.querySelectorAll("button");
    var seconds = 0;
    var t;
    const highScores = JSON.parse(localStorage.getItem("highScores")) || []; 
    document.getElementById("back").style.visibility = 'hidden';
    document.getElementById("game").style.visibility = 'hidden';
    document.getElementById("time").style.visibility = 'hidden';
    for(let i= 24;i>0;i--){
      newpos=Math.floor(Math.random()*(i+1));
      temp = val[i];
      val[i]=val[newpos];
      val[newpos]=temp;   
    }
    document.getElementById("start").addEventListener("click", myFunction);
    function myFunction(){
      document.getElementById("game").style.visibility = 'visible';
        document.getElementById("time").style.visibility = 'visible';
      inputVal = document.getElementById("name").value;
      if(inputVal==""){
        inputVal="NoName"
      }
      document.getElementById("start").style.visibility = 'hidden';
      document.getElementById("highscores").style.visibility = 'hidden';
      document.getElementById("name").style.visibility = 'hidden';
      for (let i=0; i < 25; i++) {
        let body = document.querySelectorAll("button");
        body[i+2].innerHTML = ''+val[i];
      }
      var el = document.getElementById('time');
      function incrementSeconds() {
          seconds += 1;
          el.innerText =seconds;
      }
      var cancel = setInterval(incrementSeconds, 1000);
    }
    function cl(clicked) { 
          let i=parseInt(clicked);
          if(val[(i-1)]==k){
            if(k<=25){
              document.getElementById(clicked).innerText=''+(k+25);
              val[i-1]+=25
            }
            if(k>25 && k<=50){
              document.getElementById(clicked).style.visibility='hidden';
            }
            k++;
            if(k==51){
            t=seconds;
            scores();
            window.location.reload();
            }
          }
      }
    function Hi(){
      document.getElementById("game").style.visibility = 'hidden';
      document.getElementById("time").style.visibility = 'hidden';
      document.getElementById("name").style.visibility = 'hidden';
      document.getElementById("start").style.visibility = 'hidden';
      document.getElementById("highscores").style.visibility = 'hidden';
      document.getElementById("back").style.visibility = 'visible';
      display();
    }
    function display(){
      const highScoresList = document.getElementById("highScoresList");
      const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

      highScoresList.innerHTML = highScores
        .map(score => {
          return `"${score.name}" - ${score.score} <br>`;
        })
        .join("");
    }
    function scores(){
      const score = {
      score: t,
      name: inputVal
      };
      highScores.push(score);
      highScores.sort((a, b) => a.score - b.score);
      highScores.splice(5);
      localStorage.setItem("highScores", JSON.stringify(highScores));
      window.location.assign("/");
    }

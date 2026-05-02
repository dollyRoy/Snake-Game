// game constants and variables //

let inputDirection = { x: 0, y: 0 };
let foodSound = new Audio('./assets/food.mp3');
let gameOverSound = new Audio('./assets/gameOver.mp3');
let moveSound = new Audio('./assets/movement.mp3');
let musicSound = new Audio('./assets/music.mp3');
let speed = 3;
let score = 0;
let lastPaintTime = 0;
let snakeArr= [
    {x: 13, y:15}
]
food ={x: 6 , y:7};



// game functions //
function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
    musicSound.play();
}
function isCollide(snake){
    
    // if you bump into yourself //
    for(let index =1; index<snakeArr.length;index++){

        if(snake[index].x === snake[0].x && snake[index].y === snake[0].y){
            return true;
        }
    }
    // if you bump into the wall //
    if(snake[0].x<0 || snake[0].x>=18  || snake[0].y>=18 || snake[0].y<=0){
            return true;
        }
    
}







function gameEngine(){
    // part 1 : Updating the snake array
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDirection ={ x: 0, y: 0 };
        alert("Game over!!!! Press any key to play again...");
        snakeArr = [{x: 13, y:15}];
        musicSound.play();
        score = 0;
    }
    // if you have eaten the food icrement the score and regenerate the food ..//
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score++;
        scoreBox.innerHTML= "Score : "+score;
        if(score>highScoreVal){
            highScoreVal = score;
            localStorage.setItem("highScore", JSON.stringify(highScoreVal));
            highScoreBox.innerHTML= "High Score : "+highScoreVal;
        }
        if(score>10){
            speed+=0.5;
        }
        // score.innerHTML = score;
        
      
    snakeArr.unshift({x : snakeArr[0].x + inputDirection.x, y : snakeArr[0].y + inputDirection.y});
    let a =2;
    let b =16;
    food = {x:Math.round(a+(b-a)*Math.random()) , y:Math.round(a+(b-a)*Math.random())}
    }


    // moving the snake //
        for(let i = snakeArr.length-2;i>=0;i--){
    
        snakeArr[i+1] = {...snakeArr[i]};
        }

        snakeArr[0].x += inputDirection.x;
        snakeArr[0].y += inputDirection.y;


    // part 2 : render the snake and food 
    // display the food element // 
    board.innerHTML = "";
    // displaying the snake element //
    snakeArr.forEach((e, index) => {
        const snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
    
        if (index === 0) {
            snakeElement.classList.add('head');
        } else {
            snakeElement.classList.add('snake');
    
            // Size and shape tapering
            const total = snakeArr.length;
            const scale = 1 - index / (total * 1.5); // scale gets smaller toward the tail
            snakeElement.style.transform = `scale(${scale})`;
            snakeElement.style.borderRadius = `${50 - index}px / ${30 - index}px`;
        }
    
        board.appendChild(snakeElement);
    });
    
        foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);
    

    

}








// main logics starts here //
let highScore = localStorage.getItem("highScore");
if(highScore=== null){
    let highScoreVal =0;
    localStorage.setItem("highScore",JSON.stringify(highScoreVal))
}
else{
    highScoreVal = JSON.parse(highScore);
    highScoreBox.innerHTML = "High Score : "+highScore;
    }

window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    inputDirection = {x: 0, y: 1} // start the game //
    moveSound.play();
    switch(e.key){
        case "ArrowUp":
            console.log("Arrow Up");
            inputDirection.x=0;
            inputDirection.y =-1;
            break;
        case "ArrowDown":
            console.log("Arrow Down");
            inputDirection.x=0;
            inputDirection.y =1;
            break;
        case "ArrowRight":
            console.log("Arrow Right");
            inputDirection.x=1;
            inputDirection.y =0;
            break;
        case "ArrowLeft":
            console.log("Arrow Left");
            inputDirection.x=-1;
            inputDirection.y =0;
            break;
    }
});







const gameArea = document.querySelector("#gameArea");

const {
    clientWidth: GAME_AREA_WIDTH, 
    clientHeight: GAME_AREA_HEIGHT
} = gameArea;
// Get the computer paddle element
const [
    firstPlayerPaddle, 
    computerPaddle
] = document.querySelectorAll(".paddle");

const ball = document.getElementById("ball");

function getPaddleTopPosition() {
    return +getComputedStyle(firstPlayerPaddle, "position").top.replace('px', '');   
}

// Initial position of the paddles(Which we set to be at the top 0px)
let firstPlayerPaddleYPosition = getPaddleTopPosition(firstPlayerPaddle);
let computerPaddleYPosition = getPaddleTopPosition(firstPlayerPaddle);

const paddleVelocity = 20;

//  update ball position
let ballPosition = {
    x: +getComputedStyle(ball, "position").left.replace("px", ""),
    y: +getComputedStyle(ball, "position").left.replace("px", "")
};

let velocityX = 20;
let velocityY = 20;

function moveBall() {
    ballPosition.x += velocityX;
    ballPosition.y += velocityY;

    // let bouceBall = false;
    
    if(ballPosition.y > GAME_AREA_HEIGHT - velocityY * 2) {
        // bouceBall = true;
        velocityY = -20;
    }

    if(ballPosition.x > GAME_AREA_WIDTH - 60) {
        // bouceBall = true
        velocityX = -20;
    }

    if(ballPosition.y <= 0) {
        velocityY = 20;
    }

    if(ballPosition.x <= 0) {
        velocityX = 20;
    }

    ball.style.left = `${ballPosition.x}px`;
    ball.style.top = `${ballPosition.y}px`;
}

setInterval(moveBall, 100);

document.addEventListener("keypress", function (event) {
    let moveUp, moveDown;
    if(event.key === "a") {
        // move Up
        moveUp = true;
        if(firstPlayerPaddleYPosition - paddleVelocity === -paddleVelocity) {
            moveUp = false
        }

        if(moveUp) firstPlayerPaddleYPosition -= paddleVelocity;
    } else if(event.key === "s") {
        // move Down
        moveDown = true;
        if(firstPlayerPaddleYPosition + paddleVelocity === GAME_AREA_HEIGHT - paddleVelocity * 2) {
            moveDown = false;
        }
        
        if(moveDown) firstPlayerPaddleYPosition += paddleVelocity;
    } else if(event.key === "j") {
        // move Up
        moveUp = true;
        if(computerPaddleYPosition - paddleVelocity === -paddleVelocity) {
            moveUp = false
        }

        if(moveUp) computerPaddleYPosition -= paddleVelocity;
    } else if(event.key === "k") {
        // move Down
        moveDown = true;
        if(computerPaddleYPosition + paddleVelocity === GAME_AREA_HEIGHT - paddleVelocity * 2) {
            moveDown = false;
        }
        
        if(moveDown) computerPaddleYPosition += paddleVelocity;
    }

    firstPlayerPaddle.style.top = `${firstPlayerPaddleYPosition}px`;
    computerPaddle.style.top = `${computerPaddleYPosition}px`;
});
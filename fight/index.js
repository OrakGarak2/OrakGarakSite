const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

class Sprite {
    constructor( { position, velocity } ) {
        this.position = position;

        this.velocity = velocity;

        this.width = 50;
        this.height = 150;
    }

    draw() {
        c.fillStyle = "red";
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.draw();
           
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}

// P1 선언
const player01 = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 10
    }
})

// P2 선언
const player02 = new Sprite({
    position: {
        x: 400,
        y: 100
    },
    velocity: {
        x: 0,
        y: 10
    }
})

// console.log(player01);

// 재귀함수로 애니메이션 계속 그려주기
function animate() {
    window.requestAnimationFrame(animate);

    // 캔버스 새로 그리기
    c.fillStyle = "black";
    c.fillRect(0, 0, canvas.width, canvas.height);

    player01.update();
    player02.update();
}

animate();
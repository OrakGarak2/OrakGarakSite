// 이미지 및 반지름 추가
import { FRUITS } from "./fruits.js";

// 모듈 불러오기
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    World = Matter.World,
    Body = Matter.Body,
    Events = Matter.Events;

// 엔진 선언
const engine = Engine.create();

// 렌더 선언
const render = Render.create
({
    engine,
    // 어디에 그릴 것인지
    element: document.body,
    options: {
        wireframes: false,
        background: '#A1B1E3',
        width: 620,
        height: 850
    }
});

// 벽 배치를 위한 world 선언
const world = engine.world;

// 벽 생성
const leftWall = Bodies.rectangle(15, 395, 30, 790, {
    isStatic: true,
    render: {fillStyle: "#F611E3"}
})

const rightWall = Bodies.rectangle(605, 395, 30, 790, {
    isStatic: true,
    render: {fillStyle: "#F62213"}
})

const ground = Bodies.rectangle(310, 820, 620, 60, {
    isStatic: true,
    render: {fillStyle: "#CEB1E3"}
})

const topLine = Bodies.rectangle(310, 150, 620, 2, {
    // 이벤트 처리를 위한 이름 지정
    name: "topLine",

    isStatic: true,
    isSensor: true,  // 센서 기능
    render: {fillStyle: "#8FE143"}
})

// 생성한 벽을 월드에 배치
World.add(world, [leftWall, rightWall, ground, topLine]);

// 실행
Render.run(render);
Runner.run(engine);

// 현재 과일의 값을 저장하는 변수
let currentBody = null;
let currentFruit = null;

// 키 조작을 제어하는 함수
let disableAction = false;

// 과일을 추가하는 함수
function addFruit()
{
    // 난수 생성
    const index = Math.floor(Math.random() * 5);

    const fruit = FRUITS[index];

    const body = Bodies.circle(300, 50, fruit.radius,
        {
            index: index, // 해당 과일의 번호를 저장
            isSleeping: true, // 처음 시작할 때 멈춤
            render: {
                sprite: {texture: `${fruit.name}.png` }
            },
            restitution: 0.4,
        });

    // 현재 과일의 값 저장
    currentBody = body;
    currentFruit = fruit;
    
    // 월드에 배치
    World.add(world, body);
}

// 키보드 입력 받기
window.onkeydown = (event) => {

    if(disableAction) return;

    switch(event.code)
    {
        case "KeyA":
            if(currentBody.position.x - currentFruit.radius > 30) {
                Body.setPosition(currentBody, {
                    x: currentBody.position.x - 10,
                    y: currentBody.position.y
                })
            }
            break;
        case "KeyD":
            if(currentBody.position.x + currentFruit.radius < 590) {
                Body.setPosition(currentBody, {
                    x: currentBody.position.x +10,
                    y: currentBody.position.y
                })
            }
            break;
        case "KeyS":
            currentBody.isSleeping = false;
            //addFruit();
            disableAction = true;
            // 지연시키는 함수
            setTimeout(() => {
                addFruit();
                disableAction = false;
            }, 1000);
            break;
    }
}

Events.on(engine, "collisionStart", (event) => {
    event.pairs.forEach((collision) => {
        // 같은 과일일 경우
        if(collision.bodyA.index == collision.bodyB.index)
        {
            // 지우기 전에 해당 과일 값을 저장
            const index = collision.bodyA.index;

            // 과일 지우기
            World.remove(world, [collision.bodyA, collision.bodyB]);

            // 수박일 경우에 처리하지 않음
            if(index == FRUITS.length - 1) return;

            // 다음 단계 과일 생성
            const newFruit = FRUITS[index+1];
            const newBody = Bodies.circle(
                // 충돌한 지점의 x, y
                collision.collision.supports[0].x,
                collision.collision.supports[0].y,
                newFruit.radius,
                {
                    // 과일값 1 증가
                    index: index+1,
                    render: {
                        sprite: {texture: `${newFruit.name}.png` }
                    },
                }
            );

            // 새로 만든 과일 추가
            World.add(world, newBody);
        }

        if(!disableAction && (collision.bodyA.name === "topLine" || collision.bodyB.name === "topLine")){
            alert("Game Over");
            disableAction = true;
        }
    })
})

// 함수 호출
addFruit();
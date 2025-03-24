// 모듈 불러오기

var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    World = Matter.World;

// 엔진 선언
const engine = Engine.create();

// 렌더 선언
const render = Render.create
({
    engine,s,
    // 어디에 그릴 것인지
    element: document.body,
    options: {
        wireframes: false,
        background: '#F7F4C8',
        width: 620,
        heigth: 850
    }
});

// 벽 보기를 위한 world 선언
const word = engine.world;

// 벽 생성
const leftWall = Bodies.rectangle(15, 390, 30, 790, {
    isStatic: true,
    render: {fillStyle: "E6B143"}
})

// 생성한 벽을 월드에 배치
World.add(world, [leftWall]);

// 실행
Render.run(render);
Render.run(engine);

# 📄 OrakGarakSite

## 🍉 수박게임 모작

### 📚 2D 물리
- matter.js라는 2D 물리 라이브러리를 사용했습니다.

### 🍇 과일 생성
- 체리, 딸기, 포도, 한라봉, 감 중 하나가 무작위로 생성됩니다.
- W키, A키로 떨어뜨릴 위치를 정하고, S키로 떨어뜨립니다.

### ➕ 과일 합치기
- 두 개의 같은 종류의 과일이 만나면 다음 등급의 과일 한 개로 합쳐집니다.
- 등급의 순서는 '체리 -> 딸기 -> 포도 -> 한라봉 -> 감 -> 사과 -> 배 -> 복숭아 -> 파인애플 -> 멜론 -> 수박'입니다.

### ⏹️ 게임 오버
- 과일이 너무 높게 쌓여서 상단에 있는 선을 넘어가면 클리어에 실패합니다.
- 수박을 생성하면 클리어에 성공합니다.

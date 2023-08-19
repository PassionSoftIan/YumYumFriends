# Read me!

### 💡 서비스 소개 : 냠냠프렌즈

---

<aside>
🗨️ AI를 사용한 식사 유도 유아용 게임

유아가 식사를 스스로 할 수 있도록 독려해주는 게임 입니다.
귀여운 캐릭터 및 서비스가 제공됩니다.
부모님 또한 참관기능을 통해 아이가 식사하는 모습을 볼 수 있습니다.
멀티 플레이를 이용한 2인용 게임을 지원합니다.

PWA를 사용해서 모바일로 웹 앱으로 게임을 진행 할 수 있습니다.
다양한 서비스를 통해 아이 스스로 끼니를 거르지 않고 건강한 식생활을 할 수 있도록 도와줍니다. 

</aside>

### 💡 기획 의도

---

밥을 잘 먹지 않는 아이 때문에 걱정하는 부모를 생각하며 만들었습니다. 성장기에 끼니를 거르면 아이에게 많은 영향이 갈 수 있습니다. 이와 같은 이유로 아이 스스로 식사를 찾고 식사에 흥미를 유발할 수 있는 프로젝트를 생각하고 기획했습니다.
 해당 서비스를 통해서 아이의 건강을 챙기고 부모님의 수고를 덜 수 있습니다.

### 💡 팀 소개

---

팀장: 권인식

팀원: 김동현 김은비 라동엽 성제현 이종윤



Frontend : 권인식, 김동현, 김은비, 성제현
Backend : 라동엽, 이종윤, 권인식

AI: 라동엽
Server: 권인식, 이종윤
CI/CD: 권인식
Design: 성제현, 김은비, 김동현
Unity: 이종윤

### 🗓️ 프로젝트 진행 기간

---

***2023.07.04~ 2023.08.18 (총 7주)***

![image (14).png](README_assets/d65a382c673b9f8801d7b00f4b8e65a78952e78e.png)

### 💻 냠냠프렌즈 메인 서비스

---

- Singleplay 모드 + 관전
  
  <img title="" src="README_assets/efd709acba96ac0e1d35e23cfd03500567af094d.gif" alt="ezgif.com-crop (16).gif" width="148">
  
  <img title="" src="README_assets/fa7782157cfef8e03f0318eac4fa1a7563041307.gif" alt="ezgif.com-crop (17).gif" width="149">
  
  OpenVidu 사용해 관전 observation page 제공 webRTC 통신
  
  - tenserflow 라이브러리를 사용하여 얼굴 detection을 좌우 눈 좌표 획득 해 얼굴 폭을 계산후 모자 이미지를 머리 위에 부착
  
  - 실시간으로 flask 서버에 이미지 전송
  
  - flask 서버에서 식사 startpoint 받아오기
    
    <img src="README_assets/2023-08-18-17-26-36-image.png" title="" alt="" width="338">  

- Multiplay 모드
  
  <img src="README_assets/c53f6352d191ec96d0f89d3d81dea071bc4a85f8.gif" title="" alt="multi.gif" width="154">
  
  - webSocket을 활용해 멀티 모드 참여자의 식사 여부를 실시간으로 전송하여 게임 화면에 반영
    
    <img src="README_assets/2023-08-18-17-28-36-image.png" title="" alt="" width="349">

### 📱 냠냠 프렌즈 구성 화면

---

- 로그인 페이지
  
  <img title="" src="README_assets/c278210565a7ffdd07aab7278024e23cd19e0c2f.gif" alt="login.gif" width="179">

- 메인 페이지
  
  <img title="" src="README_assets/600e9c25c328042f2a13c1166d9adfd21a355bbc.gif" alt="main_to_single.gif" width="182">

- 대표 캐릭터 설정 페이지
  
  <img title="" src="README_assets/69593b37758961c361e0775803535445596a3184.png" alt="image (17).png" width="182">

- 캐릭터 획득 페이지
  
  <img src="README_assets/78c41d19071412244bbfcdf2d13c552c7fa2fa29.gif" title="" alt="gotcha.gif" width="179">

### 🏗️ 아키텍쳐

---

<img src="README_assets/1d04bdf354bc1300fe83c2696c0ce5c7380cc3d1.png" title="" alt="Web App Reference Architecture.png" width="555">

### 📊 ERD

---

<img src="README_assets/66d82c48a6523e7480734a17546f406b7c276fb1.png" title="" alt="image (13).png" width="562">

### 🛠️ 기술 스택

---

- **Front-End**

- JavaScript

- TypeScript

- ReactJs

- Redux

- TensorFlow

- openVidu

- **Back-End**

- Java 17

- Spring boot 4.19.0

- Spring Web

- Spring Data JPA

- Lombok

- Swagger 2

- Openvidu 2.28.0

- Mariadb

- tomcat

- **AI**

- Python 3.10.9

- Pycharm

- Pytorch 1.13.1+cu116

- Flask 2.3.2

- numpy 1.24.3

- opencv-python 4.8.0

- matplotlib 3.7.2

- **Server**

- nginx

- docker

- docker hub

- Jenkins

- putty

- Certbot

- Letsencrypt

- filezilla

- EC2

- Ubuntu

- AWS

### 😁 ai 실행방법

---

1. requirements 다운로드
   pip install -r requirements.txt

2. cuda 11.6 다운로드

3. torch 다운로드
   pip3 install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu116

4. 플라스크 path 수정
   ./uitils/flask_rest_api/restapi_test.py의 58번 라인 본인 path로 수정
   models[m] = torch.hub.load('your project path', 'custom', path = 'your weights path', source='local')

5. ./uitils/flask_rest_api/restapi_test.py 실행 (gtx 1060 6gb 이상의 사양 권장)
   
   ##### 실험환경
   
   CPU : 11th Gen Intel(R) Core(TM) i7-11600H @ 2.90GHz 
   RAM : 32GB
   GPU : NVIDIA GeForce RTX 3050 Ti Laptop GPU
   
   ##### 데이터 구축

6. 유투브 프레임 추출
   
   - 유투브 먹방 영상에서 캡처를 통해 500여장의 이미지 수집

7. data annotation
   
   - label-studio를 사용하여 데이터 라벨링 진행

8. background image 
- recall을 높이기 위해 데이터 셋에 background image 추가
  
  ##### AI 학습
1. yoloV5
   - yoloV5를 사용해 학습하였다. yoloV8이 sota 모델이지만, 실시간 구현을 위해 더 가벼운 v5모델을 사용하였다.
2. hyperparameter turning
   - loss함수의 hyperparameter를 구축한 데이터에 맞춰 수정하였다.
3. PAN 확장
   - 음식을 먹는 입모양을 탐지해서 식사인식을 진행 했기 때문에 탐지하는 객체가 작았다. 따라서 작은 객체의 인식률을 높히기 위해서 PAN 을 확장 하였다.

### 👩‍👩‍👦‍👦 협업 툴

---

- JIRA
  
  <img src="README_assets/121dad01016946a96bc662f2f698273a81b5d8e2.jpg" title="" alt="burndown (1).jpg" width="600">
  
  ![캡처.PNG](README_assets/8eb7fe9cc7d8ffcb7e8b8681e02db9e0e109896d.PNG)

- 노션
  
  ![image (15).png](README_assets/9d36f12bbfa793320e7ae27ee8301b0cc8d1e9eb.png)

- gitlab

- mattermost

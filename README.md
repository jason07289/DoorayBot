# Dooray 슬래시 커맨드 추가하기 (Node.js, REST Api)
- 참고자료: [Node.js REST API 서버 만들기][noderest]
  
[noderest]:https://ing-yeo.net/2020/02/study-nodejs-create-simple-restful-api-server/

## Express 서버 프로젝트 생성.
- Express-generator 설치
    ```cmd
    npm i -g express-generator
    ```
- Express 프로젝트 생성
    ```cmd
    express PROJECT_NAME --view=pug
    ```
- Express 서버 관련 패키지 설치 PROJECT_NAME 폴더로 이동 후 ```npm i``` 명령어 실행

## 라우팅
- app.js 파일에 기본 주소세팅이 가능하다.
```javascript
//라우터 객체
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var timeRouter = require('./routes/time');
var startRouter = require('./routes/start');

//...

// 라우팅
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/time', timeRouter);
app.use('/start', startRouter);

```

## REST API 만들기
- GET, POST, DELETE, PULL 방식이 가능하지만 두레이 커맨드는 기본적으로 POST 방식을 사용.
- 퇴근시간을 전달하는 API 생성
    ```javascript
    var express = require('express');
    var router = express.Router();

    router.post('/', function(req, res, next) { //POST 방식인 것이 중요.
    var today = new Date();   

    let year = today.getFullYear(); // 년도
    let month = today.getMonth() + 1;  // 월
    let date = today.getDate();  // 날짜

    var end = new Date(today.getFullYear(),today.getMonth(),today.getDate(),18,00,00);

    var nt = today.getTime();
    var et = end.getTime();
    console.log(nt);
    console.log(et);

    var sec =parseInt(et - nt) / 1000;
    var day  = parseInt(sec/60/60/24);
    sec = (sec - (day * 60 * 60 * 24));
    var hour = parseInt(sec/60/60);
    sec = (sec - (hour*60*60));
    var min = parseInt(sec/60);
    sec = parseInt(sec-(min*60));
    if(hour<10&&hour>=0){hour="0"+hour;}
    if(min<10&&min>=0){min="0"+min;}
    if(sec<10&&sec>=0){sec="0"+sec;}

    res.json({"text": "금일 퇴근까지 "+hour + '시간 ' + min + '분 ' + sec +'초 남았습니다. ^^'
    , "responseType": "inChannel"
    });
    });



    module.exports = router;

    ```
- routes 폴더 안에 time.js 파일을 넣어준다.(app.js파일에서 라우팅 설정했던 것과 연결.)
    ![image](https://user-images.githubusercontent.com/38865267/98905691-3044ae80-24ff-11eb-9ee3-701fd034e558.png)


## API 테스트해보기
- 해당 프로젝트에서 package.json 파일이 있는 위치에서 ```npm start``` 입력
    ![image](https://user-images.githubusercontent.com/38865267/98907049-8f0b2780-2501-11eb-808c-cee30734bd3d.png)
- PostMan 설치 (그냥 URL로 테스트해도 되긴함.)
  ![image](https://user-images.githubusercontent.com/38865267/98907186-cd084b80-2501-11eb-900e-c89b8426c1f0.png)
- 응답이 잘 오는 것을 확인 할 수 있다.

## 두레이 슬래시 커맨드 연동하기.
- 참고자료: [Dooray슬래시커맨드연동][Dooray] 

 [Dooray]:https://docs.toast.com/ko/Dooray/Messenger/ko/slash-command-guide/#_36
- 프로필 옆 메뉴바에서 슬래시 커맨드 연동으로 들어간다.
  ![image](https://user-images.githubusercontent.com/38865267/98907988-0a210d80-2503-11eb-851a-37df650295bc.png)
- 앱 생성 후 커맨드 추가 가능
  ![image](https://user-images.githubusercontent.com/38865267/98908023-1ad18380-2503-11eb-916e-21dbd745a967.png)
- REST URL에 위에서 만든 API 주소를 입력한다.
  ![image](https://user-images.githubusercontent.com/38865267/98908086-3c326f80-2503-11eb-9be6-988815ef6054.png)
- 여기서 ngrok주소는 외부 ip (Dooray)에서 내 로컬 ip로 접근이 가능하게 하기 위한것
  - 참고자료: [로컬호스트 외부에서 접속 시키는 방법][ngrok]
  - 위 자료를 참고하여 ngrok를 실행한다면 로컬 호스트에 대한 중계서버가 만들어진다.
    ![image](https://user-images.githubusercontent.com/38865267/98908606-02159d80-2504-11eb-8be2-d9fde00c09d2.png)

[ngrok]:https://jeffrey-oh.tistory.com/143

- 커맨드를 추가하고 싶은 대화방에서 슬래시 커맨드를 연동한다.
    ![image](https://user-images.githubusercontent.com/38865267/98908702-2bcec480-2504-11eb-9ce7-626e946e1b87.png)
- 추가 버튼을 통해 내가 원하는 커맨드를 연동할 수 있다.
  ![image](https://user-images.githubusercontent.com/38865267/98908810-51f46480-2504-11eb-9ddf-2c7202c973f7.png)
- 커맨드를 입력하면 다음과 같이 슬래시커맨드가 동작한다.
  ![image](https://user-images.githubusercontent.com/38865267/98908876-6a647f00-2504-11eb-8926-081ac59441a6.png)

## 특이사항
- ngrok
  - 위에서 언급했지만 Dooray에서 local ip로 요청을 보내는 부분에서 ngrok를 이용해 중계서버를 생성해야하는 점이 중요.
  - slack bot api, dooray command 등 외부에서 들어오는 api 개발 시 public ip를 가지고 있는 서버가 없다면 테스트하기 불편한 점을 해소해준다.
- 실시간 시간 갱신
  - ```var today = new Date(); ``` 코드의 위치가 중요, api 호출 시점마다 해당 함수가 동작할 수 있게 한다.
  - javascript var, let, const에 대해서 확실히 하자.
  - var는 할당되는 값이 유동적으로 변한다.
  - let은 이미 선언되어있다면 다시 선언할 수 없다. 단, 재할당은 가능.
  - const는 변수 재선언, 재할당 모두 불가능하다.
  - 해당 프로젝트를 실행하며 let으로 date를 할당했다가 api 반복호출시 시간이 갱신되지 않는 문제가 발생했었다. 하지만 var 타입으로 바꾸어 유동적으로 date를 할당할 수 있게 수정.
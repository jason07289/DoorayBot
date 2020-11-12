# 준비과정
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
## 
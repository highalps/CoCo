var express = require('express');
var router = express.Router();
var assert = require('assert');
var updateSocket = require('./service/update-socket');

// TODO: 도커 포트 번호 generation 코드 완성 시 제거
var projectNumber = 8001;

// REST API Reference: http://meetup.toast.com/posts/92

// 로그인 후 사용자의 프로젝트 리스트
router.get('/list', function (req, res, next) {
    var projectsToSend = [];

    req.app.db.collection('users').findOne({ id: req.user.id }, function (err, user) {
        assert.equal(err, null);

        for(i in user.projectList){
            req.app.db.collection('projects').findOne({ _id: user.projectList[i] }, function (err, project) {
                assert.equal(err, null);

                projectsToSend.push(project);
            });
        }
    });

    res.json(projectsToSend);
});

// TODO: redux action 테스트 필요
// 새로운 프로젝트 생성 시
router.post('/project', function(req, res, next) {
    console.log("api.js 프로젝트 생성");
    var data = req.json;

    // 프로젝트를 생성한 유저가 같은 이름의 프로젝트에 참여하고 있는 지 확인
    req.app.db.collection('users').findOne({ _id: req.user.id, projectList: { $eq: data.title }}, function (err, result) {
        assert.equal(err, null);

        if(!result) {
            var project = {
                _id: projectNumber,
                title: data.title,
                files: {
                    root: {
                        isDirectory: true
                    },
                    main: {
                        isDirectory: false,
                        type: data.type.toLowerCase()
                    }
                },
                projectType: data.type,
                userList: [ req.user.id ]
            };

            // 새 프로젝트 추가
            req.app.db.collection('projects').insertOne(project);
            // 생성자의 프로젝트 정보에 해당 프로젝트 정보 추가
            req.app.db.collection('users').updateOne({ _id: req.user.id }, { $push: { projectList: data.title }});

            // TODO: 도커 포트 번호 generation 코드 완성 시 제거
            projectNumber += 1;
        }
    })
});

// TODO 1: react에서 받는 데이터가 어디로 오는지 찾기 (req.??), 주소로 받는 '/:_id'를 대체 (미정)
// TODO 2: 프로젝트 정보 요청 시 사용자 목록 소켓에 추가 및 업데이트
// 프로젝트 리스트에서 선택한 프로젝트 내용 넘기기
router.get('/project/:_id', function (req, res, next) {
    console.log("project " + req.params._id + "요청");

    req.app.db.collection('projects').findOne({ _id: req.params._id }, function (err, result) {
        assert.equal(err, null);

        if(!result) { res.json(result) }
    });
});

// 프로젝트의 디렉토리 변경 시
// /api/updateDirectory/8001로 axios 보내면 테스트 가능
router.put('/directory/:_id', function (req, res, next) {
    console.log("_id", req.params._id, "디렉토리 업데이트");

    req.app.db.collection('projects').findOne({ _id: req.params._id }, function (err, result) {

    });

    var object = {
        type: 'directory',
        data: {
            test: '디렉토리 업데이트'
        }
    };
    // TODO: react에서 받는 데이터 넣기
    updateSocket.update(req.params._id, object);
});

// 프로젝트에 유저 목록 추가
router.post('/user/:_id', function (req, res, next) {
    console.log("_id", req.params._id, "유저 접속 추가");

    var object = {
        type: 'user',
        data: {
            test: '유저접속 추가'
        }
    };
    // TODO: react에서 받는 데이터 넣기
    updateSocket.update(req.params._id, object);
});

module.exports = router;
/**
 * Created by chanhyeong on 2017-07-17.
 */
/**
 * Reference1: https://firebase.google.com/docs/admin/setup
 * Reference2: https://github.com/firebase/quickstart-nodejs/blob/master/database/index.js
 */

/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

// [START imports]
var firebase = require('firebase-admin');
// [END imports]

var database = {};

// Initialize the app with a service account, granting admin privileges
database.init = function() {
    var serviceAccount = require('./serviceAccountKey.json');

    firebase.initializeApp({
        credential: firebase.credential.cert(serviceAccount),
        databaseURL: 'https://test-aeb4a.firebaseio.com',
    });

    console.log('database initialize!');
}

/**
 * firebase database에 아이템을 추가하는 작업을 하나로 합침. 각 작업을 mode로 구분
 *
 * searchValue는 optional value로 검색할 때만 사용,
 * default값 null로 설정. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters
 *
 * 코드가 겹치는 부분들을 ||(OR)로 합쳤음.
 */
database.addItem = function (mode, item, searchValue = null){
    switch(mode){
        // 시스템에 회원 추가 or 새로운 프로젝트 생성 시
        case 'user':
        case 'project':
            firebase.database().ref('/' + mode + 's').push(item, function() {
                console.log(mode + ' ' + item.name + ' 추가');
            });
            break;

        // 프로젝트 내 새로운 파일 생성 or 접근 권한 부여. 프로젝트명으로 경로(key)를 알아낸 다음, 해당 프로젝트에 항목 추가
        case 'file':
        case 'access':
            // 프로젝트명이 같을 경우를 체크해야함
            firebase.database().ref('projects').orderByChild('name').equalTo(searchValue).on('child_added', function(data){
                // 파일 추가
                if(mode == 'file') firebase.database().ref('projects/' + data.key + '/' + mode.push(item, function(){
                    console.log(searchValue + '에 새로운 파일 생성');
                }));
                // 접근 권한 추가
                else {
                    var temp = {};
                    temp[mode] = data.val().access;
                    temp.access[item] = true;
                    firebase.database().ref('projects/' + data.key).update(temp, function () {
                        console.log(searchValue + '에 사용자 ' + item + '의 접근권한 추가');
                    });
                };
            });
            // 접근 권한 부여일 경우 사용자의 참여 프로젝트 목록에 추가
            if(mode == 'access')
                firebase.database().ref('users').orderByChild('id').equalTo(item).on('child_added', function(data){
                    firebase.database().ref('users/' + data.key + '/list').push(searchValue, function(){
                       console.log('user ' + item + '의 참여 프로젝트 리스트에 ' + searchValue + '추가');
                    });
                });
            break;
        default:
            console.log('Invalid mode error. You typed word ' + mode);
    }
};

/**
 * firepad/dist/firepad.js/firepad.min.js 에서 window를 전부 global로 교체 후 사용
 */
database.getText = function() {
    var firepadRef = firebase.database().ref('경로');

    var Firepad = require('firepad');
    var headless = new Firepad.Headless(firepadRef);

    headless.getText(function(text) {
        console.log(text);
    });
}

/**
 * 프로젝트 내용을 통째로 가져옴
 */
database.getProject = function(project, user) {
    firebase.database().ref('projects').orderByChild('name').equalTo(project).on('child_added', function(data){
        return data.val();
    });
};

module.exports = database;
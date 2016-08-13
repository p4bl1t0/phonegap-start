/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        
        window.geofence.addOrUpdate({
            id:             "69ca1b88-6fbe-4e80-a4d4-ff4d3748acdb",
            latitude:       -32.9267366,
            longitude:      -60.6609286,
            radius:         20,
            transitionType: TransitionType.BOTH,
            notification: {
                id:             1,
                title:          "Test test santander limited in time",
                text:           "Test.",
                openAppOnClick: true
            }
        }).then(function () {
            console.log('Geofence successfully added in Santader rio with time limitation');
        }, function (reason) {
            console.log('Adding geofence failed', reason);
        });
        
        
        /**
        * This callback will be executed every time a geolocation is recorded in the background.
        */
        var callbackFn = function(location) {
            console.log('[js] BackgroundGeolocation callback:  ' + location.latitude + ',' + location.longitude);
    
            // Do your HTTP request here to POST location to your server.
            // jQuery.post(url, JSON.stringify(location));
    
            /*
            IMPORTANT:  You must execute the finish method here to inform the native plugin that you're finished,
            and the background-task may be completed.  You must do this regardless if your HTTP request is successful or not.
            IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
            */
            backgroundGeolocation.finish();
        };
    
        var failureFn = function(error) {
            console.log('BackgroundGeolocation error');
        };
    
        // BackgroundGeolocation is highly configurable. See platform specific configuration options
        backgroundGeolocation.configure(callbackFn, failureFn, {
            desiredAccuracy: 5,
            stationaryRadius: 10,
            distanceFilter: 10,
            url: "http://shetaxi.com.ar/test.php",
            interval: 1000,
            stopOnStillActivity: true

        });
    
        // Turn ON the background-geolocation system.  The user will be tracked whenever they suspend the app.
        backgroundGeolocation.start();
        alert("background geo on");
        
        // If you wish to turn OFF background-tracking, call the #stop method.
        // backgroundGeolocation.stop();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        /*var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');*/

        console.log('Received Event: ' + id);
    }
};

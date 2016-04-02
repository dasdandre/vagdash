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

        var grpm = new JustGage({
            id: "grpm",
            value: getRandomInt(0, 4000),
            min: 0,
            max: 8000,
            title: "RPM",
            label: "",
            relativeGaugeSize: true
        });
        
        var gwater = new JustGage({
            id: "gwater",
            value: getRandomInt(60, 120),
            min: 60,
            max: 120,
            title: "WATER",
            label: "",
            relativeGaugeSize: true
        });
        
        var gvolt = new JustGage({
            id: "gvolt",
            value: getRandomInt(100, 150),
            min: 100,
            max: 150,
            title: "VOLTS",
            label: "",
            relativeGaugeSize: true
        });
        
        var gboost = new JustGage({
            id: "gboost",
            value: getRandomInt(60, 120),
            min: 60,
            max: 120,
            title: "BOOST",
            label: "",
            relativeGaugeSize: true
        });



        // check to see if Bluetooth is turned on.
        // this function is called only
        //if isEnabled(), below, returns success:
        var listPorts = function() {
            console.log("trying to list ports");
            // list the available BT ports:
            bluetoothSerial.list(
                function(results) {
                    console.log(JSON.stringify(results));
                },
                function(error) {
                    console.log(JSON.stringify(error));
                }
            );
        };

        console.log("Kerlokiste " + new Date());


        console.log("Hasi b" + JSON.stringify(bluetoothSerial));

        var notEnabled = function() {
            console.log("Bluetooth is not enabled.");
        };

        // check if Bluetooth is on:
        // bluetoothSerial.isEnabled(
        //     listPorts,
        //     notEnabled
        // );
    }
};

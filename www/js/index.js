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
    grpm: null,
    gwater: null,
    goil: null,
    gvolt: null,
    cboost: null,
    cboostseries: null,

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



    // Initialize Gages
    initGage: function() {
        app.grpm = new JustGage({
            id: "grpm",
            value: getRandomInt(0, 4000),
            min: 0,
            max: 8000,
            title: "RPM",
            titleFontFamily: "LCD-Display-Grid",
            valueFontFamily: "LCD-Display-Grid",
            relativeGaugeSize: true
        });

        app.gwater = new JustGage({
            id: "gwater",
            value: getRandomInt(60, 120),
            min: 60,
            max: 120,
            title: "WATER",
            titleFontFamily: "LCD-Display-Grid",
            valueFontFamily: "LCD-Display-Grid",
            relativeGaugeSize: true
        });

        app.gvolt = new JustGage({
            id: "gvolt",
            value: 10 + (Math.random() * 5),
            min: 10.0,
            max: 15.0,
            title: "VOLTS",
            titleFontFamily: "LCD-Display-Grid",
            valueFontFamily: "LCD-Display-Grid",
            decimals: 1,
            relativeGaugeSize: true
        });

        app.goil = new JustGage({
            id: "goil",
            value: getRandomInt(60, 120),
            min: 60,
            max: 120,
            title: "OIL",
            titleFontFamily: "LCD-Display-Grid",
            valueFontFamily: "LCD-Display-Grid",
            relativeGaugeSize: true
        });

    },

    boostVal:100,
    initChart: function() {
        app.cboost = new SmoothieChart({ millisPerPixel: 28, labels: { fillStyle: '#ff0000' },
            grid: {
                    fillStyle:'#ffffff',
                    strokeStyle:'#dddddd',
                    millisPerLine: 1000, 
                    lineWidth: 0,
                    verticalSections: 10,
                    borderVisible:false
                }, 
                maxValue:1000,
                minValue:0
        });
              
        app.cboostseries = new TimeSeries();
        
        // Add a random value to each line every second
        setInterval(function() {
            app.cboostseries.append(new Date().getTime(), app.boostVal);  
        }, 1000);
        
        app.cboost.addTimeSeries(app.cboostseries, { lineWidth: 2, strokeStyle: '#ff0000', fillStyle: 'rgba(255,0,0,0.30)' });
        app.cboost.streamTo(document.getElementById('cboost'), 500);
    },




    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {

        app.initGage();
        app.initChart();

        //Get the canvas & context
        var c = $('#cboost');
        var ct = c.get(0).getContext('2d');
        var container = $(c).parent();

        //Run function when browser resizes
        $(window).resize(respondCanvas);

        function respondCanvas() {
            c.attr('width', $(container).width()); //max width
            c.attr('height', $(container).height()); //max height        
        }

        //Initial call 
        respondCanvas();

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

        var notEnabled = function() {
            console.log("Bluetooth is not enabled.");
        };
        
        bluetoothSerial.isEnabled(
            listPorts,
            notEnabled
        );
        
        var serialLineReceived = function(data){           
            app.boostVal= parseInt(data);
        };        
        
        bluetoothSerial.subscribe('\n', serialLineReceived, function (err){Materialze.toast("Fehler beim Empfangen von Daten",3000);            
        });
        
        bluetoothSerial.connect("20:15:05:21:18:10",function(){console.log("connected");},function(){console.log("connection failed");});
    }

};

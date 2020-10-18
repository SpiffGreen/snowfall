/* ---------------------------------------------------------- */
/* Author : Spiff Jekey-Green */
/* Project Name : Snowfall.js */
/* MIT License : http://opensource.org/licenses/MIT */
/* Demo / Generator : spiffgreen.com/projects/snowfall.js */
/* Github : github.com/spiffgreen/snowfall.js */
/* How to use? : Check the Github README */
/* Version : v1.0.0 */
/* Date : 8-09-2020
/* ---------------------------------------------------------- */


/* IMPORTANT NOTICE MAKE SURE TO FIX THE ISSUE OF VISIBLE SCROLLBAR BY SELECTING THE DIV/SVG CREATED BY THE SCRIPT AND INSERTED INTO THE DIV PROVIDED BY THE USERS AND WORKING ON IT.*/

!(function (global) {
    "use strict";

    /* POLYFILL SECTION */

    // Remember to add Object.create() polyfill if you're using it.

    window.requestAnimFrame = (function() {
        return window.requestAnimationFrame     ||
            window.webkitRequestAnimationFrame  ||
            window.mozRequestAnimationFrame     ||
            window.oRequestAnimationFrame       ||
            window.msRequestAnimationFrame      ||
            function(callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();

    /* END OF POLYFILL SECTION */

    var self, div;

    var default_values = Object.freeze({
        size: 22,
        speed: 400,
        density: 80
    });


    var SnowFall = {
        VERSION: "1.0.0",
        AURTHOR: "Spiff Jekey-Green"
    }

    SnowFall.prototype = {};

    /* HELPER FUNCTIONS ARE WRITTEN BELOW */
    var imgCache = function(imgSrc) {
        // Check if the image is already in the cache by using the localstorage api
        caches.open('v1').then(function(cache) {
            return cache.addAll([
                `${imgSrc}`
            ]);
        });
    };

    function setStyles(elem, obj) {
        for(let [key, value] of Object.entries(obj)) {
            elem.style[key] = value;
        }
    }

    function canvasMaker(width, height) {
        var canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        canvas.ctx = canvas.getContext("2d");
        return canvas;
    }

    function drawCircle(context, x, y, r) {
        var PI2 = Math.PI*2;
        var ratio = 1;
        var radius = r;
        var increment = 1 / radius;
        var cx = x + r / 2;
        var cy = y + r/ 2;

        context.beginPath();
        var x = cx + radius * Math.cos(0);
        var y = cy - ratio * radius * Math.sin(0);
        context.lineTo(x, y);

        for(var radians = increment; radians < PI2; radians += increment) {
            var x = cx + radius * Math.cos(radians);
            var y = cy - ratio * radius * Math.sin(radians);
            context.lineTo(x, y);
        }

        context.closePath();
        context.fill();
        context.stroke();
    }

    function injectCSS(div, n) {
        /* CODE FOR KEYFRAMES GOES HERE */
        var rotate1, rotate2 = ";";
        if(n) {
            rotate1 = "rotate(30deg);";
            rotate2 = "rotate(360deg);";
        }
        var doc = Array.from(document.styleSheets);
        // Adding styles for class
        doc[0].insertRule(`.snowfall-circs {
            animation-name: fall;
            animation-timing-function: linear;
            animation-duration: 10s;
            animation-iteration-count: 1;
            overflow: hidden;
            position: absolute;
        }`, doc[0].cssRules.length);

        // Take off the sidebar that may appear
        doc[0].insertRule(".snowfall-circs::-webkit-scrollbar {display: none;}", doc[0].cssRules.length);
        // doc[0].insertRule("body::-webkit-scrollbar {display: none;}", doc[0].cssRules.length);
        
        if(div.className) doc[0].insertRule("." + div.className + "::-webkit-scrollbar {display: none;}", doc[0].cssRules.length);
        // console.log(div)
        // window.div = div;

        // Adding keyframe
        doc[0].insertRule("@keyframes fall { 0% { transform: translateY(50px) " + rotate1 + "}100% { transform: translateY(" + (parseInt(getComputedStyle(div).height) - (parseInt(getComputedStyle(div).height) * 10 / 100)) + "px) " + rotate2 + "}}", doc[0].cssRules.length);

        /* END OF KEY FRAMES */
    }

    /* END OF HELPER FUNCTIONS */

    /* CODE FOR THE MASTER FALL */
    // SnowFall.Master = function(obj) {
    //     self = this;

    //     self.container = obj.container;
    //     self.numberOfElem = obj.density;
    //     self.speed = obj.speed;
    // }



    /* CODE FOR THE IMAGE FALL */
    SnowFall.Image = function(obj) {
        self = this;

        self.container = obj.container;
        self.size = obj.size;
        self.src = obj.src;
        self.speed = obj.speed || default_values.speed;
        self.density = obj.density || default_values.density;
        
    }

    /* LET SNOWFALL.IMAGE INHERIT THE PROTOTYPE OF MASTER */
    // SnowFall.Image.prototype = Object.create(SnowFall.Master.prototype);
    // SnowFall.Image.prototype.constructor = SnowFall.Image;

    SnowFall.Image.prototype.init = function() {

        function start() {

            /* Cache Image First */
            // imgCache(self.src);

            // Then perform the real magic
            // debugger;
            const con = document.querySelector("." + self.container);
            if(!con) throw "No container for display";
            con.innerHTML = "";
            div = document.createElement("div");
            div.setAttribute("class", "snow-main");
            div.style.setProperty("height", getComputedStyle(con).height);
            div.style.setProperty("width", getComputedStyle(con).width);
            div.style.setProperty("text-align", "left");
            con.appendChild(div)


            let numberOfElem = self.density;

            let i = 0;

            injectCSS(div, "rotate");

            setInterval(function() {
                if(i < numberOfElem) {
                    // i = (Math.random() * 10) * 10;
                    i = Math.random() * parseInt(getComputedStyle(div).width) - (parseInt(getComputedStyle(div).width) * 10 / 100);
                    // console.log(i);
                    let elem = document.createElement("img");

                    /* CODE FOR STYLING GOES HERE */

                    elem.setAttribute("src", self.src);
                    elem.style.setProperty("height", self.size + "px");
                    elem.style.setProperty("width", self.size + "px");
                    elem.setAttribute("class", "snowfall-circs");
                    // elem.style.setProperty("margin", `0 ${i * 10}px`);
                    elem.style.setProperty("margin", "0 " + i + "px");
                    
                    elem.onanimationend = function() {
                        div.removeChild(elem);
                    }
                    div.appendChild(elem);            
                } else {
                    i = 0;
                }
            }, self.speed);
        }
        
        window.addEventListener("load", start);
        window.addEventListener("resize", start);
    }   

    /* CODE FOR THE TEXT FALL */
    SnowFall.Text = function(obj) {
        self = this;

        self.container = obj.container;
        self.text = obj.text;
        self.size = obj.size || default_values.size;
        self.color = obj.color || default_values.color;
        self.density = obj.density || default_values.density;
        self.speed = obj.speed || 1000;

    }

    SnowFall.Text.prototype.init = function() {

        function start() {
            const con = document.querySelector("." + self.container);
            if(!con) throw "No container for display";
            con.innerHTML = "";
            div = document.createElement("div");
            div.style.setProperty("height", getComputedStyle(con).height);
            div.style.setProperty("width", getComputedStyle(con).width);
            div.style.setProperty("text-align", "left");
            con.appendChild(div)


            let numberOfElem = 80;

            let i = 0;

            injectCSS(div, "rotate");

            setInterval(function() {
                if(i < numberOfElem) {
                    i = Math.random() * parseInt(getComputedStyle(div).width) - (parseInt(getComputedStyle(div).width) * 10 / 100);
                    let elem = document.createElement("span");

                    /* CODE FOR STYLING GOES HERE */

                    // elem.setAttribute("src", `${self.src}`);
                    // elem.style.setProperty("height", `${self.size}px`);
                    // elem.style.setProperty("width", `${self.size}px`);
                    elem.style.setProperty("font-size", self.size + "px");
                    elem.style.setProperty("color", self.color);
                    elem.setAttribute("class", "snowfall-circs");
                    elem.style.setProperty("margin", "0 " + i + "px");
                    if(self.text) elem.innerText = self.text;
                    else throw "The value of supposed text display was not passed";
                    
                    
                    elem.onanimationend = function() {
                        div.removeChild(elem);
                    }
                    div.appendChild(elem);            
                } else {
                    i = 0;
                }
            }, self.speed);
        }
        
        window.addEventListener("load", start);
        window.addEventListener("resize", start);
    }


    /* CODE FOR THE SVG FALL */
    SnowFall.Svg = function(obj) {
        self = this;

        self.container = obj.container;
        self.density = obj.density || 80;
        self.particleSize = obj.particleSize || 2.5;
        self.containerWidth = obj.containerWidth;
        self.containerHeight = obj.containerHeight;
        self.color = obj.color || "rgb(143, 148, 173)";
        self.background = obj.background || "linear-gradient(180deg, rgb(13, 19, 47), rgb(38, 62, 168))";
        self.speed = obj.speed || 300;
    }

    SnowFall.Svg.prototype.init = function() {
        function start() {
            const con = document.querySelector("." + self.container);
            if(!con) throw "Error: No container for display";
            con.innerHTML = "";
            con.style.setProperty("width", self.containerWidth);
            con.style.setProperty("height", self.containerHeight);
            const svgCon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            // svgCon.setAttributeNS("http://www.w3.org/2000/svg", "width", self.containerWidth);
            // svgCon.setAttributeNS("http://www.w3.org/2000/svg", "height", self.containerHeight);
            svgCon.style.width = "100%";
            svgCon.style.height = "100%";
            svgCon.style.setProperty("background", self.background);
            con.appendChild(svgCon);
            // debugger;
            let numberOfElem = self.density;

            let i = 0;

            injectCSS(con);

            setInterval(() => {
                if(i < numberOfElem) {
                    i = (Math.random() * 10) * 10;
                    let elem = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                    elem.setAttribute("cx", 10 * i + i);
                    elem.setAttribute("cy", "0");
                    elem.setAttribute("r", self.particleSize);
                    elem.setAttribute("class", "snowfall-circs");
                    elem.setAttribute("fill", self.color);

                    elem.onanimationend = () => {
                        svgCon.removeChild(elem);
                    }
                    svgCon.appendChild(elem);            
                } else {
                    i = 0;
                }
            }, self.speed);
        }

        window.addEventListener("load", start);
        window.addEventListener("resize", start);
    }



    /* CODE FOR THE ICON FALL */
    SnowFall.Icon = function(obj) {
        self = this;

        self.container = obj.container;
        self.density = obj.density || 80;
        self.icon = obj.tagIcon;
        self.speed = obj.speed || 500;
        self.color = obj.color || "whitesmoke";
        self.background = obj.background || "black";
    }

    SnowFall.Icon.prototype.init = function() {
        function start() {
            const con = document.querySelector("." + self.container);
            if(!con) throw "Error: No container for display";
            con.innerHTML = "";
            div = document.createElement("div");
            div.style.setProperty("height", getComputedStyle(con).height);
            div.style.setProperty("width", getComputedStyle(con).width);
            div.style.setProperty("text-align", "left");
            con.appendChild(div)


            let numberOfElem = 80;

            let i = 0;

            injectCSS(div, "rotate");

            setInterval(function() {
                if(i < numberOfElem) {
                    i = Math.random() * parseInt(getComputedStyle(div).width) - (parseInt(getComputedStyle(div).width) * 10 / 100);
                    let elem = document.createElement("div");

                    /* CODE FOR STYLING GOES HERE */

                    // elem.setAttribute("src", `${self.src}`);
                    // elem.style.setProperty("height", `${self.size}px`);
                    // elem.style.setProperty("width", `${self.size}px`);
                    elem.style.setProperty("font-size", self.size + "px");
                    elem.style.setProperty("color", self.color);
                    elem.setAttribute("class", "snowfall-circs");
                    elem.style.setProperty("margin", "0 " + i + "px");
                    if(self.icon) elem.innerHTML = self.icon;
                    else throw "The value of supposed text display was not passed";
                    
                    
                    elem.onanimationend = function() {
                        div.removeChild(elem);
                        // try {
                        // } catch {}
                    }
                    div.appendChild(elem);            
                } else {
                    i = 0;
                }
            }, self.speed);
        }
        
        window.addEventListener("load", start);
        window.addEventListener("resize", start);
    }   

     /* CODE FOR THE CANVAS FALL */
     SnowFall.Canvas = function(obj) {
        self = this;

        self.container = obj.container;
        self.density = obj.density || 80;
        self.particleSize = obj.particleSize || 3;
        self.containerWidth = obj.containerWidth || "100%";
        self.containerHeight = obj.containerHeight || "600px";
        self.background = obj.background || "#333";
        self.color = obj.color || "#eee";
        self.speed = obj.speed || 1000;
    }

    SnowFall.Canvas.prototype.init = function() {
        var ctx, snow_flakes = [];
        var paddingX, paddingY;
        function start() {
            const con = document.querySelector(`.${self.container}`);
            if(!con) throw "Error: No container for display";
            con.innerHTML = "";

            /* Initializing special variables and functions */
            paddingY = innerHeight * 1.19 / 100;
            paddingX = innerWidth * 0.3 / 100;

            function makeSnow() {
                var i = Math.floor(Math.random() * div.width);
                snow_flakes.push({x: i, y: 0});
            }
    
            function clearRectangle() {
                ctx.clearRect(0, 0,div.width, div.height);
                ctx.fillStyle = self.background;
                ctx.fillRect(0, 0, div.width, div.height);
            }
    
            function moveSnow() {
                for(let i = 0; i < snow_flakes.length; i++) {
                    if(snow_flakes[i].y > (div.height - (paddingY * 10))) {
                        snow_flakes = snow_flakes.filter(function(j) {
                            return j !== snow_flakes[i];
                        });
                    } else {
                        snow_flakes[i].y += 1;
                    }
                }
                
                clearRectangle();
                
                ctx.fillStyle = self.color;
                ctx.strokeStyle = "transparent"
                snow_flakes.forEach(function(i) {
                    return drawCircle(ctx, i.x, i.y, 3);
                });
    
                requestAnimationFrame(moveSnow);
            }

            /* Div here becomes the canvas */

            div = canvasMaker(parseInt(getComputedStyle(con).width), parseInt(getComputedStyle(con).height));
            ctx = div.ctx;
            con.appendChild(div);

            ctx.fillStyle = self.background;
            ctx.fillRect(0, 0, div.width, div.height);

            // I used setInterval for making the snowflakes but requestAnimationFrame for moving them instead.
            setInterval(makeSnow, self.speed);

            requestAnimationFrame(moveSnow);
            
        }
        
        window.addEventListener("load", start);
        window.addEventListener("resize", start);
    }


    global.SnowFall = SnowFall;
    
})(window);
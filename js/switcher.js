//Eek global variables
var prevStyles = {};

loadJSON("config/switcher.json", function(data){
    var decoded = JSON.parse(data);
    setupSwitcher(decoded.styles);
});

//FadeOut and In taken from http://www.chrisbuttery.com/articles/fade-in-fade-out-with-javascript/
// fade out
function fadeOut(el,callback){
  el.style.opacity = 1;

  (function fade() {
    if ((el.style.opacity -= .1) < 0) {
      el.style.display = "none";
      callback();
    } else {
      requestAnimationFrame(fade);
    }
  })();
}

// fade in
function fadeIn(el, display){
  el.style.opacity = 0;
  el.style.display = display || "block";

  (function fade() {
    var val = parseFloat(el.style.opacity);
    if (!((val += .1) > 1)) {
      el.style.opacity = val;
      requestAnimationFrame(fade);
    }
  })();
}

function randIntRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setupSwitcher(categories){
    
    var removeStylePair = function(aPair) {
        Array.prototype.forEach.call(document.querySelectorAll(aPair[0]), function($el) {
            $el.classList.remove(aPair[1]);
        });
    }
    var applyStylePair = function(aPair) {
        Array.prototype.forEach.call(document.querySelectorAll(aPair[0]), function($el) {
            $el.classList.add(aPair[1]);
        });
    }
    var change = function(){
      fadeOut(document.body,pickStyle);
    }
    
    
    var pickStyle = function() {
        for (var style in categories) {
                var styleCategory = categories[style];
                if(style in prevStyles){
                    var oldRandom = prevStyles[style];
                    styleCategory[oldRandom].forEach(removeStylePair);
                }
                var randInt = randIntRange(0,styleCategory.length-1);
                prevStyles[style] = randInt;
                styleCategory[randInt].forEach(applyStylePair);
        }

        setTimeout(function(){
            fadeIn(document.body);
        },500)
        


    }
    
    document.body.addEventListener('click', change);
}

//Eek global variables
var prevStyles = {};

loadJSON("config/switcher.json", function(data){
    var decoded = JSON.parse(data);
    setupSwitcher(decoded.styles);
});

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
    }
    
    document.body.addEventListener('click', pickStyle);
}

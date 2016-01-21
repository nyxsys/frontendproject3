//Eek a global variable
var currentStyleIndex = 0;

loadJSON("config/switcher.json", function(data){
    var decoded = JSON.parse(data);
    setupSwitcher(decoded.styles);
});

function setupSwitcher(styles){
    
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
    
    var nextStyle = function() {
        var previousStyleIndex = currentStyleIndex; //-1 means none
        currentStyleIndex = (currentStyleIndex + 1) % styles.length;
        if (previousStyleIndex > -1) {
            styles[previousStyleIndex].forEach(removeStylePair);
        }
        styles[currentStyleIndex].forEach(applyStylePair);
    }
    
    document.body.addEventListener('click', nextStyle);
}

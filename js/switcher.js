var style1 = [['p', 'rounded'],['p','thick-border'], ['aside', 'column-1-3'], ['#zen-intro', 'column-2-3'], ['#zen-supporting', 'column-3-3'], ['.page-wrapper','relative']];
var style2 = [['aside', 'column-3-3'], ['#zen-intro', 'column-2-3'], ['#zen-supporting', 'column-1-3'], ['.page-wrapper','relative']];
var styles = [style1, style2];
var currentStyleIndex = -1;

var removeStylePair = function(aPair){
  Array.prototype.forEach.call(document.querySelectorAll(aPair[0]), function($el){
    $el.classList.remove(aPair[1]);
  });
}
var applyStylePair = function(aPair){
  Array.prototype.forEach.call(document.querySelectorAll(aPair[0]), function($el){
    $el.classList.add(aPair[1]);
  });
}

var nextStyle = function(){
  var previousStyleIndex = currentStyleIndex; //-1 means none
  currentStyleIndex = (currentStyleIndex + 1) % styles.length;
  if (previousStyleIndex > -1){
    styles[previousStyleIndex].forEach(removeStylePair);
  }
  styles[currentStyleIndex].forEach(applyStylePair);
}

document.body.addEventListener('click', nextStyle);
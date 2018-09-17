var traverseDomAndCollectElements = function(matchFunc, startEl) {
    // recorre el árbol del DOM y recolecta elementos que matchien en resultSet
    // usa matchFunc para identificar elementos que matchien
    var resultSet = [];
    if (typeof startEl === "undefined") {
        startEl = document.body;
    }
    if(matchFunc(startEl)){
        resultSet.push(startEl);
    }
    for(var i = 0; i < startEl.children.length; i++){
            var test = traverseDomAndCollectElements(matchFunc, startEl.children[i])
            resultSet = resultSet.concat(test)
    }
    return resultSet;
};
// Detecta y devuelve el tipo de selector
// devuelve uno de estos tipos: id, class, tag.class, tag
var selectorTypeMatcher = function(selector) {
    //console.log(selector['tagName']);
    if(selector[0] == "#"){
        return 'id';
    } else if(selector[0] == '.'){
        return 'class';
    } else if(selector.includes('.')){
        return 'tag.class';
    }else{
        return 'tag';
    }
};
// NOTA SOBRE LA FUNCIÓN MATCH
// recuerda, la función matchFunction devuelta toma un elemento como un
// parametro y devuelve true/false dependiendo si el elemento
// matchea el selector.
var matchFunctionMaker = function(selector) {
  var selectorType = selectorTypeMatcher(selector);
  var matchFunction;
  if (selectorType == "id") {
    // define matchFunction para id
    function matchFunction(param){
        if(selector == ('#' + param.id)){
            return true;
        } else {
            return false
        }
    }
  } else if (selectorType === "class") {
    // define matchFunction para class
    function matchFunction(param){
        //var classes = param.className.split(' ');
    //    if(classes.indexOf)
        //console.log(classes, selector, param.className);
    //    console.log(selector, param.className)
        if(selector == '.'+ param.className){
            return true;
        }
        //selector == .heading
        var selectorAyuda = selector.split('');
        var selectorAyuda2 = '';
        for(var i = 1; i < selectorAyuda.length ;i++){
            selectorAyuda2 += selectorAyuda[i];
        }
        var arrAyuda = param.className.split(' ');
        if(arrAyuda.indexOf(selectorAyuda2) >= 0){
            return true;
        } else {
            return false;
        }
    }
  } else if (selectorType === "tag.class") {
    // define matchFunction para tag.class
    function matchFunction(param){
        var ayudaTagClass = selector.split('.');
        var arrAyudaTagClass = param.className.split(' ');
        if(arrAyudaTagClass.indexOf(ayudaTagClass[1]) >=0){
            if(ayudaTagClass[0] == param.tagName.toLowerCase()){
                return true;
            }
        } else {
            return false;
        }
    }
  } else if (selectorType === "tag") {
    // define matchFunction para tag
    function matchFunction(param){
        //console.log(param.tagName)
        if(selector == param.tagName.toLowerCase()){
            return true
        } else {
            return false
        }
    }
  }
  return matchFunction;
};
var $ = function(selector) {
  var elements;
  var selectorMatchFunc = matchFunctionMaker(selector);
  elements = traverseDomAndCollectElements(selectorMatchFunc);
  return elements;
};


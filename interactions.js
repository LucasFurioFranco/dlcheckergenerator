dataLayerChecker = {
  "aways": [],
  "pages": {},
  "recurring": {}
}

window.interaction = (function() {
  var selectedScopeOption = {
    'name': 'aways',
    'object': dataLayerChecker.aways
  };

  function newPropertyType(type, displayOptionsId) {
    function _insertElement(parent, child, separator) {
      parent.appendChild(child);
      if (typeof separator !== "undefined") {
        parent.appendChild(document.createElement(separator));
      }
    }

    function _createLabel(str) {
      var elem = document.createElement('label');
      elem.innerText = str;
      return elem;
    }

    function _setObjectOptions(dataModel) {

    }


    var displayOptions = document.createElement('div');
    var parent = document.getElementById(displayOptionsId);
    var min = document.createElement('input');
    var max = document.createElement('input');
    var regex = document.createElement('input');
    min.type = max.type = regex.type = "text";
    var combobox = document.createElement('select');


    var h4 = document.createElement("h4");
    h4.innerText = "Property validation"
    _insertElement(displayOptions, h4);

    switch (type) {
      case 'String':
        min.placeholder = "min length";
        max.placeholder = "max length";
        regex.placeholder = "regex";
        _insertElement(displayOptions, min, 'br');
        _insertElement(displayOptions, max, 'br');
        _insertElement(displayOptions, regex, 'br');
        parent.innerHTML = displayOptions.innerHTML;
        break;

      case 'Number':
        min.placeholder = "min value";
        max.placeholder = "max value";
        _insertElement(displayOptions, min, 'br');
        _insertElement(displayOptions, max, 'br');
        parent.innerHTML = displayOptions.innerHTML;
        break;

      case 'Boolean':
        parent.innerHTML = "";
        break;

      case 'Vector':
        min.placeholder = "min length";
        max.placeholder = "max length";
        _insertElement(displayOptions, min, 'br');
        _insertElement(displayOptions, max, 'br');
        _insertElement(displayOptions, _createLabel('Vector of: '));
        _insertElement(displayOptions, combobox, 'br');
        parent.innerHTML = displayOptions.innerHTML;
        break;

      case 'Object':
        _insertElement(displayOptions, _createLabel('Object type'), 'br');
        _insertElement(displayOptions, combobox, 'br');
        parent.innerHTML = displayOptions.innerHTML;
        break;

      default:
        break;

    }
  }

  function _appendNewOptionInSelect(select, str) {
    var option = document.createElement('option');
    option.name = str;
    option.innerText = str;
    select.appendChild(option);
  }

  /*variável: dataLayerChecker*/
  function _getScopeOptions() {
    var elem = document.createElement('select');
    var append = function(x) {
      _appendNewOptionInSelect(elem, x);
    }
    append("aways");
    Object.keys(dataLayerChecker.pages).forEach(append);
    Object.keys(dataLayerChecker.recurring).forEach(append);
    return elem;
  }

  function getVectorOptions(){

  }

  function importModel(txtAreaId){
    var elem = document.getElementById(txtAreaId);
    var text = elem.value.trim();
    try{
      dataLayerChecker = JSON.parse(text);
    }catch(er){
      alert("Formato não suportado");
    }
  }

  function refreshScopeOptions(selectId){
    document.getElementById(selectId).innerHTML = _getScopeOptions().innerHTML;
  }

  function selectScope(str){
    if(str==="aways"){
      selectedScopeOption = {
        'name': 'aways',
        'object': dataLayerChecker.aways
      };
      return selectedScopeOption;
    }
    else{
      if(dataLayerChecker.pages[str]){
        selectedScopeOption.name = str;
        selectedScopeOption.object = dataLayerChecker.pages[str];
        return selectedScopeOption;
      }
      else if(dataLayerChecker.recurring[str]){
        selectedScopeOption.name = str;
        selectedScopeOption.object = dataLayerChecker.recurring[str];
        return selectedScopeOption;
      }
    }
    return {};
  }

  function getSelectedScope(){
    return JSON.parse(JSON.stringify(selectedScopeOption));
  }

  function _getScopeOptions() {
    var elem = document.createElement('select');
    var append = function(x) {
      _appendNewOptionInSelect(elem, x);
    }
    append("aways");
    Object.keys(dataLayerChecker.pages).forEach(append);
    Object.keys(dataLayerChecker.recurring).forEach(append);
    return elem;
  }

  function addProperty(){
    
  }

  return {
    newPropertyType: newPropertyType,
    importModel: importModel,
    refreshScopeOptions: refreshScopeOptions,
    getVectorOptions: getVectorOptions,
    selectScope: selectScope,
    getSelectedScope: getSelectedScope
  };
})();

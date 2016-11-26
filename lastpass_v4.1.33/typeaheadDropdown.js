TypeaheadDropdown=function(d,a,b){this.hint=this.hintElement=null;this.autoCompleteBlurs=LPTools.getOption(b,"autoCompleteBlurs",!0);DropdownInput.call(this,d,a,b);var c=this;c.getElement().bind("keydown",function(a){if(c.dropdownEnabled)switch(a.keyCode||a.which){case 9:c.autocomplete(a);break;case 27:c.shown&&(c.hide(),a.stopPropagation(),a.preventDefault())}});c.optionFocusHandler=function(a){a=c.options[c.getDropdownValue(a)];var b=c.inputObject.getValue();c.queryMatches(a,b)?c.setHint(b,a):c.clearHint()}};
TypeaheadDropdown.prototype=Object.create(DropdownInput.prototype);TypeaheadDropdown.prototype.constructor=TypeaheadDropdown;
(function(){TypeaheadDropdown.prototype.adjustView=function(){DropdownInput.prototype.adjustView.apply(this,arguments);var a=this.inputObject.getElement(),b=$(this.hintElement.parentElement);b.css({"line-height":a.css("height"),"padding-left":a.css("padding-left"),"padding-right":a.css("padding-right"),"font-weight":a.css("font-weight")});"border-box"===a.css("box-sizing")&&b.css({left:a.css("border-left-width"),right:a.css("border-right-width")})};TypeaheadDropdown.prototype.build=function(){DropdownInput.prototype.build.apply(this,
arguments);var a=$(LPTools.createElement("div","dropdownHint"));this.hintElement=LPTools.createElement("span");a.append(this.hintElement);var b=this.inputObject.getElement(),c=$(LPTools.createElement("div","relative"));b.before(c);c.append(a);c.append(b);b.prop("readonly",!1)};TypeaheadDropdown.prototype.autocomplete=function(a){this.hint&&(this.setValue(this.hint.value),this.autoCompleteBlurs||(a.preventDefault(),a.stopPropagation()))};TypeaheadDropdown.prototype.getDropdownClass=function(){return"typeaheadDropdown"};
TypeaheadDropdown.prototype.clear=function(){DropdownInput.prototype.clear.apply(this,arguments);this.dynamic&&this.setOptions([])};TypeaheadDropdown.prototype.default=function(){DropdownInput.prototype.default.apply(this,arguments);this.updateDropdown("")};TypeaheadDropdown.prototype.hide=function(){DropdownInput.prototype.hide.apply(this);this.clearHint()};TypeaheadDropdown.prototype.setHint=function(a,b){0<a.length?(this.hintElement.textContent=a+b.label.substring(Math.min(a.length,b.label.length)),
this.hint=b):this.clearHint()};TypeaheadDropdown.prototype.clearHint=function(){this.hintElement.textContent="";this.hint=null};var d=function(a,b){a=a.get(0);var c=a.value,g=a.selectionStart||0,f=a.selectionEnd||0,e=c.substring(0,g),d=c.substring(f,c.length);g===f&&(0<g&&8===b?e=e.substring(0,e.length-1):f<c.length&&46===b&&(d=d.substring(1)));"number"!==typeof b&&(e+=b);return e+d};TypeaheadDropdown.prototype.handleKeypress=function(a){this.updateDropdown(d(this.inputObject.getElement(),a))};TypeaheadDropdown.prototype.handleDelete=
function(a){this.updateDropdown(d(this.inputObject.getElement(),a))};TypeaheadDropdown.prototype.handleDownArrow=function(){this.show();LPTools.setNavIndex(0)};DropdownInput.prototype.getKeyboardNavigationFocusHandler=function(){return this.optionFocusHandler};TypeaheadDropdown.prototype.updateDropdown=function(a){var b=!1,c=!1,d=this.dropdownElement.children().first();d.empty();for(var f in this.options){var e=this.options[f];this.queryMatches(e,a,!0)&&(d.append(e.element),c=!0,!b&&this.queryMatches(e,
a)&&(this.setHint(a,e),b=!0))}b||this.clearHint();c?this.shown?this.addKeyBoardNavigation():a&&this.show():this.hide()}})();
var CustomNoteTemplateDialog=function(f){Dialog.call(this,f,{closeButtonEnabled:!0,maximizeButtonEnabled:!0,buttonAlign:this.RIGHT_ALIGN})};CustomNoteTemplateDialog.prototype=Object.create(Dialog.prototype);CustomNoteTemplateDialog.prototype.constructor=CustomNoteTemplateDialog;
(function(){var f=function(a,b){DialogInput.Input.call(this,void 0,b);this.fields=[];this.hasNotes=!1;this.container=a};f.prototype=Object.create(DialogInput.Input.prototype);f.prototype.constructor=f;f.prototype.validate=function(){var a=!0;if(0<this.fields.length){var b={},c,d,e;c=0;for(d=this.fields.length;c<d;++c)e=this.fields[c],b[e.text]=b.hasOwnProperty(e.text)?b[e.text]+1:1;c=0;for(d=this.fields.length;c<d;++c)e=this.fields[c],""===e.text?(e.input.addError(Strings.translateString("%1 is required.",
Strings.translateString("Field Title"))),a=!1):1<b[e.text]&&(e.input.addError(Strings.translateString("Field Title: %1 is used more than once.",e.text)),a=!1)}else dialogs.alert.open({title:Strings.Vault.ERROR,text:Strings.translateString("Template must contain at least one field.")}),a=!1;return a};f.prototype.clear=function(){DialogInput.ErrorDisplayInput.prototype.clear.apply(this,arguments);for(var a=0,b=this.fields.length;a<b;++a)this.fields[a].input.clear();this.fields=[];this.hasNotes=!1;this.build()};
f.prototype.hasError=function(){for(var a=0,b=this.fields.length;a<b;++a)if(this.fields[a].input.hasError())return!0;return!1};f.prototype.clearErrors=function(){for(var a=0,b=this.fields.length;a<b;++a)this.fields[a].input.clearErrors()};f.prototype.getValue=function(){for(var a=[],b=0,c=this.fields.length;b<c;++b){var d=this.fields[b];a.push({text:d.text,type:d.type})}return a};f.prototype.addField=function(a){if("textarea"!==a||!this.hasNotes){var b={text:"textarea"===a?"Notes":"",type:a,input:new DialogInput.Input(null,
this.dialog)};this.hasNotes?this.fields.splice(this.fields.length-1,0,b):this.fields.push(b);"textarea"===a&&(this.hasNotes=!0);this.build()}else dialogs.alert.open({title:Strings.Vault.ERROR,text:Strings.translateString("You may only have one Notes field in a template.")})};f.prototype.removeField=function(a){"textarea"===this.fields[a].type&&(this.hasNotes=!1);this.fields.splice(a,1);this.build()};f.prototype.dropField=function(a,b){for(var c=this.fields[a],d=[],e=0,f=this.fields.length;e<f;++e)b===
e&&d.push(c),a!==e&&d.push(this.fields[e]);this.fields=d;this.build()};var h=function(a){var b;switch(a){case "text":b=new DialogInput.TextInput;break;case "password":b=new DialogInput.PasswordInput;break;case "textarea":b=new DialogInput.TextArea;break;case "monthDayYear":b=new DialogInput.AlphaDateInput;break;case "monthYear":b=new DialogInput.AlphaDateInput("",{includeDay:!1});break;case "textWithCopy":b=new DialogInput.TextInput("",void 0,{inputButton:Strings.translateString("Copy")})}a=b.buildInput();
$(a).find("input,button").addBack("input").prop("disabled",!0);return a},g,j=function(a,b,c,d){c.find(".customFieldName").bind("change",function(){b&&(b.text=this.value)});c.find(".customFieldName").bind("focus",function(){c.prop("draggable",!1)});c.find(".customFieldName").bind("blur",function(){c.prop("draggable",!0)});c.find(".removeFieldButton").bind("click",function(){a.removeField(d)});c.bind("dragstart",function(a){g=d;"function"===typeof a.originalEvent.dataTransfer.setData&&a.originalEvent.dataTransfer.setData("text/plain",
"")});c.bind("dragover",function(a){g!==d&&a.preventDefault()});c.bind("dragenter",function(a){g!==d&&$(a.currentTarget).toggleClass("dragTarget")});c.bind("dragleave",function(a){g!==d&&$(a.currentTarget).toggleClass("dragTarget")});c.bind("drop",function(b){b.preventDefault();a.dropField(g,d)})};f.prototype.build=function(){this.container.empty();for(var a=0;this.fields&&a<this.fields.length;a++){var b=this.fields[a],c=$("#fieldTemplate").clone();b.input.setElement(c.find(".customFieldName"));"textarea"===
b.type&&(c.attr("draggable",!1),c.find(".dialogInput").prop("disabled",!0));c.find(".fieldTemplate").prepend(h(b.type));j(this,this.fields[a],c,a);c.attr("id","");c.attr("fieldType",b.type);c.attr("fieldName",b.text);$($(".customFieldName",c)[0]).val(b.text);this.container.append(c)}this.dialog.performValidate(this.dialog.getData(),{errorsOnly:!0})};CustomNoteTemplateDialog.prototype.open=function(a){Dialog.prototype.open.call(this,$.extend(a,{title:a&&a.vaultItem?Strings.translateString("Edit Custom Template"):
Strings.translateString("New Custom Template")}))};CustomNoteTemplateDialog.prototype.initialize=function(a){Dialog.prototype.initialize.apply(this,arguments);this.inputFields.fields=new f(a.find(".fieldsContainer"),this);var b=this,c=$("#actionOptionMenu");b.hideDropDown=function(){c.hide()};$("#addTextButton").bind("click",function(){b.inputFields.fields.addField("text")});$("#addNotesButton").bind("click",function(){b.inputFields.fields.addField("textarea")});$("#addTextWithCopyButton").bind("click",
function(){b.inputFields.fields.addField("textWithCopy")});$("#addMonthDayYearButton").bind("click",function(){b.inputFields.fields.addField("monthDayYear")});$("#addMonthYearButton").bind("click",function(){b.inputFields.fields.addField("monthYear")});$("#addPasswordButton").bind("click",function(){b.inputFields.fields.addField("password")});$("#actionOption, #actionOptionMenu").bind("click",function(a){c.toggle();a.preventDefault();a.stopPropagation()});a.bind("click",function(){b.hideDropDown()})};
CustomNoteTemplateDialog.prototype.close=function(){this.hideDropDown();return Dialog.prototype.close.apply(this,arguments)};CustomNoteTemplateDialog.prototype.validate=function(a){var b=Dialog.prototype.validate.apply(this,arguments);""===a.title&&(this.inputFields.title.addError(Strings.translateString("%1 is required.",Strings.translateString("Name"))),b=!1);for(var c=LPProxy.getCustomNoteTemplates(),d=0,e=c.length;d<e;++d)if(a.title===c[d].title){this.inputFields.title.addError(Strings.translateString("%1 is already used.",
a.title));b=!1;break}return b};CustomNoteTemplateDialog.prototype.handleSubmit=function(a){LPRequest.makeRequest(LPProxy.saveCustomNoteTemplate,{params:a,success:function(a){Topics.get(Topics.SECURENOTE_TEMPLATE_ADDED).publish(a)}})}})();
"undefined"!==typeof LPPlatform&&LPPlatform.addEventListener(document,"keydown",function(a){try{switch(a.keyCode||a.which){case 13:"checkbox"!==a.target.type?Topics.get(Topics.ENTER).publish(a):a.target.checked=!a.target.checked;break;case 27:Topics.get(Topics.ESCAPE).publish(a);break;case 37:Topics.get(Topics.LEFT_ARROW).publish(a);break;case 38:Topics.get(Topics.UP_ARROW).publish(a);break;case 39:Topics.get(Topics.RIGHT_ARROW).publish(a);break;case 40:Topics.get(Topics.DOWN_ARROW).publish(a)}}catch(g){LPPlatform.logException(g)}});
LPTools={};
(function(a){var g=[];a.setDragItems=function(a){g=a};a.getDragItems=function(){return g};a.buildItemButton=function(h){var b=Constants.ACTION_BUTTONS[h];return a.createElement("button",{"class":"itemButton "+b.css,vaultaction:h,title:Strings.Vault[b.title],allowmultiple:!1})};a.setupMiddleEllipsis=function(a){var b=a.find(".textOverflowContainer"),c=Math.ceil(b.get(0).children[0].getBoundingClientRect().width);a=c+Math.ceil(a.find(".textTail").get(0).getBoundingClientRect().width);c=a-c;b.css("max-width",
a);b.css("padding-right",c);b.css("margin-right",-c)};a.requireBinary=function(a){bg.have_binary()?a():LPPlatform.supportsBinary()?dialogs.confirmation.open({title:Strings.translateString("Install Binary Component"),text:Strings.translateString("This feature requires the binary version of this browser extension. Would you like to install it now?"),handler:function(){bg.install_binary()}}):dialogs.alert.open({title:Strings.translateString("Not Supported"),text:Strings.translateString("This feature requires an external binary component, which is currently not supported on this platform.")})};
a.isType=function(a,b){return Object.prototype.toString.call(a)==="[object "+b+"]"};a.getURLParams=function(){var a={},b=document.location.href.split("?");if(2===b.length)for(var b=b[1].split("&"),c=0;c<b.length;++c){var d=b[c].split("=");2===d.length&&(a[d[0]]=d[1])}return a};a.setContent=function(h,b){h.empty();if(b)if("string"===typeof b){for(var c=b.indexOf("<br/>");-1<c;)h.append(document.createTextNode(b.substring(0,c))),h.append(document.createElement("br")),b=b.substring(c+5),c=b.indexOf("<br/>");
h.append(document.createTextNode(b))}else if(a.isType(b,"Array"))for(var c=0,d=b.length;c<d;++c){var e=b[c];"string"===typeof e&&(e=a.createElement("p","dialogText",e));h.append(e)}else h.append(b)};a.hideContextMenu=function(h){null!==h&&(h.removeClass("bottomAligned"),h.hide(),a.removeKeyBoardNavigation())};a.displayContextMenu=function(a,b){var c=$(b);a.clientY>window.innerHeight/2?(c.addClass("bottomAligned"),c.css("bottom",window.innerHeight-a.clientY),c.css("top","")):(c.css("top",a.clientY),
c.css("bottom",""));c.css("left",a.clientX);c.show();return c};a.getProperties=function(a){var b=[],c;for(c in a)b.push(c);return b};var f=function(h,b,c){return function(){"function"===typeof h&&h();a.openAlerts(b,c)}};a.openAlerts=function(a,b){if(0<a.length){var c=a.shift();$.extend(c,{handler:f(c.handler,a,b),closeHandler:f(c.closeHandler,a,b)});dialogs[c.type].open(c)}else b&&b()};a.buildDialogItemContainer=function(h){for(var b=a.createElement("div","dialogItemContainer noSelect"),c={display:VaultItemBaseDisplay.prototype.DISPLAY_LIST,
allowDrag:!1,additionalItemClasses:"dialogItem noItemButtons"},d=0,e=h.length;d<e;++d){var g=h[d].newDisplayObject();b.appendChild(g.build(c))}return b};a.buildEmptyPlaceholder=function(h,b,c){return"ul"===c.tagName.toLocaleLowerCase()?a.createElement("li","emptyPlaceholder "+b,h):a.createElement("div","emptyPlaceholder "+b,h)};a.get_gmt_timestamp=function(){var a=(new Date).getTime();return parseInt(a/1E3)};a.ContextMenuItem=function(h,b){this.getAction=function(){return h};this.build=function(c,
d,e){var g=void 0!==b&&"undefined"!==typeof b.submenu&&b.submenu,f=null;void 0!==b&&("undefined"!==typeof b.divider&&b.divider)&&(f="divider");g&&(f+=" subMenuOption");f=a.createElement("li",{"class":f,vaultaction:h});f.textContent=void 0===b||"undefined"===typeof b.text?Strings.Vault[Constants.CONTEXT_MENU_ITEMS[h]]:b.text;c.appendChild(f);if(g){f.appendChild(a.createElement("div"));d=a.createElement("ul","subMenu");f.appendChild(d);var g=$(f),k=$(d),l=null,j=!1,m=function(){j&&(k.hide("fast"),a.addKeyBoardNavigation(c.children),
Topics.get(Topics.LEFT_ARROW).unsubscribe(m))},n=function(a){j=!0;e(a);Topics.get(Topics.LEFT_ARROW).subscribe(m)};g.bind("click",n);g.bind("mouseenter",function(a){l=setTimeout(function(){n(a)},200)});g.bind("mouseleave",function(){l&&clearTimeout(l);m()})}else LPPlatform.addEventListener(f,"click",d)}};a.parseUserSpecificMenu=function(h,b){for(var c=h.firstElementChild;c;){var d=c.getAttribute("user");if(null!==d){for(var d=d.split("|"),e=!0,g=0,f=d.length;g<f;++g)if(b===d[g]){e=!1;break}e?$(c).hide():
c.removeAttribute("style")}a.parseUserSpecificMenu(c,b);c=c.nextElementSibling}};a.buildSentShareItems=function(a,b){var c=[];if(b)for(var d=0,e=b.length;d<e;++d){var g=b[d];"1"===g.state?c.push(new AcceptedSentSharedItem(a,g)):"2"===g.state?c.push(new DeclinedSentSharedItem(a,g)):c.push(new PendingSentSharedItem(a,g))}return c};a.openShareDialog=function(h,b){if(h&&1===h.length&&void 0===b)LPRequest.makeDataRequest(LPProxy.getSentShareData,{params:{id:h[0].getID()},requestSuccessOptions:{closeDialog:!1},
success:function(b){a.openShareDialog(h,b)},error:function(){Topics.get(Topics.DIALOG_LOADED).publish()}}),Topics.get(Topics.DIALOG_LOADING).publish();else if(b&&!dialogs.share.loadedJS())dialogs.share.loadJS(function(){a.openShareDialog(h,b)});else{var c=b?a.buildSentShareItems(h[0],b.sent[h[0].getID()]):null;dialogs.share.open(h,c,b?b.friends:null)}};a.objectsToArray=function(){for(var a=[],b=0,c=arguments.length;b<c;++b){var d=arguments[b],e;for(e in d)a.push(d[e])}return a};a.createEventHandler=
function(a){return function(b){a.handleEvent(b)}};a.getAttribute=function(a,b,c){for(var d=b.getAttribute(c);null===d&&b!==a;)if(b=b.parentElement,null!==b)d=b.getAttribute(c);else break;return d};a.removeDOMChildren=function(a){if(a)for(var b=a.childNodes.length;b--;)a.removeChild(a.lastChild)};a.removeDOMChildrenFrom=function(a,b){if(a)for(;b;){var c=b;b=b.nextElementSibling;a.removeChild(c)}};a.createElement=function(a,b,c){var d=document.createElement(a);if("string"===typeof b||b instanceof Array)b=
{"class":b};if("input"===a||"textarea"===a)b=$.extend(b,{spellcheck:!1});if("object"===typeof b)for(var e in b){var g=b[e];if(void 0!==g&&null!==g){a=d;var f=e;g instanceof Array?a.setAttribute(f,g.join(" ")):a.setAttribute(f,g)}}void 0!==c&&(d.textContent=c);return d};a.addClass=function(a,b){if(null!==a){b instanceof Array&&(b=b.join(" "));var c=a.getAttribute("class");c&&(b=c+" "+b);a.setAttribute("class",b)}};a.getOption=function(a,b,c){a&&void 0!==a[b]&&(c=a[b]);return c};var d=null,e=-1,k=null,
j=null,m=null,l=null,n=null,p=function(a){return d&&-1<a&&a<d.length?d[a]:null},q=function(a,b){var c=p(e);c&&c.removeClass("hover");e=a;if(c=p(e))c.addClass("hover"),b&&(n&&n.focusHandler)&&n.focusHandler(c)},r=function(){l=!0;$(document.body).unbind("mousemove",r)};a.disableMouse=function(){l&&(l=!1,$(document.body).bind("mousemove",r))};var s=function(a){l&&(a=$(a.target),q(parseInt(a.closest("[navindex]").attr("navindex"))))},t=function(a){var b=a.offsetParent();b.scrollTop(Math.max(b.scrollTop()+
b.height(),b.scrollTop()+a.position().top+a.outerHeight())-b.height())},u=function(a){var b=a.offsetParent();b.scrollTop(Math.min(b.scrollTop(),b.scrollTop()+a.position().top))},v=function(h){var b=null;e===d.length-1?(b=0,u(d[b])):(b=e+1,t(d[b]));q(b,!0);a.disableMouse();h.preventDefault();h.stopPropagation()},w=function(h){var b=null;1>e?(b=d.length-1,t(d[b])):(b=e-1,u(d[b]));q(b,!0);a.disableMouse();h.preventDefault();h.stopPropagation()},x=function(a){if(a){var b=new Event(k,{bubbles:!0});a.get(0).dispatchEvent(b)}},
y=function(){var d=p(e);if(d){if(j){var b=d.find(j);b.length&&(d=b)}x(d);a.disableMouse()}return!1},z=function(){x(p(e));return!1};a.setNavIndex=function(a){q(a);(a=p())&&a.get(0).scrollIntoView()};a.getNavIndex=function(){return e};a.addKeyBoardNavigation=function(h,b){if(0<h.length){d=[];e=-1;null===l&&(l=!0);k=a.getOption(b,"mouseEvent","click");j=a.getOption(b,"rightArrowSelector",null);m=a.getOption(b,"useRightArrow",!0);n=b;for(var c=0,g=h.length;c<g;++c){var f=$(h[c]);f.attr("navindex",c);
f.unbind("mouseenter",s);f.bind("mouseenter",s);f.hasClass("hover")&&(e=c);d.push(f)}Topics.get(Topics.DOWN_ARROW).subscribe(v);Topics.get(Topics.UP_ARROW).subscribe(w);Topics.get(Topics.ENTER).subscribeFirst(z);m&&Topics.get(Topics.RIGHT_ARROW).subscribe(y);a.getOption(b,"selectFirst",!1)&&a.setNavIndex(0)}else a.removeKeyBoardNavigation()};a.removeKeyBoardNavigation=function(){d=null;Topics.get(Topics.DOWN_ARROW).unsubscribe(v);Topics.get(Topics.UP_ARROW).unsubscribe(w);Topics.get(Topics.RIGHT_ARROW).unsubscribe(y);
Topics.get(Topics.ENTER).unsubscribe(z)};a.addZebraStriping=function(a){a=$(a).find("tr");for(var b=0,c=a.length;b<c;++b)0!==b%2?$(a[b]).addClass("odd"):$(a[b]).removeClass("odd")};var A=function(a){a=a.target.previousElementSibling;a.checked=!a.checked};a.buildCheckbox=function(d,b){var c=b?b.checkboxAttributes:void 0,c=$.extend(c,{"class":"checkbox",type:"checkbox"}),c=a.createElement("input",c),g=a.createElement("label",d,a.getOption(b,"text",void 0));a.getOption(b,"addClickHandler",!0)&&LPPlatform.addEventListener(g,
"click",A);var e=a.createElement("div");e.appendChild(c);e.appendChild(g);return e};a.buildRadioButton=function(d,b,c){d=a.createElement("input",{"class":"radio",type:"radio",name:d});b=a.createElement("label",b,c);LPPlatform.addEventListener(b,"click",A);c=a.createElement("div");c.appendChild(d);c.appendChild(b);return c};a.hasProperties=function(a){if(a)for(var b in a)return!0;return!1};a.createSelectElement=function(d,b){var c=a.createElement("select",b);$(c).addClass("dialogInput selectDropdown");
a.setSelectOptions(c,d);return c};a.setSelectOptions=function(d,b){a.removeDOMChildren(d);for(var c=0,g=b.length;c<g;++c){var e=b[c],f="object"===typeof e?e.value:e;d.appendChild(a.createElement("option",{value:f},"object"===typeof e&&e.label?e.label:f))}};var B=[{value:"-12:00,0",label:"(-12:00) "+Strings.translateString("International Date Line West")},{value:"-11:00,0",label:"(-11:00) "+Strings.translateString("Midway Island, Samoa")},{value:"-10:00,0",label:"(-10:00) "+Strings.translateString("Hawaii")},
{value:"-09:00,1",label:"(-09:00) "+Strings.translateString("Alaska")},{value:"-08:00,1",label:"(-08:00) "+Strings.translateString("Pacific Time (US & Canada)")},{value:"-07:00,0",label:"(-07:00) "+Strings.translateString("Arizona")},{value:"-07:00,1",label:"(-07:00) "+Strings.translateString("Mountain Time (US & Canada)")},{value:"-06:00,0",label:"(-06:00) "+Strings.translateString("Central America, Saskatchewan")},{value:"-06:00,1",label:"(-06:00) "+Strings.translateString("Central Time (US & Canada), Guadalajara, Mexico City")},
{value:"-05:00,0",label:"(-05:00) "+Strings.translateString("Indiana, Bogota, Lima, Quito, Rio Branco")},{value:"-05:00,1",label:"(-05:00) "+Strings.translateString("Eastern Time (US & Canada)")},{value:"-04:30,0",label:"(-04:30) "+Strings.translateString("Caracas")},{value:"-04:00,1",label:"(-04:00) "+Strings.translateString("Atlantic Time (Canada), Manaus, Santiago")},{value:"-04:00,0",label:"(-04:00) "+Strings.translateString("La Paz")},{value:"-03:30,1",label:"(-03:30) "+Strings.translateString("Newfoundland")},
{value:"-03:00,1",label:"(-03:00) "+Strings.translateString("Greenland, Brasilia, Montevideo")},{value:"-03:00,0",label:"(-03:00) "+Strings.translateString("Buenos Aires, Georgetown")},{value:"-02:00,1",label:"(-02:00) "+Strings.translateString("Mid-Atlantic")},{value:"-02:00,0",label:"(-02:00) "+Strings.translateString("South Georgia")},{value:"-01:00,1",label:"(-01:00) "+Strings.translateString("Azores")},{value:"-01:00,0",label:"(-01:00) "+Strings.translateString("Cape Verde Is.")},{value:"00:00,0",
label:"(00:00) "+Strings.translateString("Casablanca, Monrovia, Reykjavik")},{value:"00:00,1",label:"(00:00) "+Strings.translateString("GMT: Dublin, Edinburgh, Lisbon, London")},{value:"+01:00,1",label:"(+01:00) "+Strings.translateString("Amsterdam, Berlin, Rome, Vienna, Prague, Brussels")},{value:"+01:00,0",label:"(+01:00) "+Strings.translateString("West Central Africa")},{value:"+02:00,1",label:"(+02:00) "+Strings.translateString("Amman, Athens, Istanbul, Beirut, Cairo, Jerusalem")},{value:"+02:00,0",
label:"(+02:00) "+Strings.translateString("Harare, Pretoria")},{value:"+03:00,1",label:"(+03:00) "+Strings.translateString("Baghdad")},{value:"+03:00,0",label:"(+03:00) "+Strings.translateString("Kuwait, Riyadh, Nairobi, Moscow, St. Petersburg, Volgograd")},{value:"+03:30,1",label:"(+03:30) "+Strings.translateString("Tehran")},{value:"+04:00,0",label:"(+04:00) "+Strings.translateString("Abu Dhabi, Muscat, Tbilisi, Izhevsk")},{value:"+04:00,1",label:"(+04:00) "+Strings.translateString("Baku, Yerevan")},
{value:"+04:30,0",label:"(+04:30) "+Strings.translateString("Kabul")},{value:"+05:00,1",label:"(+05:00) "+Strings.translateString("GMT+5")},{value:"+05:00,0",label:"(+05:00) "+Strings.translateString("Islamabad, Karachi, Tashkent, Ekaterinburg")},{value:"+05:30,0",label:"(+05:30) "+Strings.translateString("Chennai, Kolkata, Mumbai, New Delhi, Sri Jayawardenepura")},{value:"+05:45,0",label:"(+05:45) "+Strings.translateString("Kathmandu")},{value:"+06:00,0",label:"(+06:00) "+Strings.translateString("Astana, Dhaka, Novosibirsk")},
{value:"+06:00,1",label:"(+06:00) "+Strings.translateString("Almaty")},{value:"+06:30,0",label:"(+06:30) "+Strings.translateString("Yangon (Rangoon)")},{value:"+07:00,1",label:"(+07:00) "+Strings.translateString("GMT+7")},{value:"+07:00,0",label:"(+07:00) "+Strings.translateString("Bangkok, Hanoi, Jakarta, Krasnoyarsk")},{value:"+08:00,0",label:"(+08:00) "+Strings.translateString("Beijing, Hong Kong, Singapore, Taipei, Irkutsk")},{value:"+08:00,1",label:"(+08:00) "+Strings.translateString("Ulaan Bataar, Perth")},
{value:"+09:00,1",label:"(+09:00) "+Strings.translateString("GMT+9")},{value:"+09:00,0",label:"(+09:00) "+Strings.translateString("Seoul, Osaka, Sapporo, Tokyo, Yakutsk")},{value:"+09:30,0",label:"(+09:30) "+Strings.translateString("Darwin")},{value:"+09:30,1",label:"(+09:30) "+Strings.translateString("Adelaide")},{value:"+10:00,0",label:"(+10:00) "+Strings.translateString("Brisbane, Guam, Port Moresby, Vladivostok")},{value:"+10:00,1",label:"(+10:00) "+Strings.translateString("Canberra, Melbourne, Sydney, Hobart")},
{value:"+11:00,0",label:"(+11:00) "+Strings.translateString("Magadan, Solomon Is., New Caledonia")},{value:"+12:00,1",label:"(+12:00) "+Strings.translateString("Auckland, Wellington")},{value:"+12:00,0",label:"(+12:00) "+Strings.translateString("Fiji, Kamchatka, Marshall Is.")},{value:"+13:00,0",label:"(+13:00) "+Strings.translateString("Nuku'alofa")}];a.createTimezoneSelect=function(d){return a.createSelectElement(B,d)}})(LPTools);
Constants={ACTION_OPEN_MOVE_TO_SUB_FOLDER_MENU:"openMoveToSubFolderMenu",ACTION_OPEN_MOVE_TO_FOLDER_MENU:"openMoveToFolderMenu",ACTION_MOVE_TO_FOLDER:"moveToFolder",ACTION_SAVE:"save",ACTION_DELETE:"delete",ACTION_SHARE:"share",ACTION_COPY_USERNAME:"copyUsername",ACTION_COPY_PASSWORD:"copyPassword",ACTION_COPY_URL:"copyURL",ACTION_EDIT:"edit",ACTION_LAUNCH:"launch",ACTION_GO_TO_URL:"goToURL",ACTION_TOGGLE_OPEN:"toggleOpen",ACTION_RENAME:"rename",ACTION_ACCEPT:"acceptShare",ACTION_REJECT:"rejectShare",
ACTION_ENABLE:"enable",ACTION_TOGGLE_SELECT:"toggleSelect",ACTION_CREATE_SUB_FOLDER:"createSubFolder",ACTION_OPEN_ALL:"openAll",ACTION_OPEN_MORE_OPTIONS:"openMoreOptions",ACTION_COPY_NOTE:"copyNote",ACTION_FILL:"fillForm",ACTION_OPEN:"open",ACTION_REVOKE:"revoke",ACTION_EMAIL:"email",ACTION_CANCEL:"cancel",ACTION_REMOVE:"remove",ACTION_PURGE:"purge",ACTION_PURGE_SHARED_FOLDER:"purgeSharedFolder",ACTION_RESTORE:"restore",ACTION_RESTORE_SHARED_FOLDER:"restoreSharedFolder",ACTION_UNLINK:"unlink",ACTION_STOP_DOWNLOADING:"stopDownloading",
ACTION_START_DOWNLOADING:"startDownloading",ACTION_FILL_SITE:"fillSite",ACTION_CLONE:"clone",ACTION_ADD:"add",ACTION_MANAGE:"manage",ACTION_ACCESS:"access",ACTION_COPY_KEY:"copyKey",ACTION_DASHBOARD:"dashboard",ACTION_UPGRADE:"upgrade",USER_FREE:"Free User",USER_PREMIUM:"Premium User",USER_ENTERPRISE:"User",USER_ENTERPRISE_ADMIN:"Administrator",EmailAddressRegularExpression:/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*/g};
(function(a){a.ACTION_BUTTONS={};a.ACTION_BUTTONS[a.ACTION_EDIT]={title:"EDIT",css:a.ACTION_EDIT};a.ACTION_BUTTONS[a.ACTION_SHARE]={title:"SHARE",css:a.ACTION_SHARE};a.ACTION_BUTTONS[a.ACTION_DELETE]={title:"DELETE",css:a.ACTION_DELETE};a.ACTION_BUTTONS[a.ACTION_ACCEPT]={title:"ACCEPT",css:a.ACTION_ACCEPT};a.ACTION_BUTTONS[a.ACTION_REJECT]={title:"REJECT",css:a.ACTION_REJECT};a.ACTION_BUTTONS[a.ACTION_LAUNCH]={title:"LAUNCH",css:null};a.ACTION_BUTTONS[a.ACTION_ENABLE]={title:"ENABLE",css:null};a.ACTION_BUTTONS[a.ACTION_ACCESS]=
{title:"REQUEST_ACCESS",css:null};a.ACTION_BUTTONS[a.ACTION_REVOKE]={title:"REVOKE",css:a.ACTION_REJECT};a.ACTION_BUTTONS[a.ACTION_EMAIL]={title:"RESEND",css:a.ACTION_EMAIL};a.ACTION_BUTTONS[a.ACTION_CANCEL]={title:"CANCEL_INVITE",css:a.ACTION_REJECT};a.ACTION_BUTTONS[a.ACTION_REMOVE]={title:"REMOVE",css:a.ACTION_REJECT};a.ACTION_BUTTONS[a.ACTION_PURGE]={title:"PURGE",css:a.ACTION_DELETE};a.ACTION_BUTTONS[a.ACTION_PURGE_SHARED_FOLDER]={title:"PURGE",css:a.ACTION_DELETE};a.ACTION_BUTTONS[a.ACTION_RESTORE]=
{title:"RESTORE",css:a.ACTION_RESTORE};a.ACTION_BUTTONS[a.ACTION_RESTORE_SHARED_FOLDER]={title:"RESTORE",css:a.ACTION_RESTORE};a.ACTION_BUTTONS[a.ACTION_MANAGE]={title:"MANAGE",css:a.ACTION_EDIT};a.ACTION_BUTTONS[a.ACTION_UNLINK]={title:"UNLINK",css:a.ACTION_DELETE};a.CONTEXT_MENU_ITEMS={};a.CONTEXT_MENU_ITEMS[a.ACTION_EDIT]="EDIT";a.CONTEXT_MENU_ITEMS[a.ACTION_SHARE]="SHARE";a.CONTEXT_MENU_ITEMS[a.ACTION_DELETE]="DELETE";a.CONTEXT_MENU_ITEMS[a.ACTION_GO_TO_URL]="GO_TO_URL";a.CONTEXT_MENU_ITEMS[a.ACTION_COPY_USERNAME]=
"COPY_USERNAME";a.CONTEXT_MENU_ITEMS[a.ACTION_COPY_PASSWORD]="COPY_PASSWORD";a.CONTEXT_MENU_ITEMS[a.ACTION_COPY_URL]="COPY_URL";a.CONTEXT_MENU_ITEMS[a.ACTION_OPEN_MOVE_TO_FOLDER_MENU]="MOVE_TO_FOLDER";a.CONTEXT_MENU_ITEMS[a.ACTION_OPEN_MOVE_TO_SUB_FOLDER_MENU]="MOVE_TO_SUB_FOLDER";a.CONTEXT_MENU_ITEMS[a.ACTION_ACCEPT]="ACCEPT";a.CONTEXT_MENU_ITEMS[a.ACTION_REJECT]="REJECT";a.CONTEXT_MENU_ITEMS[a.ACTION_ENABLE]="ENABLE";a.CONTEXT_MENU_ITEMS[a.ACTION_RENAME]="RENAME_FOLDER";a.CONTEXT_MENU_ITEMS[a.ACTION_CREATE_SUB_FOLDER]=
"CREATE_SUB_FOLDER";a.CONTEXT_MENU_ITEMS[a.ACTION_OPEN_ALL]="OPEN_ALL";a.CONTEXT_MENU_ITEMS[a.ACTION_COPY_NOTE]="COPY_NOTE";a.CONTEXT_MENU_ITEMS[a.ACTION_COPY_KEY]="COPY_KEY";a.CONTEXT_MENU_ITEMS[a.ACTION_FILL]="FILL";a.CONTEXT_MENU_ITEMS[a.ACTION_OPEN]="OPEN";a.CONTEXT_MENU_ITEMS[a.ACTION_SAVE]="SAVE";a.CONTEXT_MENU_ITEMS[a.ACTION_REVOKE]="REVOKE";a.CONTEXT_MENU_ITEMS[a.ACTION_EMAIL]="RESEND";a.CONTEXT_MENU_ITEMS[a.ACTION_CANCEL]="CANCEL_INVITE";a.CONTEXT_MENU_ITEMS[a.ACTION_REMOVE]="REMOVE";a.CONTEXT_MENU_ITEMS[a.ACTION_PURGE]=
"PURGE";a.CONTEXT_MENU_ITEMS[a.ACTION_PURGE_SHARED_FOLDER]="PURGE";a.CONTEXT_MENU_ITEMS[a.ACTION_RESTORE]="RESTORE";a.CONTEXT_MENU_ITEMS[a.ACTION_RESTORE_SHARED_FOLDER]="RESTORE";a.CONTEXT_MENU_ITEMS[a.ACTION_UNLINK]="UNLINK_PERSONAL";a.CONTEXT_MENU_ITEMS[a.ACTION_STOP_DOWNLOADING]="STOP_DOWNLOADING";a.CONTEXT_MENU_ITEMS[a.ACTION_START_DOWNLOADING]="START_DOWNLOADING";a.CONTEXT_MENU_ITEMS[a.ACTION_FILL_SITE]="AUTO_FILL";a.CONTEXT_MENU_ITEMS[a.ACTION_CLONE]="CLONE";a.CONTEXT_MENU_ITEMS[a.ACTION_MANAGE]=
"MANAGE_FOLDER";a.CONTEXT_MENU_ITEMS[a.ACTION_ACCESS]="REQUEST_ACCESS";a.CONTEXT_MENU_ITEMS[a.ACTION_DASHBOARD]="OPEN_DASHBOARD";a.CONTEXT_MENU_ITEMS[a.ACTION_UPGRADE]="UPGRADE_PREMIUM";a.HISTORY_TYPES={PASSWORD:0,USERNAME:1,NOTE:2}})(Constants);
(function(a){a.fn.extend({LP_show:function(){this.removeClass("displaynone")},LP_hide:function(){this.addClass("displaynone")},LP_removeAttr:function(a){for(var f=0,d=this.length;f<d;++f)this.get(f).removeAttribute(a)},LP_addSearchHandlers:function(g,f){var d=a(LPTools.createElement("div","searchInputContainer"));this.before(d);d.append(this);var e="searchCloseButton";g&&(e+=" "+g);e=a(LPTools.createElement("div",{"class":e,title:Strings.translateString("Clear Search")}));d.append(e);var k,j=this;
e.bind("click",function(a){j.val("");a.stopPropagation();a.preventDefault()});this.LP_input("search",function(a){0<a.length?d.addClass("populated"):d.removeClass("populated");clearTimeout(k);k=setTimeout(function(){try{f(a)}catch(d){LPPlatform.logException(d)}},150)});return this},LP_createToggle:function(){for(var a=0,f=this.length;a<f;++a){var d=this.get(a);if("INPUT"===d.nodeName&&"checkbox"===d.getAttribute("type")&&"LABEL"===d.nextElementSibling.nodeName){var e=LPTools.createElement("div","toggleButton");
e.appendChild(LPTools.createElement("div"));d.nextElementSibling.appendChild(e)}}return this},LP_addPasswordEye:function(){var g=function(a,e,g){a.passwordShown=!1;a.attr("type","password");e.attr("title",Strings.Vault.SHOW_PASSWORD);e.removeClass("selected");g&&e.text(Strings.Vault.SHOW)},f=function(a,e,f){switch(a.attr("type")){case "password":a.passwordShown=!0;a.attr("type","text");e.attr("title",Strings.Vault.HIDE_PASSWORD);e.addClass("selected");f&&e.text(Strings.Vault.HIDE);break;case "text":g(a,
e,f)}f&&a.css("padding-right",e.outerWidth())};return function(d){this.addClass("password");var e=a(LPTools.createElement("div","relative"));this.before(e);e.append(this);e.css({margin:this.css("margin")});this.css("margin","0");var k=a(LPTools.createElement("button",{"class":"showPassword iconButton",title:Strings.Vault.SHOW_PASSWORD}));e.append(k);var j=this,m=LPTools.getOption(d,"checkPermissionHandler",null),l=LPTools.getOption(d,"textual",!1);l&&(k.addClass("textual"),k.text(Strings.Vault.SHOW),
j.one("focus",function(){j.css("padding-right",k.outerWidth())}));k.bind("click",function(){"password"===j.attr("type")&&m?m(function(){f(j,k,l)}):f(j,k,l)});j.hidePassword=function(){g(j,k,l)};LPTools.getOption(d,"includeGenerateButton",!1)&&(j.LP_input("passwordGenerate",function(a){a?e.removeClass("empty"):(j.hidePassword(),e.addClass("empty"))}),d=a(LPTools.createElement("button",{"class":"generatePassword iconButton",title:Strings.Vault.GENERATE_PASSWORD})),e.append(d),d.bind("click",function(){dialogs.generatePassword.open({input:j,
fillGenerated:!1,saveOptions:{source:"vault"}})}));this.val(this.val());return this}}(),LP_reflow:function(){for(var a=0;a<this.length;++a)this.get(a).offsetHeight;return this},LP_scrollParent:function(){var g;if(1===this.length)for(var f=this.get(0).parentElement;f;){var d=a(f);if("auto"===d.css("overflow")&&d.css("max-height")){g=f;break}f=f.parentElement}return a(g)},LP_input:function(a,f){var d=this;a=a?"."+a:"";d.unbind("keypress"+a);d.unbind("keyup"+a);d.unbind("input"+a);var e=function(a){a=
a.which;31<a&&f(d.val()+String.fromCharCode(a))};d.bind("keypress"+a,e);var k=function(a){switch(a.keyCode||a.which){case 8:case 46:f(d.val())}};d.bind("keyup"+a,k);var j=function(){d.unbind("keypress"+a,e);d.unbind("keyup"+a,k);d.unbind("input"+a,j)};d.bind("input"+a,j);d.bind("input"+a,function(){f(d.val())});var m=this.val;d.val=function(){1===arguments.length&&f(arguments[0]);return m.apply(d,arguments)}}})})(jQuery);
NotifyException=function(a){Topics.get(Topics.ERROR).publish(a);this.message=a;this.stack=Error().stack};NotifyException.prototype=Object.create(Error.prototype);NotifyException.prototype.name="InvalidArgumentException";NotifyException.prototype.constructor=NotifyException;AttachmentKeyException=function(){NotifyException.call(this,Strings.translateString("Could not decrypt attachment key."))};AttachmentKeyException.prototype=Object.create(NotifyException.prototype);
AttachmentKeyException.prototype.name="AttachmentKeyException";AttachmentKeyException.prototype.constructor=AttachmentKeyException;
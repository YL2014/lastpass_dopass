var oneMinuteSignup=function(){function l(a){if(0===a.origin.indexOf(e))if("ShowTour"===a.data.type)g&&!h&&(g.show(),h=!0);else if("GetApplications"===a.data.type){var d=$("#oneminutesignup iframe")[0],f=LPProxy.getAllModelItems().map(function(a){return{url:a._data.url,userName:a._data.unencryptedUsername}});d.contentWindow.postMessage({type:"SendApplications",applications:f},e)}else if("AddSiteToVault"===a.data.type)d=LPProxy.getGroupByName(a.data.account.group)||new DummyGroup(a.data.account.group,
null),(new Account).addFromDialog(a.data.account,d,{source:"vault"});else if("Collapse"===a.data.type)$("body").removeClass("oneminfull"),$("body").addClass("oneminsmall");else if("Expand"===a.data.type)$("body").removeClass("oneminsmall"),$("body").addClass("oneminfull");else if("Close"===a.data.type)$("body").removeClass("oneminsmall"),$("body").removeClass("oneminfull"),$("#oneminutesignup").empty();else if("ReminderDeleted"===a.data.type){if(d=c.filter(function(b){return b.id===a.data.reminder.id})[0])c.splice(c.indexOf(d),
1),0===c.length?$("#reminderCountContainer").hide():($("#reminderCountContainer").show(),$("#reminderCount").text(c.length))}else"RemindersAdded"===a.data.type&&(bg.set("g_reminders",bg.get("g_reminders").concat(a.data.reminders)),j())}function j(){c=bg.get("g_reminders");0===c.length?$("#reminderCountContainer").hide():($("#reminderCountContainer").show(),$("#reminderCount").text(c.length))}function k(a,d){if(bg.get("g_one_minute_signup_enabled")||bg.get("g_onemin_advert_enabled"))a=a||f.normal,
$.ajax({global:!1,type:"GET",dataType:"json",url:LPProxy.getBaseURL()+"lmiapi/clientconfig",success:function(g){var b=document.createElement("iframe");e=g["1minUiBaseUrl"];b.setAttribute("src",e+"/index.html");b.setAttribute("class","onemin");b.setAttribute("width","100%");b.setAttribute("height","100%");b.setAttribute("frameborder","0");b.style.position="absolute";$(b).load(function(){a===f.reminder&&b.contentWindow.postMessage({type:"DisplayMode",mode:a,reminders:c},e);a===f.normal&&b.contentWindow.postMessage({type:"DisplayMode",
mode:a,provider:d},e)});$("#oneminutesignup").empty();$("#oneminutesignup").append(b);window.addEventListener("message",l)}})}var f={normal:"normal",reminder:"reminder"},c=[],g=null,h=null,e=null;return{show:k,showWithProvider:function(){if("started"!==bg.OmsNotificationPopup.getState()){var a;a=bg.get("g_username");a=-1!==a.indexOf("@gmail")?"Gmail":-1!==a.indexOf("@yahoo")?"Yahoo":-1!==a.indexOf("@outlook")?"Office365":"Unknown";k("normal",a);bg.OmsNotificationPopup.setState("started")}},setTour:function(a){g=
a},fetchReminders:j,getReminderCount:function(){return c?c.length:0},modes:f}}();
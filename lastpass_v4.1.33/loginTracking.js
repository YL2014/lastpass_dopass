LPTabState=function(){var f={};LPPlatform.onTabClosed(function(b){delete f[b]});Topics.get(Topics.CLEAR_DATA).subscribe(function(){f={}});var m=function(b,a){a=[].concat(a);var c=a.indexOf(lpmdec_acct(b.password,!0,b,g_shares));if(-1===c&&b.fields&&0<b.fields.length)for(var d=0;d<b.fields.length;++d){var g=b.fields[d];if("password"===g.type&&(c=a.indexOf(lpmdec_acct(g.value,!0,b,g_shares)),-1<c))break}return-1<c?a[c]:null},n=function(b,a){for(var c=0;c<b.length;++c){var d=m(b[c],a);if(d)return d}return null},
j,u=[function(b,a){if(1===a.uniquePasswords.length){var c=a.uniquePasswords[0];2===a.passwordsByValue[c].count&&(2===b.fields.length?b.passwordChangeForm=!0:b.createAccountForm=!0);return c}},function(b,a){for(var c in a.passwordsByValue)if(1<a.passwordsByValue[c].count)return 2===a.uniquePasswords.length?(b.passwordChangeForm=!0,b.originalPassword=a.uniquePasswords[0]===c?a.uniquePasswords[1]:a.uniquePasswords[0]):b.createAccountForm=!0,c},function(b,a,c){if(2===a.uniquePasswords.length&&(c=n(c.getSites(),
a.uniquePasswords)))return b.passwordChangeForm=!0,b.originalPassword=c,a.uniquePasswords[0]===c?a.uniquePasswords[1]:a.uniquePasswords[0]},function(b,a){for(var c in a.passwordsByValue){var d=a.passwordsByValue[c].field,g=["pw","pass"];if(k(d.attributes.name,g)||k(d.id,g))return c}}],v=[function(b,a){if(1===a.uniqueTextValues.length){var c=a.uniqueTextValues[0];2===a.textFieldsByValue[c].count&&(b.createAccountForm=!0);return c}},function(b,a){for(var c in a.textFieldsByValue)if(1<a.textFieldsByValue[c].count)return b.createAccountForm=
!0,c},function(b){b=b.fields;for(var a=1;a<b.length;++a)if("password"===b[a].type){var c=b[a-1];if("password"!==c.type)return c.value}},function(b,a){for(var c in g_sites)if(-1<a.uniqueTextValues.indexOf(g_sites[c].unencryptedUsername))return g_sites[c].unencryptedUsername},function(b,a){if(a.textFieldsByType.email&&1===a.textFieldsByType.email.count)return a.textFieldsByType.email.field.value},function(b,a){for(var c in a.textFieldsByValue){var d=a.textFieldsByValue[c].field;if(k(d.attributes.name,
"user")||k(d.id,"user"))return c}}],p,l=function(b,a,c){var d=c[a];"undefined"===typeof d?c[a]={field:b,count:1}:++d.count};p=function(b){var a={},c={},d={};b.fields.forEach(function(b){"password"===b.type?l(b,b.value,a):(l(b,b.value,c),l(b,b.type,d))});return{passwordsByValue:a,textFieldsByValue:c,textFieldsByType:d,uniqueTextValues:Object.keys(c),uniquePasswords:Object.keys(a)}};var k=function(b,a){if(b){a=[].concat(a);for(var c=0;c<a.length;++c)if(-1<b.indexOf(a[c]))return!0}return!1},q=function(b,
a,c,d){for(var g=null,e=0;e<d.length&&!(g=d[e](b,a,c));++e);return g};j=function(b,a){var c=p(a),d=!1;a.username=q(a,c,b,v);a.password=a.generatedPassword?a.generatedPassword:q(a,c,b,u);var g;a:{if(a.username&&!a.createAccountForm)for(c=0;c<a.fields.length;++c){var e=a.fields[c];if(e.value===a.username){g=e;break a}}g=null}this.submitted=function(){return!a.generatedPassword};this.succeeded=function(b){"boolean"===typeof b&&(d=b);return d};this.getUsernameField=function(){return g};this.getUsername=
function(){return a.username};this.getPassword=function(){return a.password};this.getFormData=function(){return a};this.getOriginalPassword=function(){return a.originalPassword};this.isChangePasswordForm=function(){return!0===a.passwordChangeForm};this.isCreateAccountForm=function(){return!0===a.createAccountForm};this.isBasicAuthentication=function(){return!0===a.basicAuthentication};this.shouldSaveFields=function(){return!this.isChangePasswordForm()&&!this.isCreateAccountForm()}};var e=function(b){this.tabID=
b.tabID;this.domain=lp_gettld_url(b.tabURL);this.sites=[];this.username=this.usernameField=this.acccountsVersion=null};e.prototype.getSites=function(){if(this.acccountsVersion!==g_local_accts_version){this.sites=[];var b=getsites(this.domain),a;for(a in b)this.sites.push(g_sites[a]);this.acccountsVersion=g_local_accts_version}return this.sites};e.prototype.getFields=function(){var b=this.getUsernameField(),b=b?[b]:[];this.passwordForm&&(b=this.passwordForm.getFormData().fields);return b};e.prototype.getUsernameField=
function(){if(!this.usernameField)for(var b in f){var a=f[b];if(a.usernameField&&compare_tlds(a.domain,this.domain)){this.usernameField=a.usernameField;break}}return this.usernameField};e.prototype.setUsernameField=function(b){b&&(this.usernameField=b)};e.prototype.setUsername=function(b){b&&(this.username=b)};e.prototype.getUsername=function(){if(!this.username)for(var b in f){var a=f[b];if(a.username&&compare_tlds(a.domain,this.domain)){this.username=a.username;break}}return this.username};e.prototype.processPasswordSubmit=
function(b){this.passwordForm=new j(this,b);this.setUsernameField(this.passwordForm.getUsernameField());this.setUsername(this.passwordForm.getUsername());b.generatedPassword&&(this.generatedPassword=b.generatedPassword)};e.prototype.processTextSubmit=function(b){b=new j(this,b);this.setUsernameField(b.getUsernameField());this.setUsername(b.getUsername())};var r=function(b,a){if(a&&-1<a.indexOf("@")){var c=a.split("@");return 2===c.length&&b===c[0]}return!1},s=function(b,a){return b===a||r(b,a)||r(a,
b)||(-1<a.indexOf("*")||-1<a.indexOf(String.fromCharCode(8226))?b.length===a.length&&(b[0]===a[0]||b[b.length-1]===a[a.length-1]):!1)};e.prototype.getMatchingSites=function(){var b=this,a=b.getSites();if(b.getUsername())a=a.filter(function(a){a:{var c=b.getUsername();if(s(a.unencryptedUsername,c))a=!0;else{if(a.fields&&0<a.fields.length)for(var e=0;e<a.fields.length;++e){var f=a.fields[e];switch(f.type){case "text":case "email":case "tel":if(s(lpmdec_acct(f.value,!0,a,g_shares),c)){a=!0;break a}}}a=
!1}}return a});else{var c=b.passwordForm&&b.passwordForm.getOriginalPassword();c&&(a=a.filter(function(a){return null!==m(a,c)}));0===a.length&&(a=b.getSites())}return a};e.prototype.getSiteNotificationData=function(b){if(this.passwordForm){var a={formSubmitted:this.passwordForm.submitted(),formSucceeded:this.passwordForm.succeeded()};if(this.passwordForm.succeeded()){var c=this.passwordForm.getFormData(),d=this.getMatchingSites();if(n(d,this.passwordForm.getPassword()))return this.clear(),{};a.matchingSites=
d.map(function(a){return a.aid});a.defaultData={url:this.passwordForm.shouldSaveFields()?c.url:hostof(c.url),name:this.domain,unencryptedUsername:this.getUsername(),group:siteCats[this.domain],basic_auth:this.passwordForm.isBasicAuthentication()?"1":"0",realm:c.realm};a.dialogData={password:this.passwordForm.getPassword()};a.sameDomain=compare_tlds(lp_gettld_url(this.passwordForm.getFormData().url),lp_gettld_url(b.tabURL));a.generatedPassword=this.generatedPassword===this.passwordForm.getPassword();
this.passwordForm.shouldSaveFields()&&0<this.getFields().length&&(a.dialogData.fields=this.getFields().map(function(a){return{name:a.attributes.name||a.id,type:a.type,value:a.value}}))}else this.generatedPassword||this.clear();return a}return{}};e.prototype.getFormSubmissionTabState=function(){for(var b=this;b;){if(b.passwordForm)return b;b=b.previousTabState}return this};e.prototype.getSiteNotification=function(b,a){if(b.callback){var c=this.getFormSubmissionTabState(),d=!1;if(c.domain===this.domain&&
c.passwordForm&&this.passwordForm.getPassword()&&!c.passwordForm.isBasicAuthentication()){var e=LPTabs.get({tabID:this.tabID}),f=function(){if(c.passwordForm&&(c.passwordForm.succeeded(!d),c.passwordForm.succeeded()&&!c.getUsername()&&0<c.getSites().length)){var f=b.callback,h=c.getSites().map(function(a){return a.unencryptedUsername});e.forEachWindow({each:function(a,b){return a.LPContentScriptTools.findText({searches:h,exactMatch:!0,callback:function(a){c.setUsername(a);b()}})},done:function(){f(c.getSiteNotificationData(a))}});
return}b.callback(c.getSiteNotificationData(a))};if(b.source){var h=e.getFrame(b.source.frameID);h&&h.LPSiteNotification.formExists(c.passwordForm.getFormData(),function(a){d=a;f()})}else c.passwordForm.getFormData().top?e.getTop().LPSiteNotification.formExists(c.passwordForm.getFormData(),function(a){d=a;f()}):e.forEachFrame({each:function(a,b){return a.LPSiteNotification.formExists(c.passwordForm.getFormData(),function(a){d=d||a;b()})},done:f})}else b.callback(c.getSiteNotificationData(a))}};e.prototype.clear=
function(){this.previousTabState&&(this.previousTabState.clear(),delete this.previousTabState);delete this.passwordForm;delete this.generatedPassword};e.prototype.processBasicAuthentication=function(b){this.passwordForm=new j(this,{basicAuthentication:!0,url:b.url,realm:b.realm,username:b.username,password:b.password})};var t=function(b){var a=lp_gettld_url(b.tabURL);if(LPContentScriptFeatures.new_save_site)return!hasNeverSave(b.tabURL,a)&&!lp_url_is_lastpass(b.tabURL)&&!lp_url_is_lastpassext(b.tabURL);
b=IntroTutorial.getState();return b.enabled&&b.domain===a},h=function(b,a){if(b){if(t(b)){var c=f[b.tabID];if(!c||!compare_tlds(c.domain,lp_gettld_url(b.tabURL))){var d=f[b.tabID]=new e(b);d.previousTabState=c;c=d}a(c)}}else LPPlatform.getCurrentTab(function(b){h(b.tabDetails,a)})};return{getSiteNotification:function(b,a){h(a,function(c){c.getSiteNotification(b,a)})},clear:function(b){h(b,function(a){a.clear()})},processPasswordSubmit:function(b,a){h(a,function(c){c.processPasswordSubmit(b.formData,
a);c.getSiteNotification({callback:b.callback,source:a},a)})},processTextSubmit:function(b,a){h(a,function(c){c.processTextSubmit(b,a)})},processBasicAuthentication:function(b,a){h(a,function(a){a.processBasicAuthentication(b)})},isFormTrackingEnabled:function(b,a){b(t(a))}}}();
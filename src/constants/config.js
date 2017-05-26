/**
 * 表单设计器控制工具菜单定义
 */
var _remove = require('lodash/remove');
module.exports = {
    'items': [{
        'type': 'button',
        'title': 'TOOLBAR.ACTION.SAVE',
        'cssClass': 'glyphicon glyphicon-floppy-disk',
        'action': 'saveModel'
			}, {
        'type': 'separator',
        'title': '',
        'cssClass': 'toolbar-separator'
			}, {
        'type': 'button',
        'title': 'TOOLBAR.ACTION.TEMPLATE',
        'cssClass': 'glyphicon glyphicon-list-alt',
        'action': 'template',
        'enabledAction': 'element'
			}, {
        'type': 'separator',
        'title': '',
        'cssClass': 'toolbar-separator'
			}, {
        'type': 'button',
        'title': 'TOOLBAR.ACTION.IMPORT',
        'cssClass': 'glyphicon glyphicon-import',
        'action': 'import',
        'enabledAction': 'element'
			}, {
        'type': 'button',
        'title': 'TOOLBAR.ACTION.EXPORT',
        'cssClass': 'glyphicon glyphicon-export',
        'action': 'export'
			}, {
        'type': 'separator',
        'title': '',
        'cssClass': 'toolbar-separator'
			}, {
        'type': 'button',
        'title': 'TOOLBAR.ACTION.PREVIEW',
        'cssClass': 'glyphicon glyphicon-eye-open',
        'action': 'preview',
        'enabledAction': 'element'
			}, {
        'type': 'separator',
        'title': '',
        'cssClass': 'toolbar-separator'
			}, {
        'type': 'button',
        'title': 'TOOLBAR.ACTION.DEBUG',
        'cssClass': 'glyphicon glyphicon-console',
        'action': 'debug',
        'enabledAction': 'element'
			}],

    'secondaryItems': [{
        'type': 'button',
        'title': 'TOOLBAR.ACTION.HELP',
        'cssClass': 'glyphicon glyphicon-question-sign',
        'action': 'help'
			}, {
        'type': 'separator',
        'title': '',
        'cssClass': 'toolbar-separator'
			}, {
        'type': 'button',
        'title': 'TOOLBAR.ACTION.CLOSE',
        'cssClass': 'glyphicon glyphicon-remove',
        'action': 'closeEditor'
			}],

    'actions':{
        'saveModel': function() {
            var services = arguments[0];
            var ngDialog = services['ngDialog'];
            var log = services['log'];
            var rootScope = services['rootScope'];
            var http = services['http'];
            var dialog = ngDialog.open({
                template: 'formio/formbuilder/toolbar/save.html',
                showClose:false,
                closeByEscape:false,
                closeByNavigation:false,
                closeByDocument:false,
                width:250,
                scope:rootScope,
                controller:['$scope',function(scope) {
                    log.info(rootScope);
                    scope.isLoading = true;
                    scope.requestSuccess = false;
                    var saveUrl = rootScope.contextPath + '/form-service/model/' + rootScope.modelId + '/save.zf';
                    var parameters = 
                        {
                            'json_modelData':JSON.stringify(rootScope.form)
                        };
                    var saveRequest = http.put(saveUrl, parameters, {
                        headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                },
                        transformRequest: function (obj) {
                                var str = [];
                                for (var p in obj) {
                                    str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
                                }
                                return str.join('&');
                            }
                        }).then(function(response) {
                        services['timeout'](function(){
                            scope.isLoading = false;
                            scope.requestSuccess = true;
                            rootScope.$apply(rootScope.formUpdateUnsaved = false);
                        }, 500).then(function(){
                            services['timeout'](function(){
                                scope.closeThisDialog();
                            },500);
                        });
                    }, function(response) {
                        services['timeout'](function(){
                            scope.isLoading = false;
                            scope.requestSuccess = false;
                        }, 500).then(function(){
                            services['timeout'](function(){
                                scope.closeThisDialog();
                            },500);
                        });
                        //dialog.close();
                    });
                }]
            });
            
            dialog.closePromise.then(function(e) {
                //log.debug(e);
            });
        },
        'template':function() {
            var services = arguments[0];
            var ngDialog = services['ngDialog'];
            var log = services['log'];
            var rootScope = services['rootScope'];
            var http = services['http'];
            var dialog = ngDialog.open({
                template: 'formio/formbuilder/toolbar/templates.html',
                showClose:false,
                closeByEscape:false,
                closeByNavigation:false,
                closeByDocument:false,
                scope:rootScope,
                controller:['$scope',function(scope) {
                    //fetch tempates form server
                    var fetchUrl = rootScope.contextPath + '/form-service/template/list.zf';
                    http({
                        method: 'GET',
                        url: fetchUrl
                    }).then(function(response){
                        scope.formTemplates = response['data'];
                    },function(response){
                        scope.formTemplates = [];
                    });
                    
                    scope.delete = function(modelId){
                        var deleteUrl = rootScope.contextPath + '/form-service/template/' + modelId + '/del.zf';
                        http({
                            method: 'GET',
                            url: deleteUrl
                        }).then(function(response){
                            _remove(scope.formTemplates, function(n){
                                return n.json_modelId === modelId;
                            });
                        });
                    };
                    
                    scope.choose = function(modelId){
                        var modeaDataUrl = rootScope.contextPath + '/form-service/template/' + modelId + '/json.zf';
                        http({
                            method: 'GET',
                            url: modeaDataUrl
                        }).then(function(response){
                            if(response['data']){
                                rootScope.form = response['data'];
                                scope.closeThisDialog();
                            }
                        });
                    };
                }]
            });
        },
        'import':function() {
            var services = arguments[0];
            var ngDialog = services['ngDialog'];
            var log = services['log'];
            var rootScope = services['rootScope'];
            ngDialog.open({
                template: 'formio/formbuilder/toolbar/import.html',
                showClose:true,
                closeByEscape:false,
                closeByDocument:false,
                width:400,
                scope:rootScope,
                controller:['$scope','Upload',function($scope,Upload){
                    var uploadUrl = rootScope.contextPath + '/form-service/model/import.zf';
                    $scope.uploadModel = function(file) {
                        file.upload = Upload.upload({
                          url: uploadUrl,
                          data: {file: file}
                        });

                        file.upload.then(function (response) {
                          //response.data;
                        }, function (response) {
                          if (response.status > 0){
                              $scope.errorMsg = response.status + ': ' + response.data;
                          }
                        }, function (evt) {
                          file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                        });
                    };
                }]
            });
        },
        'export':function() {},
        'preview':function() {
            var services = arguments[0];
            var ngDialog = services['ngDialog'];
            var log = services['log'];
            var rootScope = services['rootScope'];
            ngDialog.open({
                template: 'formio/formbuilder/toolbar/preview.html',
                showClose:true,
                closeByEscape:false,
                closeByDocument:false,
                scope:rootScope,
                controller:['$scope',function(scope){
                    scope.formData = rootScope.form;
                    scope.modelName = rootScope.modelName;
                    scope.modelDesc = rootScope.modelDesc;
                }]
            });
        },
        'debug':function() {
            var services = arguments[0];
            var rootScope = services['rootScope'];
            rootScope.showDebugConsole = (!rootScope.showDebugConsole);
        },
        'help':function() {
            var services = arguments[0];
            var ngDialog = services['ngDialog'];
            ngDialog.open({
                template: 'formio/formbuilder/toolbar/help.html',
                showClose:true,
                closeByEscape:false,
                closeByDocument:false,
                width:400
            });
        },
        'closeEditor':function() {
            var services = arguments[0];
            var ngDialog = services['ngDialog'];
            var rootScope = services['rootScope'];
            var window = services['window'];
            var log = services['log'];
            if(rootScope.formUpdateUnsaved){
                var dialog = ngDialog.open({
                    template: 'formio/formbuilder/toolbar/confirm-close.html',
                    showClose:true,
                    closeByEscape:false,
                    closeByDocument:false,
                    width:450
                }).closePromise.then(function(closeDecision){
                    if(closeDecision.value){
                        window.close();
                    }
                });
            }else {
                window.close();
            }
        }
    }
};

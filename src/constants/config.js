/**
 * 表单设计器控制工具菜单定义
 */
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
            var dialog = ngDialog.open({
                template: 'formio/formbuilder/toolbar/save.html',
                scope:services['rootScope'],
                controller:['$scope',function(scope) {

                }]
            }).closePromise.then(function(e) {
                log.debug(e);
            });
        },
        'template':function() {},
        'import':function() {},
        'export':function() {},
        'debug':function() {
            var services = arguments[0];
            var rootScope = services['rootScope'];
            rootScope.showDebugConsole = (!rootScope.showDebugConsole);
        },
        'help':function() {},
        'closeEditor':function() {}
    }
};

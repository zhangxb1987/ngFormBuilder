/**
 * 表单设计器控制工具菜单定义
 */
module.exports = {
			'items' : [{
				'type' : 'button',
				'title' : 'TOOLBAR.ACTION.SAVE',
				'cssClass' : 'glyphicon glyphicon-floppy-disk',
				'action' : 'TOOLBAR.ACTIONS.saveModel'
			}, {
				'type' : 'separator',
				'title' : '',
				'cssClass' : 'toolbar-separator'
			}, {
				'type' : 'button',
				'title' : 'TOOLBAR.ACTION.TEMPLATE',
				'cssClass' : 'glyphicon glyphicon-list-alt',
				'action' : 'TOOLBAR.ACTIONS.cut',
				'enabledAction' : 'element'
			}, {
				'type' : 'separator',
				'title' : '',
				'cssClass' : 'toolbar-separator'
			}, {
				'type' : 'button',
				'title' : 'TOOLBAR.ACTION.IMPORT',
				'cssClass' : 'glyphicon glyphicon-import',
				'action' : 'TOOLBAR.ACTIONS.copy',
				'enabledAction' : 'element'
			}, {
				'type' : 'button',
				'title' : 'TOOLBAR.ACTION.EXPORT',
				'cssClass' : 'glyphicon glyphicon-export',
				'action' : 'TOOLBAR.ACTIONS.paste'
			}, {
				'type' : 'separator',
				'title' : '',
				'cssClass' : 'toolbar-separator'
			},{
				'type' : 'button',
				'title' : 'TOOLBAR.ACTION.PREVIEW',
				'cssClass' : 'glyphicon glyphicon-eye-open',
				'action' : 'TOOLBAR.ACTIONS.deleteItem',
				'enabledAction' : 'element'
			}, {
				'type' : 'separator',
				'title' : '',
				'cssClass' : 'toolbar-separator'
			},{
				'type' : 'button',
				'title' : 'TOOLBAR.ACTION.DEBUG',
				'cssClass' : 'glyphicon glyphicon-console',
				'action' : 'TOOLBAR.ACTIONS.deleteItem',
				'enabledAction' : 'element'
			}],

			'secondaryItems' : [{
				'type' : 'button',
				'title' : 'TOOLBAR.ACTION.HELP',
				'cssClass' : 'glyphicon glyphicon-question-sign',
				'action' : 'TOOLBAR.ACTIONS.help'
			}, {
				'type' : 'separator',
				'title' : '',
				'cssClass' : 'toolbar-separator'
			}, {
				'type' : 'button',
				'title' : 'TOOLBAR.ACTION.CLOSE',
				'cssClass' : 'glyphicon glyphicon-remove',
				'action' : 'TOOLBAR.ACTIONS.closeEditor'
			}]
};

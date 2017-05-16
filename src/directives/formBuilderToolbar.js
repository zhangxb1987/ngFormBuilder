var formioBuilderToolbarCongfig = require('../constants/config');
module.exports = function() {
	return {
			restrict: 'E',
			replace: true,
			templateUrl: 'formio/formbuilder/toolbar.html',
			link: function(scope, element, attrs, controllers) {
				scope.toolbarConfig = formioBuilderToolbarCongfig;
				/*TODO 添加点击事件处理函数*/
			}
	};
};

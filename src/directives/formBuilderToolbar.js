var formioBuilderToolbarCongfig = require('../constants/config');
module.exports = function($window) {
	$window.console.info(formioBuilderToolbarCongfig);
	return {
			restrict: 'E',
			replace: true,
			templateUrl: 'formio/formbuilder/toolbar.html',
			link: function(scope, element, attrs, controllers) {
				scope.toolbarConfig = formioBuilderToolbarCongfig;
			}
	};
};

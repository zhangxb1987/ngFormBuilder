var formioBuilderToolbarCongfig = require('../constants/config');
var _slice = require('lodash/slice');
module.exports = function() {
	return {
			restrict: 'E',
			replace: true,
			templateUrl: 'formio/formbuilder/toolbar.html',
			controller:['$rootScope','$scope','$log', function($rootScope,$scope,$log) {
				var executeFunctionByName = function(fn) {
					var args = _slice(arguments, 1);
					return fn.apply(this, args);
				};

				$scope.toolbarSecondaryButtonClicked = function($index) {
					var item = formioBuilderToolbarCongfig.secondaryItems[$index];
					if (item) {
						$log.info(item.action);
						var fn = formioBuilderToolbarCongfig.actions[item.action];
						if (fn && typeof (fn) === 'function') {
							executeFunctionByName(fn, $rootScope, $scope);
						}
					}
				},

				$scope.toolbarButtonClicked = function($index) {
					var item = formioBuilderToolbarCongfig.items[$index];
					if (item) {
						$log.info(item.action);
						var fn = formioBuilderToolbarCongfig.actions[item.action];
						if (fn && typeof (fn) === 'function') {
							executeFunctionByName(fn, $rootScope, $scope);
						}
					}
				};
			}],
			link: function(scope, element, attrs, controllers) {
				scope.toolbarConfig = formioBuilderToolbarCongfig;
				/*TODO 添加点击事件处理函数*/
			}
	};
};

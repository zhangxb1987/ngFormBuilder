var formioBuilderToolbarCongfig = require('../constants/config');
var _slice = require('lodash/slice');
module.exports = function() {
	return {
			restrict: 'E',
			replace: true,
			templateUrl: 'formio/formbuilder/toolbar.html',
			controller:['$rootScope','$scope','ngDialog','$http','$log', function($rootScope,$scope,ngDialog,$http,$log) {
				$scope.toolbarConfig = formioBuilderToolbarCongfig;
				var services = {'rootScope':$rootScope,'scope':$scope,'ngDialog':ngDialog,'http':$http,'log':$log};
				var executeFunctionByName = function(fn) {
					var args = _slice(arguments, 1);
					return fn.apply(this, args);
				};

				$scope.toolbarSecondaryButtonClicked = function($index) {
					var item = formioBuilderToolbarCongfig.secondaryItems[$index];
					if (item) {
						var fn = formioBuilderToolbarCongfig.actions[item.action];
						if (fn && typeof (fn) === 'function') {
							executeFunctionByName(fn, services);
						}
					}
				},

				$scope.toolbarButtonClicked = function($index) {
					var item = formioBuilderToolbarCongfig.items[$index];
					if (item) {
						var fn = formioBuilderToolbarCongfig.actions[item.action];
						if (fn && typeof (fn) === 'function') {
							executeFunctionByName(fn, services);
						}
					}
				};
			}],
			link: function(scope, element, attrs, controllers) {
				/*TODO 添加点击事件处理函数*/
			}
	};
};

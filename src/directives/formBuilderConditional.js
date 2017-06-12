'use strict';
var utils = require('formiojs/utils');
var _get = require('lodash/get');
var _reject = require('lodash/reject');
module.exports = ['$filter',
  function($filter) {
    var formioTranslate = $filter('formioTranslate');
    return {
      restrict: 'E',
      scope: true,
      template: '' +
        '<uib-accordion>' +
          '<div uib-accordion-group heading="{{\'Conditional.Simple\' | translate}}" class="panel panel-default" is-open="status.simple">' +
            '{{\'Conditional.Simple.Display\' | translate}}:' +
            '<select class="form-control input-md" ng-model="component.conditional.show">' +
            '<option ng-repeat="item in _booleans track by $index" value="{{item}}">{{item.toString() | translate}}</option>' +
            '</select>' +
            '<br>{{\'Conditional.Simple.Component\' | translate}}:' +
            '<select class="form-control input-md" ng-model="component.conditional.when">' +
            '<option ng-repeat="item in _components track by $index" value="{{item.key}}">{{item !== "" ? item.label + " (" + item.key + ")" : ""}}</option>' +
            '</select>' +
            '<br>{{\'Conditional.Simple.Value\' | translate}}:' +
            '<input type="text" class="form-control input-md" ng-model="component.conditional.eq">' +
          '</div>' +
          '<div uib-accordion-group heading="{{\'Conditional.Advanced\' | translate}}" class="panel panel-default" is-open="status.advanced">' +
            '<textarea class="form-control" rows="5" id="custom" name="custom" ng-model="component.customConditional" placeholder="/*** {{\'Example Code\'|translate}} ***/\nshow = (data[\'mykey\'] > 1);"></textarea>' +
            formioTranslate('Conditional.Advanced.Tooltip') +
          '</div>' +
          // '<div uib-accordion-group heading="{{\'Conditional.JSON Conditional\' | translate}}" class="panel panel-default" is-open="status.json">' +
          //   formioTranslate('Conditional.JSON Conditional.Tooltip') +
          //   '<textarea class="form-control" rows="5" id="json" name="json" json-input ng-model="component.conditional.json" placeholder="{ ... }"></textarea>' +
          // '</div>' +
        '</uib-accordion>',
      controller: [
        '$scope',
        function(
          $scope) {
          // Default the current components conditional logic.
          $scope.component = $scope.component || {};
          $scope.component.conditional = $scope.component.conditional || {};

          // The available logic functions.
          $scope._booleans = ['', 'true', 'false'];

          // Filter the list of available form components for conditional logic.
          $scope._components = _get($scope, 'form.components') || [];
          $scope._components = utils.flattenComponents($scope._components);
          // Remove non-input/button fields because they don't make sense.
          // FA-890 - Dont allow the current component to be a conditional trigger.
          $scope._components = _reject($scope._components, function(c) {
            return !c.input || (c.type === 'button') || (c.key === $scope.component.key) || (!c.label && !c.key);
          });

          // Add default item to the components list.
          $scope._components.unshift('');

          // Default and watch the show logic.
          $scope.component.conditional.show = $scope.component.conditional.show || '';
          // Coerce show var to supported value.
          var _booleanMap = {
            '': '',
            'true': 'true',
            'false': 'false'
          };
          $scope.component.conditional.show = _booleanMap.hasOwnProperty($scope.component.conditional.show)
            ? _booleanMap[$scope.component.conditional.show]
            : '';

          // Default and watch the when logic.
          $scope.component.conditional.when = $scope.component.conditional.when || null;

          // Default and watch the search logic.
          $scope.component.conditional.eq = $scope.component.conditional.eq || '';

          // Track the status of the accordion panels open state.
          $scope.status = {
            simple: !$scope.component.customConditional,
            advanced: !!$scope.component.customConditional
          };
        }
      ]
    };
  }
];

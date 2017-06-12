module.exports = function(app) {
  app.run([
    '$templateCache',
    function($templateCache) {
      // Create the component markup.
      $templateCache.put('formio/components/settings.html',
        '<form id="component-settings" novalidate>' +
          '<div class="row">' +
            '<div class="col-md-6">' +
              '<p class="lead" ng-if="::formComponent.title" style="margin-top:0;margin-bottom:10px;">{{::formComponent.title | translate}} {{\'Component\' | translate}}</p>' +
            '</div>' +
          '</div>' +
          '<div class="row">' +
            '<div class="col-xs-7">' +
              '<uib-tabset>' +
                '<uib-tab ng-repeat="view in ::formComponent.views" heading="{{ ::view.name | translate }}"><ng-include src="::view.template"></ng-include></uib-tab>' +
              '</uib-tabset>' +
            '</div>' +
            '<div class="col-xs-5">' +
              '<div class="panel panel-default preview-panel" style="margin-top:44px;">' +
                '<div class="panel-heading">{{\'Preview\' | translate}}</div>' +
                '<div class="panel-body">' +
                  '<div class="form-group" ng-if="component.wysiwyg && editorVisible">' +
                    '<label for="editor-preview" class="control-label" ng-if="component.label">{{ component.label }}</label>' +
                    '<textarea class="form-control" id="editor-preview" ng-if="component.wysiwyg && editorVisible" ckeditor="component.wysiwyg"></textarea>' +
                  '</div>' +
                  '<formio-component ng-if="!component.wysiwyg" component="component" data="{}" formio="::formio"></formio-component>' +
                '</div>' +
              '</div>' +
              '<formio-settings-info component="component" data="{}" formio="::formio"></formio-settings-info>' +
              '<div class="form-group">' +
                '<button type="submit" class="btn btn-success" ng-click="closeThisDialog(true)">{{\'DIALOG.ACTION.SAVE\' | translate}}</button>&nbsp;' +
                '<button type="button" class="btn btn-default" ng-click="closeThisDialog(false)" ng-if="!component.isNew">{{\'DIALOG.ACTION.CANCEL\' | translate}}</button>&nbsp;' +
                '<button type="button" class="btn btn-danger" ng-click="removeComponent(component, formComponents[component.type].confirmRemove); closeThisDialog(false)">{{\'DIALOG.ACTION.REMOVE\' | translate}}</button>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</form>'
      );

      // Create the common API tab markup.
      $templateCache.put('formio/components/common/data.html',
        '<form-builder-option-key></form-builder-option-key>' +
        '<form-builder-option property="defaultValue"></form-builder-option>' +
        '<uib-accordion>' +
        '  <div uib-accordion-group heading="{{\'Custom Default Value\' | translate}}" class="panel panel-default">' +
        '    <uib-accordion>' +
        '      <div uib-accordion-group heading="{{\'JavaScript Default\' | translate}}" class="panel panel-default" is-open="true">' +
        '        <textarea class="form-control" rows="5" id="customDefaultValue" name="customDefaultValue" ng-model="component.customDefaultValue" placeholder="/*** {{\'Conditional.Simple\' | translate}} ***/\nvalue = data[\'mykey\'] + data[\'anotherKey\'];"></textarea>' +
        '        <small>' +
        '          <p>{{\'Enter custom default value code\' | translate}}</p>' +
        '          <p>{{\'You must assign the\' | translate}} <strong>value</strong> {{\'variable as the result you want for the default value\' | translate}}</p>' +
        '          <p>{{\'The global variable\' | translate}} <strong>data</strong> , {{\'and allows you to access the data of any form component, by using its API key\' | translate}}</p>' +
        '        </small>' +
        '      </div>' +
        // '      <div uib-accordion-group heading="JSONLogic Default" class="panel panel-default">' +
        // '        <small>' +
        // '          <p>Execute custom default value using <a href="http://jsonlogic.com/">JSONLogic</a>.</p>' +
        // '          <p>Submission data is available as JsonLogic variables, with the same api key as your components.</p>' +
        // '          <p><a href="http://formio.github.io/formio.js/app/examples/calculated.html" target="_blank">Click here for an example</a></p>' +
        // '        </small>' +
        // '        <textarea class="form-control" rows="5" id="json" name="json" json-input ng-model="component.customDefaultValue" placeholder=\'{ ... }\'></textarea>' +
        // '      </div>' +
        '    </uib-accordion>' +
        '  </div>' +
        /*'  <div uib-accordion-group heading="Calculated Value" class="panel panel-default">' +
        '    <uib-accordion>' +
        '      <div uib-accordion-group heading="JavaScript Value" class="panel panel-default" is-open="true">' +
        '        <textarea class="form-control" rows="5" id="calculateValue" name="calculateValue" ng-model="component.calculateValue" placeholder="/!*** Example Code ***!/\nvalue = data[\'mykey\'] + data[\'anotherKey\'];"></textarea>' +
        '        <small>' +
        '          <p>Enter code to calculate a value.</p>' +
        '          <p>You must assign the <strong>value</strong> variable as the result you want for the default value.</p>' +
        '          <p>The global variable <strong>data</strong> is provided, and allows you to access the data of any form component, by using its API key.</p>' +
        '        </small>' +
        '      </div>' +
        '      <div uib-accordion-group heading="JSONLogic Value" class="panel panel-default">' +
        '        <small>' +
        '          <p>Execute custom calculation logic with JSON and <a href="http://jsonlogic.com/">JSONLogic</a>.</p>' +
        '          <p>Submission data is available as JsonLogic variables, with the same api key as your components.</p>' +
        '          <p><a href="http://formio.github.io/formio.js/app/examples/calculated.html" target="_blank">Click here for an example</a></p>' +
        '        </small>' +
        '        <textarea class="form-control" rows="5" id="json" name="json" json-input ng-model="component.calculateValue" placeholder=\'{ ... }\'></textarea>' +
        '      </div>' +
        '    </uib-accordion>' +
        '  </div>' +*/
        '</uib-accordion>'
      );

      // Create the common API tab markup.
      /*$templateCache.put('formio/components/common/api.html',
        '<ng-form>' +
          '<form-builder-option-key></form-builder-option-key>' +
          '<form-builder-option-tags></form-builder-option-tags>' +
        '</ng-form>'
      );*/
      //去掉tag
      $templateCache.put('formio/components/common/api.html',
        '<ng-form>' +
        '<form-builder-option-key></form-builder-option-key>' +
        '</ng-form>'
      );

      // Create the common Layout tab markup.
      $templateCache.put('formio/components/common/layout.html',
        '<ng-form>' +
          // Need to use array notation to have dash in name
          '<form-builder-option property="style[\'margin-top\']"></form-builder-option>' +
          '<form-builder-option property="style[\'margin-right\']"></form-builder-option>' +
          '<form-builder-option property="style[\'margin-bottom\']"></form-builder-option>' +
          '<form-builder-option property="style[\'margin-left\']"></form-builder-option>' +
          '<uib-accordion>' +
          '  <div uib-accordion-group heading="{{\'Layout.Overlay\'|translate}}" class="panel panel-default">' +
          '    <div class="form-group">' +
          '      <label for="overlay-style">{{\'Layout.Overlay.Style\' | translate}}</label>' +
          '      <input class="form-control" id="overlay-style" name="overlay-style" ng-model="component.overlay.style"></input>' +
          '    </div>' +
          '    <div class="form-group">' +
          '      <label for="overlay-left">{{\'Layout.Overlay.Left\' | translate}}</label>' +
          '      <input class="form-control" id="overlay-left" name="overlay-left" ng-model="component.overlay.left"></input>' +
          '    </div>' +
          '    <div class="form-group">' +
          '      <label for="overlay-right">{{\'Layout.Overlay.Top\' | translate}}</label>' +
          '      <input class="form-control" id="overlay-top" name="overlay-top" ng-model="component.overlay.top"></input>' +
          '    </div>' +
          '    <div class="form-group">' +
          '      <label for="overlay-width">{{\'Layout.Overlay.Width\' | translate}}</label>' +
          '      <input class="form-control" id="overlay-width" name="overlay-width" ng-model="component.overlay.width"></input>' +
          '    </div>' +
          '    <div class="form-group">' +
          '      <label for="overlay-height">{{\'Layout.Overlay.Height\' | translate}}</label>' +
          '      <input class="form-control" id="overlay-height" name="overlay-height" ng-model="component.overlay.height"></input>' +
          '    </div>' +
          '  </div>' +
          '</uib-accordion>' +
        '</ng-form>'
      );

      // Create the common Layout tab markup.
      $templateCache.put('formio/components/common/conditional.html',
        '<form-builder-conditional></form-builder-conditional>'
      );
    }
  ]);
};

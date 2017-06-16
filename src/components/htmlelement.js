module.exports = function(app) {
  app.config([
    'formioComponentsProvider',
    function(formioComponentsProvider) {
      formioComponentsProvider.register('htmlelement', {
        fbtemplate: 'formio/formbuilder/htmlelement.html',
        icon: 'fa fa-code',
        views: [
          {
            name: 'Display',
            template: 'formio/components/htmlelement/display.html'
          },
          {
            name: 'API',
            template: 'formio/components/common/api.html'
          },
          {
            name: 'Conditional',
            template: 'formio/components/common/conditional.html'
          }
        ]/*,
        documentation: 'http://help.form.io/userguide/#html-element-component'*/
      });
    }
  ]);
  app.run([
    '$templateCache',
    function($templateCache) {
      $templateCache.put('formio/formbuilder/htmlelement.html',
        '<formio-html-element component="component"></div>'
      );

      // Create the settings markup.
      $templateCache.put('formio/components/htmlelement/display.html',
        '<ng-form>' +
/*          '<form-builder-option property="customClass" label="Container Custom Class"></form-builder-option>' +*/
          '<form-builder-option property="tag" label="{{\'HTML Tag.label\'|translate}}" placeholder="{{\'HTML Tag.placeholder\'|translate}}" title="{{\'HTML Tag.tooltip\'|translate}}"></form-builder-option>' +
          '<form-builder-option property="className" label="{{\'CSS Class.label\'|translate}}" placeholder="{{\'CSS Class.placeholder\'|translate}}" title="{{\'CSS Class.tooltip\'|translate}}"></form-builder-option>' +
/*          '<value-builder ' +
            'data="component.attrs" ' +
            'label="Attributes" ' +
            'tooltip-text="The attributes for this HTML element. Only safe attributes are allowed, such as src, href, and title." ' +
            'value-property="value" ' +
            'label-property="attr" ' +
            'value-label="Value" ' +
            'label-label="Attribute" ' +
            'no-autocomplete-value="true" ' +
          '></value-builder>' +*/
          '<div class="form-group">' +
            '<label for="content" form-builder-tooltip="{{\'HTML Content.tooltip\'|translate}}">{{\'HTML Content.label\'|translate}}</label>' +
            '<textarea class="form-control" id="content" name="content" ng-model="component.content" placeholder="{{\'HTML Content.placeholder\'|translate}}" rows="3">{{ component.content }}</textarea>' +
          '</div>' +
        '</ng-form>'
      );
    }
  ]);
};

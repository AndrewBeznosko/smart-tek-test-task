import Vue from 'vue';
import upperFirst from 'lodash.upperfirst';
import camelCase from 'lodash.camelcase';

const requireComponent = require.context(
  '/',
  false,
  /Base[A-Z]\w+\.(vue|js)$/,
);

requireComponent.keys().forEach((fileName) => {
  const componentConfig = requireComponent(fileName);

  const componentName = upperFirst(
    camelCase(
      componentConfig.default.name
        .split('/')
        .pop()
        .replace(/\.\w+$/, ''),
    ),
  );

  Vue.component(componentName, componentConfig.default || componentConfig);
});

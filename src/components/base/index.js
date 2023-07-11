import Vue from 'vue';
import { kebabCase } from 'lodash-es';

const baseGlobalComponents = import.meta.glob(['./*.vue', './*.js'], {
  import: 'default',
  eager: true,
});

Object.entries(baseGlobalComponents).forEach(([path, component]) => {
  const componentName = kebabCase(path
    .split('/')
    .pop()
    .replace(/\.\w+$/, ''),
  );

  Vue.component(componentName, component);
});

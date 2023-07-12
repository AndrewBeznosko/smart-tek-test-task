/**
 * Fix issue with importing vue files
 * https://github.com/vuejs/vue-cli/issues/1198#issuecomment-1139752067
 */

declare module "*.vue" {
  import { defineComponent } from "vue";
  const component: ReturnType<typeof defineComponent>;
  export default component;
}

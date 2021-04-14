export default interface IRoute {
  path: string;
  name: string;
  exact: boolean;
  component: any;
  icon: any;
  props?: any;
}

interface IWSplitterProps {
  children: JSX.Element | JSX.Element[];
  isAutoWidth: boolean | undefined;
  isHorizontally: boolean | undefined;
  splitValue?: number | string; // in percent (0-100) or px
  split?: "vertical" | "horizontal";
}

interface IViewsProps {
  first: number;
  second: number;
}

declare module "*.svg" {
  import type { FunctionComponent, SVGProps } from "react";

  const SvgComponent: FunctionComponent<
    SVGProps<SVGSVGElement> & { title?: string; titleId?: string }
  >;

  export default SvgComponent;
}

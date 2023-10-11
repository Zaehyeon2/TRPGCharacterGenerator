declare module '*.svg' {
  import React = require('react');

  export const ReactSVGComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;
}

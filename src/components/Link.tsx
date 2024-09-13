import React from "react";

type Props = React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;

const LinkComp = ({
  href,
  children,
  target = "_blank",
  className,
  ...props
}: Props) => {
  return (
    <a
      href={href}
      target={target}
      className={`underline hover:text-slate-800 ${className}`}
      {...props}
    >
      {children}
    </a>
  );
};

const Link = React.memo(LinkComp);
export default Link;

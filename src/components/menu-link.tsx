import { useGSAP } from "@gsap/react";
import { useRef, type ComponentProps, type ReactNode } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";

interface MenuLinkProps extends ComponentProps<"a"> {
  children: ReactNode;
}

gsap.registerPlugin(CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");

export function MenuLink({ children, ...props }: MenuLinkProps) {
  const container = useRef<HTMLAnchorElement>(null);
  const menuLinkRef = useRef<gsap.core.Timeline>(null);

  useGSAP(
    () => {
      gsap.set(".menu-link-circle", {
        scale: 0,
      });

      menuLinkRef.current = gsap
        .timeline({
          paused: true,
          defaults: {
            ease: "hop",
            duration: 0.3,
          },
        })
        .to(".menu-link-circle", {
          scale: 1,
        })
        .to(
          ".menu-link-text",
          {
            marginLeft: "28px",
          },
          "<",
        );
    },
    { scope: container },
  );

  function handleMouseEnter() {
    menuLinkRef.current?.play();
  }

  function handleMouseLeave() {
    menuLinkRef.current?.reverse();
  }

  return (
    <a
      {...props}
      ref={container}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="flex items-center gap-3 relative cursor-pointer select-none"
    >
      <div className="menu-link-circle size-4 rounded-full bg-neutral-900 absolute top-1/2 -translate-y-1/2" />
      <p className="menu-link-text text-6xl uppercase font-mango font-extrabold">
        {children}
      </p>
    </a>
  );
}

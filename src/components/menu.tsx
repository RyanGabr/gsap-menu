import { useGSAP } from "@gsap/react";
import { MenuLink } from "./menu-link";
import { useRef } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");

const menuLinks = [
  { label: "Home" },
  { label: "About" },
  { label: "Works" },
  { label: "Contact" },
];

export function Menu() {
  const menuTl = useRef<gsap.core.Timeline>(null);

  useGSAP(() => {
    gsap.set(".menu", {
      scale: 0,
      top: "12px",
      right: "12px",
      borderRadius: "100px",
    });

    gsap.set(".menu-icon-first-line", {
      rotate: 0,
      marginBottom: "8px",
    });

    gsap.set(".menu-icon-second-line", {
      rotate: 0,
      marginTop: "8px",
    });

    menuTl.current = gsap
      .timeline({
        paused: true,
        reversed: true,
        defaults: {
          ease: "hop",
        },
      })
      .to(".menu-icon-first-line", {
        rotate: "35deg",
        marginBottom: "0px",
      })
      .to(
        ".menu-icon-second-line",
        {
          rotate: "-35deg",
          marginTop: "0px",
        },
        "<",
      )
      .to(
        ".menu",
        {
          scale: 1,
          borderRadius: "12px",
          top: "-12px",
          right: "-12px",
          duration: 0.8,
          transformOrigin: "top right",
        },
        "<",
      );
  });

  function toggleMenu() {
    const tl = menuTl.current;

    if (tl) {
      if (tl.reversed()) {
        tl.play();
      } else {
        tl.reverse();
      }
    }
  }

  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        className="size-12 rounded-full bg-neutral-100 hover:scale-90 transition cursor-pointer flex items-center justify-center p-2.5 relative z-50"
      >
        <div className="relative w-full flex items-center justify-center">
          <div className="menu-icon-first-line absolute w-full h-0.5 bg-neutral-900" />
          <div className="menu-icon-second-line absolute w-full h-0.5 bg-neutral-900" />
        </div>
      </button>

      <div className="menu absolute w-80 bg-neutral-100 p-8 rounded-xl text-neutral-900 flex flex-col gap-5">
        <div className="space-y-3">
          <p className="font-semibold text-neutral-500/80 font-mono uppercase text-sm tracking-tight">
            Navigation
          </p>
        </div>

        <div className="flex flex-col gap-1">
          {menuLinks.map((link, index) => (
            <MenuLink key={index}>{link.label}</MenuLink>
          ))}
        </div>

        <div className="space-y-5">
          <hr className="opacity-20" />

          <p className="font-semibold text-neutral-500/80 font-mono uppercase text-sm tracking-tight">
            By @RyanGabr
          </p>
        </div>
      </div>
    </div>
  );
}

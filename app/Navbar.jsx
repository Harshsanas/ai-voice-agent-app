"use client";

import Link from "next/link";
import { Compass, Menu, X, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@stackframe/stack";
import { memo, useCallback, useState } from "react";
import { useTheme } from "./(main)/_components/theme-provider";

const NavLink = memo(({ href, label, onClick }) => (
  <Link
    href={href}
    onClick={onClick}
    className="text-muted-foreground hover:text-foreground transition-colors duration-200 ease-in-out"
  >
    {label}
  </Link>
));

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const userInfo = useUser();
  console.log(userInfo, "userInfo ");
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/dashboard", label: "Dashboard" },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const handleLinkClick = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Compass className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">InterviewPro</span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <NavLink key={link.href} href={link.href} label={link.label} />
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="hidden md:flex"
            aria-label="Toggle Theme"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>

          <UserButton />

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMenu}
            aria-label="Toggle Mobile Menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-background/90 backdrop-blur-md md:hidden z-40 animate-fade-in"
          aria-modal="true"
          role="dialog"
        >
          <div className="flex flex-col items-center justify-center h-full space-y-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                label={link.label}
                onClick={handleLinkClick}
              />
            ))}
            <Button
              variant="outline"
              onClick={() => {
                toggleTheme();
                toggleMenu();
              }}
              className="mt-4"
            >
              Switch to {theme === "light" ? "Dark" : "Light"} Mode
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

"use client";

import Link from "next/link";
import { Compass, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserButton } from "@stackframe/stack";
import { useState } from "react";
import { useTheme } from "./(main)/_components/theme-provider";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/dashboard", label: "Dashboard" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Compass className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">InterviewPro</span>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:text-foreground transition duration-300"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="hidden md:flex"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </Button>
          <UserButton />
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMenu}
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
        <div className="fixed inset-0 bg-background/90 backdrop-blur-md md:hidden z-40">
          <div className="flex flex-col items-center justify-center h-full space-y-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={toggleMenu}
                className="text-2xl text-muted-foreground hover:text-foreground transition duration-300"
              >
                {link.label}
              </Link>
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

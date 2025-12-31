import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, BookOpen, Trophy, BookMarked, GraduationCap, Shield, Info } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";

export function Navigation() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();

  const navItems = [
    { href: "/", label: "Home", icon: BookOpen },
    { href: "/lessons", label: "Lessons", icon: GraduationCap },
    { href: "/quizzes", label: "Quizzes", icon: Trophy },
    { href: "/glossary", label: "Glossary", icon: BookMarked },
    { href: "/about", label: "About", icon: Info },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 glass-card">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <a className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold gradient-text">Pick N Learn</span>
          </a>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link key={item.href} href={item.href}>
                <a>
                  <Button
                    variant={active ? "default" : "ghost"}
                    className={active ? "glow-primary" : ""}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.label}
                  </Button>
                </a>
              </Link>
            );
          })}
        </div>

        {/* Auth Section */}
        <div className="hidden md:flex items-center space-x-2">
          {isAuthenticated ? (
            <>
              <Link href="/dashboard">
                <a>
                  <Button variant="outline">
                    {user?.name || "Dashboard"}
                  </Button>
                </a>
              </Link>
            </>
          ) : (
            <a href={getLoginUrl()}>
              <Button variant="default" className="glow-primary">
                Sign In
              </Button>
            </a>
          )}
        </div>

        {/* Mobile Menu */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <div className="flex flex-col space-y-4 mt-8">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link key={item.href} href={item.href}>
                    <a onClick={() => setMobileOpen(false)}>
                      <Button
                        variant={active ? "default" : "ghost"}
                        className={`w-full justify-start ${active ? "glow-primary" : ""}`}
                      >
                        <Icon className="h-5 w-5 mr-3" />
                        {item.label}
                      </Button>
                    </a>
                  </Link>
                );
              })}
              
              <div className="pt-4 border-t border-border">
                {isAuthenticated ? (
                  <Link href="/dashboard">
                    <a onClick={() => setMobileOpen(false)}>
                      <Button variant="outline" className="w-full">
                        {user?.name || "Dashboard"}
                      </Button>
                    </a>
                  </Link>
                ) : (
                  <a href={getLoginUrl()}>
                    <Button variant="default" className="w-full glow-primary">
                      Sign In
                    </Button>
                  </a>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}

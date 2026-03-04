import { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { categories } from '@/data/products';
import { useQuote } from '@/context/QuoteContext';

interface NavigationProps {
  onNavigate: (section: string) => void;
  onOpenQuote: () => void;
}

export default function Navigation({ onNavigate, onOpenQuote }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const { quoteItems } = useQuote();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    onNavigate(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { label: 'Inicio', section: 'hero' },
    { 
      label: 'Productos', 
      section: 'products',
      dropdown: categories.map(cat => ({
        label: cat.name,
        section: `category-${cat.id}`
      }))
    },
    { label: 'Servicios', section: 'services' },
    { label: 'Nosotros', section: 'about' },
    { label: 'Contacto', section: 'contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'glass shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button 
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-2 group"
          >
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <span className={`text-2xl font-bold transition-colors duration-300 ${
              isScrolled ? 'text-gray-800' : 'text-gray-800'
            }`}>
              Color<span className="text-brand-primary">Box</span>
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              item.dropdown ? (
                <DropdownMenu key={item.label}>
                  <DropdownMenuTrigger asChild>
                    <button className={`flex items-center gap-1 font-medium transition-colors duration-300 hover:text-brand-primary ${
                      isScrolled ? 'text-gray-700' : 'text-gray-700'
                    }`}>
                      {item.label}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-white/95 backdrop-blur-lg border-0 shadow-xl rounded-xl p-2">
                    {item.dropdown.map((subItem) => (
                      <DropdownMenuItem
                        key={subItem.label}
                        onClick={() => scrollToSection(item.section)}
                        className="rounded-lg cursor-pointer hover:bg-brand-primary-light hover:text-brand-primary-dark"
                      >
                        {subItem.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.section)}
                  className={`relative font-medium transition-colors duration-300 hover:text-brand-primary group ${
                    isScrolled ? 'text-gray-700' : 'text-gray-700'
                  }`}
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-primary transition-all duration-300 group-hover:w-full" />
                </button>
              )
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={onOpenQuote}
              className="relative p-2 rounded-full hover:bg-gray-100 transition-colors duration-300"
            >
              <ShoppingCart className="w-5 h-5 text-gray-700" />
              {quoteItems.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-pink text-white text-xs rounded-full flex items-center justify-center font-semibold">
                  {quoteItems.length}
                </span>
              )}
            </button>
            <Button
              onClick={() => scrollToSection('quote')}
              className="btn-primary"
            >
              Cotizar Ahora
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden flex items-center gap-3">
            <button
              onClick={onOpenQuote}
              className="relative p-2 rounded-full hover:bg-gray-100 transition-colors duration-300"
            >
              <ShoppingCart className="w-5 h-5 text-gray-700" />
              {quoteItems.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-pink text-white text-xs rounded-full flex items-center justify-center font-semibold">
                  {quoteItems.length}
                </span>
              )}
            </button>
            
            <Sheet>
              <SheetTrigger asChild>
                <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                  <Menu className="w-6 h-6 text-gray-700" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-white">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-xl font-bold">
                      Color<span className="text-brand-primary">Box</span>
                    </span>
                    <SheetClose asChild>
                      <button className="p-2 rounded-lg hover:bg-gray-100">
                        <X className="w-5 h-5" />
                      </button>
                    </SheetClose>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    {navItems.map((item) => (
                      <SheetClose key={item.label} asChild>
                        <button
                          onClick={() => scrollToSection(item.section)}
                          className="w-full text-left px-4 py-3 rounded-xl font-medium text-gray-700 hover:bg-brand-primary-light hover:text-brand-primary-dark transition-all duration-300"
                        >
                          {item.label}
                        </button>
                      </SheetClose>
                    ))}
                  </div>
                  
                  <div className="mt-auto pb-8">
                    <SheetClose asChild>
                      <Button
                        onClick={() => scrollToSection('quote')}
                        className="w-full btn-primary"
                      >
                        Cotizar Ahora
                      </Button>
                    </SheetClose>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}

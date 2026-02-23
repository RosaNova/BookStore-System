import { Search, X, BookOpen, ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
interface HeaderProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
}

const Header = ({ searchQuery, onSearchChange }: HeaderProps) => {
    return (
        <header>
            {/* Top Nav */}
            <nav className="bg-card border-b border-border px-6 lg:px-12 py-4 flex items-center justify-between">
                <div className="flex items-center gap-10">
                    <div className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-primary" />
                        <h1 className="text-lg font-semibold  text-foreground">
                            Bookly
                        </h1>
                    </div>
                    <div className="hidden md:flex items-center gap-8">
                        {["Home", "Catalogue", "Best Sellers", "Help"].map((item) => (
                            <a
                                key={item}
                                href="#"
                                className={`text-sm font-medium transition-colors hover:text-primary ${item === "Home"
                                    ? "text-foreground"
                                    : "text-muted-foreground"
                                    }`}
                            >
                                {item}
                            </a>
                        ))}
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button className="relative p-2 rounded-full hover:bg-secondary transition-colors">
                        <ShoppingCart className="h-5 w-5 text-muted-foreground" />
                        <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center font-bold">
                            0
                        </span>
                    </button>
                    <Button variant="ghost" size="sm" className="text-primary font-medium">
                        Register
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-full px-5">
                        Sign In
                    </Button>
                </div>
            </nav>

            {/* Search Bar */}
            <div className="bg-card border-b border-border px-6 lg:px-12 py-3">
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                            placeholder="Search by title, author, or genre..."
                            className="h-9 w-full rounded-full bg-secondary pl-9 pr-8 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => onSearchChange("")}
                                className="absolute right-2.5 top-1/2 -translate-y-1/2"
                            >
                                <X className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground" />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;

import { useMemo, useState, useRef, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import BookCard from "../../components/BookCard";
import Loading from "../../components/ui/loading";
import bookService from "../../services/book.service";
import type { Book } from "../../types/book.types";



const priceOptions = [
  { label: "Low to High", value: "price-asc" },
  { label: "High to Low", value: "price-desc" },
  { label: "Under $15", value: "price-under15" },
  { label: "$15 - $20", value: "price-15-20" },
  { label: "Over $20", value: "price-over20" },
];



const ratingOptions = [
  { label: "Highest First", value: "rating-desc" },
  { label: "Lowest First", value: "rating-asc" },
  { label: "4.5+", value: "rating-4.5" },
  { label: "4.0+", value: "rating-4.0" },
];

type FilterKey = "Price" | "Category" | "Rating";

const Index = () => {
  const { searchQuery } = useOutletContext<{ searchQuery: string }>();
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [openDropdown, setOpenDropdown] = useState<FilterKey | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedRating, setSelectedRating] = useState<string | null>(null);
  const [categories, setCategories] = useState<{ label: string; value: string }[]>([
    { label: "All Categories", value: "all" },
  ]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      try {
        const response = await bookService.getBooks();
        setBooks(response.data);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await bookService.getBookCategories();
        if (Array.isArray(res)) {
          if (res.length === 0) return;
          const first = res[0];
          if (typeof first === "string") {
            setCategories((prev) => [
              prev[0],
              ...((res as string[]).map((s) => ({ label: s, value: s })) || []),
            ]);
          } else if (typeof first === "object") {
            // support { id, name } shape
            setCategories((prev) => [
              prev[0],
              ...((res as any[]).map((c) => ({ label: String(c.name), value: String(c.name) })) || []),
            ]);
          }
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const getSelectedLabel = (key: FilterKey) => {
    switch (key) {
      case "Price":
        return priceOptions.find((o) => o.value === selectedPrice)?.label;
      case "Category":
        return categories.find((o) => o.value === selectedCategory)?.label;
      case "Rating":
        return ratingOptions.find((o) => o.value === selectedRating)?.label;
    }
  };

  const filteredBooks = useMemo(() => {
    let result = [...books];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (book) =>
          book.title.toLowerCase().includes(q) ||
          book.author.toLowerCase().includes(q) ||
          book.genre.toLowerCase().includes(q)
      );
    }

    // Category filter (maps to book.genre)
    if (selectedCategory && selectedCategory !== "all") {
      result = result.filter((b) => b.genre === selectedCategory);
    }

    // Price filter
    if (selectedPrice === "price-under15") result = result.filter((b) => b.price < 15);
    if (selectedPrice === "price-15-20") result = result.filter((b) => b.price >= 15 && b.price <= 20);
    if (selectedPrice === "price-over20") result = result.filter((b) => b.price > 20);

    // Rating filter
    if (selectedRating === "rating-4.5") result = result.filter((b) => b.rating >= 4.5);
    if (selectedRating === "rating-4.0") result = result.filter((b) => b.rating >= 4.0);

    // Sorting
    if (selectedPrice === "price-asc") result.sort((a, b) => a.price - b.price);
    if (selectedPrice === "price-desc") result.sort((a, b) => b.price - a.price);
    if (selectedRating === "rating-desc") result.sort((a, b) => b.rating - a.rating);
    if (selectedRating === "rating-asc") result.sort((a, b) => a.rating - b.rating);

    return result;
  }, [searchQuery, selectedPrice, selectedRating]);

  const handleSelect = (key: FilterKey, value: string) => {
    switch (key) {
      case "Price":
        setSelectedPrice(selectedPrice === value ? null : value);
        break;
      case "Category":
        setSelectedCategory(selectedCategory === value ? null : value);
        break;
      case "Rating":
        setSelectedRating(selectedRating === value ? null : value);
        break;
    }
    setOpenDropdown(null);
  };

  const getOptions = (key: FilterKey) => {
    switch (key) {
      case "Price": return priceOptions;
      case "Category": return categories;
      case "Rating": return ratingOptions;
    }
  };

  const isActive = (key: FilterKey) => {
    switch (key) {
      case "Price": return !!selectedPrice;
      case "Category": return !!selectedCategory && selectedCategory !== "all";
      case "Rating": return !!selectedRating;
    }
  };

  const filterKeys: FilterKey[] = ["Price", "Category", "Rating"];

  return (
    <div className="w-full">
      <main className="max-w-7xl mx-auto px-6 lg:px-12 py-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Book Catalogue</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {filteredBooks.length === books.length
                ? "Discover your next great read!"
                : `${filteredBooks.length} book${filteredBooks.length !== 1 ? "s" : ""} found`}
            </p>
          </div>
          <div className="flex items-center gap-2 relative" ref={dropdownRef}>
            {filterKeys.map((key) => {
              const active = isActive(key);
              const label = getSelectedLabel(key);
              return (
                <div key={key} className="relative">
                  <button
                    onClick={() => setOpenDropdown(openDropdown === key ? null : key)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${active
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-card border border-border text-muted-foreground hover:border-primary/30"
                      }`}
                  >
                    {label || key}
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform ${openDropdown === key ? "rotate-180" : ""}`} />
                  </button>
                  {openDropdown === key && (
                    <div className="absolute right-0 top-full mt-2 z-50 w-44 rounded-xl bg-card border border-border shadow-lg py-1.5 animate-in fade-in slide-in-from-top-2 duration-200">
                      {getOptions(key).map((opt) => {
                        const selected =
                          (key === "Price" && selectedPrice === opt.value) ||
                          (key === "Category" && selectedCategory === opt.value) ||
                          (key === "Rating" && selectedRating === opt.value);
                        return (
                          <button
                            key={opt.value}
                            onClick={() => handleSelect(key, opt.value)}
                            className={`w-full text-left px-4 py-2 text-sm transition-colors ${selected
                              ? "bg-primary/10 text-primary font-medium"
                              : "text-foreground hover:bg-secondary"
                              }`}
                          >
                            {opt.label}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {isLoading ? (
          <Loading />
        ) : filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredBooks.map((book) => (
              <BookCard key={book.id} {...book} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
            <p className="text-lg font-medium">No books found</p>
            <p className="text-sm mt-1">Try a different search or filter</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;

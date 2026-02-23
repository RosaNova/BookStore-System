import { BookOpen, Star, FileText } from "lucide-react";
import { Button } from "./ui/button";

interface BookCardProps {
  title: string;
  author: string;
  price: number;
  book_img: string;
  genre: string;
  pages: number;
  rating: number;
  featured?: boolean;
}

const BookCard = ({ title, author, price, book_img, genre, pages, rating, featured = false }: BookCardProps) => {
  return (
    <div
      className={`group relative rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 ${featured
        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
        : "bg-card border border-border hover:shadow-lg hover:shadow-border/50"
        }`}
    >
      <div className="mb-3 flex items-center justify-center h-48 overflow-hidden rounded-xl">
        <img
          src={book_img}
          alt={title}
          className="h-full w-auto object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <span className={`inline-block text-[11px] font-medium px-2.5 py-0.5 rounded-full mb-2 ${featured ? "bg-primary-foreground/20 text-primary-foreground" : "bg-secondary text-muted-foreground"
        }`}>
        {genre}
      </span>

      <h3 className={`text-base font-semibold leading-tight ${featured ? "text-primary-foreground" : "text-foreground"}`}>
        {title}
      </h3>
      <p className={`text-xs mt-0.5 ${featured ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
        {author}
      </p>

      <div className="mt-3 flex items-baseline gap-0.5">
        <span className={`text-xs ${featured ? "text-primary-foreground/70" : "text-muted-foreground"}`}>$</span>
        <span className="text-2xl font-bold">{price}</span>
      </div>

      <div className={`mt-3 flex items-center justify-between text-xs ${featured ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
        <div className="flex items-center gap-1.5">
          <Star className="h-3.5 w-3.5" />
          <span>{rating}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <FileText className="h-3.5 w-3.5" />
          <span>{pages} pages</span>
        </div>
        <div className="flex items-center gap-1.5">
          <BookOpen className="h-3.5 w-3.5" />
          <span>{genre}</span>
        </div>
      </div>

      <Button
        size="sm"
        className={`mt-4 w-full rounded-full font-medium ${featured
          ? "bg-card text-foreground hover:bg-secondary"
          : "bg-primary text-primary-foreground hover:bg-primary/90"
          }`}
      >
        Buy Now →
      </Button>
    </div>
  );
};

export default BookCard;

import { Button } from "./ui/button";
interface BookCardProps {
  title: string;
  author: string;
  price: number;
  book_img: string;
  categoryName: string;
}

const BookCard = ({ title, author, price, book_img, categoryName }: BookCardProps) => {
  return (
    <div className="group relative rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 bg-card border border-border hover:shadow-lg hover:shadow-border/50">
      <div className="mb-3 flex items-center justify-center h-48 overflow-hidden rounded-xl">
        <img
          src={book_img}
          alt={title}
          className="h-full w-auto object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <span className="inline-block text-[11px] font-medium px-2.5 py-0.5 rounded-ful bg-primary-foreground/20 text-primary-foreground">
        {categoryName}
      </span>

      <p className="text-xs mt-0.5 text-primary-foreground/70 " >
        {author}
      </p>
        
        <h1 className="text-lg font-semibold">{title}</h1>
      <div className="mt-3 flex items-baseline gap-0.5">
        <span className="text-xs text-muted-foreground">$</span>
        <span className="text-xl text-red-700 font-bold">{price}</span>
      </div>
      <Button className="absolute top-2 right-2 rounded-full py-2 px-4 opacity-0 group-hover:opacity-100 transition-opacity">
        Details
      </Button>

      <div>
        <p className="text-red-600">{author}</p>
      <Button
        size="sm"
        className="bg-primary text-primary-foreground hover:bg-primary/90">
        Buy Now →
      </Button>
      </div>
    </div>
  );
};

export default BookCard;

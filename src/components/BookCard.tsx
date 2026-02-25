import { useState } from "react";
import { Button } from "./ui/button";
import Modal from "./ui/modal";

interface BookCardProps {
  title: string;
  author_name: string;
  price: number;
  book_img: string;
  category_name: string;
  description?: string;
  stock?: number;
  published_date?: string;
}

const BookCard = ({
  title,
  author_name,
  price,
  book_img,
  category_name,
  description,
  stock,
  published_date
}: BookCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="group relative rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 bg-card border border-border hover:shadow-lg hover:shadow-border/50">
        <div className="mb-3 flex items-center justify-center h-48 overflow-hidden rounded-xl">
          <img
            src={book_img}
            alt={title}
            className="h-full w-auto object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <p className="inline-block text-[11px] font-medium  py-0.5 rounded-[5px] bg-gray-500/20 px-2 text-red-700">
          ប្រភេទ : {category_name}
        </p>

        <p className="text-xs px-2 inline-block bg-gray-500/20 rounded-[5px]  mt-0.5 text-red-700 " >
          អ្នកនិពន្ធ : {author_name}
        </p>

        <h1 className="text-lg font-semibold">{title}</h1>
        <div className="mt-3 flex items-baseline gap-0.5">
          <span className="text-xs text-muted-foreground">តម្លៃ : $</span>
          <span className="text-xl text-red-700 font-bold">{price}</span>
        </div>

        <Button
          onClick={() => setIsModalOpen(true)}
          className="absolute top-2 right-2 rounded-full py-2 px-4 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          Details
        </Button>


        <Button
          size="sm"
          className="bg-black w-full mt-2 text-primary-foreground hover:bg-black/90">
          Buy Now →
        </Button>
      </div>


      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Book Details"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-center justify-center bg-muted/30 rounded-2xl p-4 h-64 md:h-full">
            <img
              src={book_img}
              alt={title}
              className="max-h-full w-auto object-contain drop-shadow-xl"
            />
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary px-2 py-1 bg-primary/10 rounded-md">
                ប្រភេទ : {category_name}
              </span>
              <h2 className="text-3xl font-bold mt-2 text-foreground">{title}</h2>
              <p className="text-lg text-muted-foreground font-medium">By {author_name}</p>
            </div>

            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-red-600">${price}</span>
              {stock !== undefined && (
                <span className="text-sm text-muted-foreground ml-4">
                  {stock > 0 ? `${stock} in stock` : "Out of stock"}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-foreground">Description</h4>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {description || "No description available for this book."}
              </p>
            </div>

            {published_date && (
              <div className="text-xs text-muted-foreground">
                Published on: {new Date(published_date).toLocaleDateString()}
              </div>
            )}

            <div className="mt-auto pt-6 flex gap-3">
              <Button className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-6 rounded-xl">
                Purchase Now
              </Button>
              <Button variant="outline" className="py-6 rounded-xl" onClick={() => setIsModalOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default BookCard;

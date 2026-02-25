import { useState, useEffect } from "react";

import BookCard from "../../components/BookCard";
import Loading from "../../components/ui/loading";
import bookService from "../../services/book.service";
import type { Book, BookCategory, BookPrice} from "../../types/book.types";
import { Combobox , ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "../../components/ui/combobox";

const Index = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [bookPrice, setBookPrice] = useState<BookPrice[]>([]);
  const [bookCategory, setBookCategory] = useState<BookCategory[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [booksRes, priceRes, categoryBook] = await Promise.all([
          bookService.getBooks(),
          bookService.getBookPrice(),
          bookService.getBookCategories()
        ]);

        setBooks(booksRes.data);
        setBookPrice(priceRes.data);
        setBookCategory(categoryBook.data);

        console.log("Books:", categoryBook);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-full">
      <main className="max-w-7xl mx-auto px-6 lg:px-12 py-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Book Catalogue</h2>
            <p className="text-sm text-muted-foreground mt-1">Discover your next great read!</p>
          </div>
          <div className="flex items-center gap-2 relative" >
            {/* Category */}
            <Combobox items={bookCategory}>
              <ComboboxInput placeholder="Select a category" />
              <ComboboxContent>
                <ComboboxEmpty>No items found.</ComboboxEmpty>
                <ComboboxList>
                  {(item) => (
                    <ComboboxItem key={item} value={item.name}>
                      {item.name}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>

            {/* Price */}
            <Combobox items={bookPrice}>
              <ComboboxInput placeholder="Select a price" />
              <ComboboxContent>
                <ComboboxEmpty>No items found.</ComboboxEmpty>
                <ComboboxList>
                  {bookPrice.map((item) => (
                    <ComboboxItem key={item.price} value={item.price}>
                      ${item.price}
                    </ComboboxItem>
                  ))}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </div>
        </div>

        {isLoading ? (
          <Loading />
        ) : books.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {books.map((book) => (
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

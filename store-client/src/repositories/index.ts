import { CategoryRepository } from "./CategoryRepository"
import { BookRepository } from "./BookRepository";

const repositories = {
  categories: new CategoryRepository(),
  books: new BookRepository()
}

export default repositories

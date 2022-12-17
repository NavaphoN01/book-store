import { useEffect, useState } from 'react'
import Repo from './repositories'
import Category from './models/Category'
import Book from './models/Book'
import BookDetail from './components/BookDetail'



function App() {
  const [categoryList, setCategoryList] = useState<Category[]>([])
  const [bookList, setBookList] = useState<Book[]>([])

  const fetchCategoryList = async () => {
    const result = await Repo.categories.getAll()
    if (result) {
      setCategoryList(result)
    }
  }
  const fetchBookList = async () => {
    const result = await Repo.books.getAll()
    if (result) {
      setBookList(result)
    }
  }

  useEffect(() => {
    fetchCategoryList()
    fetchBookList()
  },)

  return (
    <div>
      <div>
    {categoryList.map(category => <option key={category.id} value={category.id}>{category.title}</option>)}
    <hr />
    </div>
    {bookList.map(book =>
            <div key={book.id}>
            <BookDetail {...book} />
            <hr />
          </div> 
        )}
    </div>
  );
}

export default App;

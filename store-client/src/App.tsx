import { useEffect, useState } from 'react'
import Repo from './repositories'
import Category from './models/Category'
import Book from './models/Book'
import BookDetail from './components/BookDetail'



function App() {
  const [categoryList, setCategoryList] = useState<Category[]>([])
  const [bookList, setBookList] = useState<Book[]>([])
  const [filter, setFilter] = useState<string>('')

  const fetchCategoryList = async () => {
    const result = await Repo.categories.getAll()
    if (result) {
      setCategoryList(result)
    }
  }
  const fetchBookList = async () => {
    const result = await Repo.books.getAll({categoryId: filter})
    if (result) {
      setBookList(result)
    }
  }

  useEffect(() => {
    fetchCategoryList()
    fetchBookList()
  },[filter])

  return (
    <div>
      <div>
      <select onChange={e => setFilter(e.target.value)}>
          <option value={''}>All</option>
    {categoryList.map(category => <option key={category.id} value={category.id}>{category.title}</option>)}
    </select>
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

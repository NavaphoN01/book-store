import { useEffect, useState } from 'react'
import Repo from './repositories'
import Category from './models/Category'
import Book from './models/Book'
import BookDetail from './components/BookDetail'
import BookForm from './components/BookForm'

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

  const onCreateBook = async (book: Partial<Book>) => {
    await Repo.books.create(book)
    fetchBookList()
  }

  const onUpdateBook = async (book: Partial<Book>) => {
    await Repo.books.update(book)
    fetchBookList()
  }

  const onDeleteBook = async (id: number) => {
    await Repo.books.delete(id)
    fetchBookList()
  }

  useEffect(() => {
    fetchCategoryList()
    fetchBookList()
  },[filter])

  return (
    <div>
      <div>
        <BookForm book = {{}} categoryList = {categoryList} callbackFn={onCreateBook}/>
        <hr />
      </div>
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
          <BookForm book ={book} categoryList={categoryList} callbackFn={onUpdateBook} />
          <button onClick={e => onDeleteBook(book.id)}>Delete</button>
            <hr />
        </div> 
      )}
    </div>
  );
}

export default App;

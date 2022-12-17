import { useEffect, useState } from 'react'
import Repo from './repositories'
import Category from './models/Category';


function App() {
  const [categoryList, setCategoryList] = useState<Category[]>([])

  const fetchCategoryList = async () => {
    const result = await Repo.categories.getAll()
    if (result) {
      setCategoryList(result)
    }
  }
  useEffect(() => {
    fetchCategoryList()
  },)

  return (
    <div>
    {categoryList.map(category => <option key={category.id} value={category.id}>{category.title}</option>)}
    </div>
  );
}

export default App;

import { useEffect, useState } from "react"
import { FaRegEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { CiDark } from "react-icons/ci";

function App() {

  const [todo,setTodo] = useState("");
  const [todos,setTodos] = useState([]);

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  },[])

  const saveToLS = (todos) => {
    localStorage.setItem("todos",JSON.stringify(todos))
  }

  const handleAdd = () => {
    if(todo){
      const newTodos = [...todos,{todo, isCompleted: false, id: Date.now()}]
      setTodos(newTodos);
      setTodo("");
      saveToLS(newTodos);
    }
  }

  const handleChange = (e) => {
    setTodo(e.target.value);
  }

  const handleDelete = (ID) => {
    confirm("are you sure you want to delete")
    let newTodos = todos.filter((i) => {
      return i.id != ID
    })
    setTodos(newTodos)
    saveToLS(newTodos);
  }

  const handleEdit = (ID) => {
    let t = todos.filter((i) => i.id == ID)
    setTodo(t[0].todo);

    let newTodos = todos.filter((i) => {
      return i.id != ID
    })
    setTodos(newTodos)
    saveToLS(newTodos);
  }

  const handleCheckbox = (e) => {
    let ID = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id == ID
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  }


  const [theme,setTheme] = useState("light")

  const toggleTheme = () => {
    if(theme == "light"){
      setTheme("dark");
    }
    else{
      setTheme("light")
    }
  }

  useEffect(() => {
    const commonClass = document.querySelectorAll(".themeClass");
    commonClass.forEach((i) => {
      i.classList.remove("light","dark");
      i.classList.add(theme);
    })
  })

  return (
    <>
      <nav className='bg-zinc-800 text-white border-b-2 border-zinc-600 sm:p-4 p-2 flex justify-between sm:px-8 text-sm sm:text-base'>
          <div className="font-bold flex justify-center items-center gap-3">
            <div className="w-6 h-6 sm:w-8 sm:h-8 flex justify-center items-center">
              <img src="https://thumbs.dreamstime.com/b/to-do-list-icon-clipboard-checklist-vector-graphics-various-use-187733061.jpg" alt="" className="rounded-full"/>
            </div>
            <p>iTask-Todo</p>
          </div>
          <div className="flex justify-center items-center">
            <ul className="flex justify-center items-center sm:gap-8 gap-2 cursor-pointer font-semibold">
              <li onClick={toggleTheme} className="text-xl mr-4"><CiDark /></li>
            </ul>
          </div>
      </nav>
      <div className="themeClass h-screen flex justify-center items-center">
        <div className="themeClass md:w-3/4 w-full h-full sm:rounded-lg">

          <div className="flex justify-center items-center font-semibold pt-8 pb-2 sm:text-xl text-zinc-500">
            Add a Todo
          </div>
          <div className="flex w-full justify-center">
            <input type="text" className="w-1/2 outline-none px-2 rounded-tl rounded-bl bg-slate-200 text-gray-700" placeholder="write here" onChange={handleChange} value={todo} id="inputField" />
            <button className="bg-blue-500 rounded-tr rounded-br px-2 md:p-2 font-bold text-sm" onClick={handleAdd}>Add</button>
          </div>

          <div className="p-6">
            <h1 className="sm:text-xl font-semibold">Your Todos</h1>
            <div className="sm:pt-4 pt-1">
              {todos.length == 0 && <div className="font-semibold text-orange-700">No Todos to display</div>}
              {todos.map((item) => (
                <div className="flex my-2 sm:gap-4 gap-2" key={item.todo} >
                  <input type="checkbox" className="sm:mx-4" onChange={handleCheckbox} name={item.id} />
                  <p className={`sm:w-1/3 text-sm md:text-base ${item.isCompleted ? "line-through" : ""}`}>{item.todo}</p>
                  <div className="flex sm:gap-3 gap-1 h-full">
                    <button className="bg-blue-400 rounded px-1 font-semibold w-6 h-6" onClick={() => handleEdit(item.id)}><FaRegEdit /></button>
                    <button className="bg-blue-400 rounded px-1 font-semibold w-6 h-6" onClick={() => handleDelete(item.id)}><AiFillDelete /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default App
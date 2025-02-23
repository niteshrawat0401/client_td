import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList ";
import { addTodo, deleteTodo, fetchTodos, updateTodo } from "../../redux/action/todoActions";
import { logout } from "../../redux/action/authAction";

const Todos = () => {
  // const [todos, setTodos] = useState(initialTodos);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editingTodo, setEditingTodo] = useState(null);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { todos, loading, error } = useSelector((state) => state?.todo);

  
  const handleAddTodo = (newTodo) => {
    // console.log(newTodo)
    dispatch(addTodo(newTodo))
    toast.success("Todo added successfully");
  };
  
  useEffect(()=>{
    dispatch(fetchTodos())
  },[dispatch])

  const handleEditTodo = (todo) => {
    if (!editingTodo) return;
    dispatch(updateTodo(editingTodo?._id, todo));
    setEditingTodo(null);
    toast.success("Todo updated successfully");
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id))
  };

  const handleToggleTodo = (id, todo) => {
    let toggleTodo = {
      ...todo, completed : !todo?.completed ? true : false
    }
    dispatch(updateTodo(id , toggleTodo))
    toast.success(`Todo status updated ${toggleTodo?.completed}`);
  };

  const handleLogout = ()=>{
    dispatch(logout())
    navigate('/')
    toast.success("Logged out successfully");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight">My Todos</h1>
          <button
            onClick={() => {
              handleLogout()
            }}
            className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Logout
          </button>
        </div>
        
        <TodoForm
          name={name}
          setName={setName}
          description={description}
          setDescription={setDescription}
          onSubmit={editingTodo ? handleEditTodo : handleAddTodo}
          editTodo={editingTodo}
          onCancel={editingTodo ? () => setEditingTodo(null) : undefined}
        />
        <Toaster/>

        {todos?.length > 0 ? (
          <TodoList
            todos={todos}
            onEdit={setEditingTodo}
            onDelete={handleDeleteTodo}
            onToggle={handleToggleTodo}
          />
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No todos yet. Add one to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Todos;
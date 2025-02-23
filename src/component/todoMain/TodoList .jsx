import { X, Pencil } from "lucide-react";
import { toast } from "sonner";

const TodoList = ({ todos, onEdit, onDelete, onToggle }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {todos.map((todo) => {
        return (
        <div
          key={todo?._id}
          className={`bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg rounded-lg p-4 transition-all duration-300 hover:shadow-xl ${
            todo?.completed ? "opacity-75" : ""
          }`}
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-start gap-3 flex-1">
              <input
                type="checkbox"
                checked={todo?.completed}
                onChange={() => onToggle(todo?._id , todo)}
                className="mt-1.5 h-4 w-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500 cursor-pointer"
              />
              <div className="flex-1">
                <h3
                  className={`font-medium ${
                    todo?.completed ? "line-through text-gray-500" : ""
                  }`}
                >
                  {todo?.name}
                </h3>
                <p
                  className={`text-sm mt-1 ${
                    todo?.completed ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {todo?.description}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                disabled={todo?.completed}
                onClick={() => onEdit(todo)}
                className="p-2 rounded-md hover:bg-gray-100 transition-colors cursor-not-allowed "
              >
                <Pencil className="h-4 w-4 text-gray-600 cursor-pointer" />
              </button>
              <button
                disabled={todo?.completed}
                onClick={() => {
                  onDelete(todo?._id);
                  toast.success("Todo deleted successfully");
                }}
                className="p-2 rounded-md hover:bg-red-50 transition-colors cursor-pointer"
              >
                <X className="h-4 w-4 text-red-500" />
              </button>
            </div>
          </div>
        </div>
      )
      })}
    </div>
  );
};

export default TodoList;
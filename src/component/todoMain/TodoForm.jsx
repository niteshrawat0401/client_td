import { useState, useEffect } from "react";
import { toast } from "sonner";

const TodoForm = ({ name, setName, description, setDescription, onSubmit, editTodo, onCancel }) => {
  // const [name, setName] = useState("");
  // const [description, setDescription] = useState("");

  useEffect(() => {
    if (editTodo) {
      setName(editTodo?.name);
      setDescription(editTodo?.description);
    }
  }, [editTodo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Please enter a title");
      return;
    }
    if (!description.trim()) {
      toast.error("Please enter a description");
      return;
    }
    onSubmit({
      name,
      description,
      completed: editTodo ? editTodo?.completed : false,
    });
    setName("");
    setDescription("");
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg rounded-lg p-6 mb-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Title</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter todo title"
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter todo description"
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all min-h-[100px] resize-y"
          />
        </div>
        <div className="flex gap-2 justify-end">
          {onCancel && (
            <button
              type="button"
              onClick={()=>{onCancel(), setName(''), setDescription('')}}
              className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors cursor-pointer"
          >
            {editTodo ? "Update" : "Add"} Todo
          </button>
        </div>
      </form>
    </div>
  );
};

export default TodoForm;
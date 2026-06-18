import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ScaleLoader } from "react-spinners";
import { useGetTodoQuery, useGetTodosQuery, useUpdateTodoMutation } from '../Slices/todoApiSlice';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

function UpdateTodo() {
  const { userInfo } = useSelector((state) => state.auth);
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: todo, isLoading, refetch } = useGetTodoQuery(id);
  const { refetch: todosRefetch } = useGetTodosQuery({
    userId: userInfo?._id,
  });
  const [updateTodo] = useUpdateTodoMutation();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(false);

  const updateTodoHandler = async (e) => {
    e.preventDefault()
    try {
      await updateTodo({ title, description, status, id }).unwrap();
      toast.success('Updated Successfully');
      refetch();
      todosRefetch();

      setTitle("");
      setDescription("");
      setStatus(false);

      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error('Failed to update');
    }
  };
  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description);
      setStatus(todo.status);
    }
  }, [todo]);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <ScaleLoader color="white" />
        </div>

      ) : (
        <div className="max-w-2xl mx-auto p-8 bg-white/90 backdrop-blur-md rounded-[32px] shadow-2xl border border-white/20 animate-fadeIn mt-10">
          <h1 className="text-3xl font-black text-indigo-950 mb-8 border-b border-indigo-100 pb-6 tracking-tight">Edit Task</h1>
          <form className="flex flex-col gap-6" onSubmit={updateTodoHandler}>
            <input
              type="text"
              placeholder="Task Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input-premium"
              required
            />
            <textarea
              placeholder="Task Details..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input-premium min-h-[150px] resize-none"
              required
            ></textarea>

            <div className="flex flex-col gap-2 text-left">
              <label className="text-sm font-semibold text-indigo-900/60 ml-2">Task Status</label>
              <select className={`input-premium appearance-none cursor-pointer font-bold ${status ? 'text-green-600 border-green-200 bg-green-50' : 'text-amber-600 border-amber-200 bg-amber-50'}`} 
                value={status?.toString()}
                onChange={(e) => setStatus(e.target.value === "true")}
              >
                <option value="false">⏳ Still Pending</option>
                <option value="true">✅ Fully Completed</option>
              </select>
            </div>

            <button type="submit" className="btn-premium w-full py-4 mt-4">
              {isLoading ? 'Syncing...' : 'Save Changes'} 
            </button>
            
            <button 
                type="button" 
                onClick={() => navigate("/")} 
                className="w-full py-2 text-indigo-600 font-semibold hover:text-indigo-800 transition-colors"
            >
                Cancel
            </button>
          </form>
        </div>

      )}
    </>
  )
}

export default UpdateTodo
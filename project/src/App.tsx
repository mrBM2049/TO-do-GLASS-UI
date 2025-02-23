import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Check, X } from 'lucide-react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

type FilterType = 'all' | 'active' | 'completed';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo.trim(), completed: false }]);
      setNewTodo('');
    }
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const startEditing = (todo: Todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const saveEdit = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: editText.trim() } : todo
    ));
    setEditingId(null);
  };

  const toggleComplete = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div 
      className="min-h-screen p-8"
      style={{
        backgroundImage: `
          linear-gradient(to bottom right, rgba(0, 0, 0, 0.8), rgba(17, 24, 39, 0.9)),
          url('https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=2560&q=80')
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay'
      }}
    >
      <div className="max-w-2xl mx-auto">
        <div className="backdrop-blur-xl bg-gray-900/40 rounded-2xl p-8 shadow-xl border border-gray-700/30">
          <h1 className="text-4xl font-bold text-white mb-8 text-center">Tasks</h1>
          
          <form onSubmit={addTodo} className="mb-8">
            <div className="flex gap-2">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add a new task..."
                className="flex-1 px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-600/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              />
              <button
                type="submit"
                className="px-4 py-3 bg-purple-600/20 rounded-xl hover:bg-purple-600/30 transition-colors duration-200 text-white"
              >
                <Plus size={24} />
              </button>
            </div>
          </form>

          <div className="flex justify-center gap-4 mb-8">
            {(['all', 'active', 'completed'] as const).map((filterType) => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  filter === filterType
                    ? 'bg-purple-600/30 text-white'
                    : 'bg-gray-800/30 text-gray-400 hover:bg-gray-800/50'
                }`}
              >
                {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {filteredTodos.map(todo => (
              <div
                key={todo.id}
                className={`backdrop-blur-md bg-gray-800/30 rounded-xl p-4 border border-gray-700/30 transition-all duration-200 ${
                  todo.completed ? 'opacity-70' : ''
                }`}
              >
                {editingId === todo.id ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-lg bg-gray-800/50 border border-gray-600/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                    />
                    <button
                      onClick={() => saveEdit(todo.id)}
                      className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors duration-200 text-green-400"
                    >
                      <Check size={20} />
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors duration-200 text-red-400"
                    >
                      <X size={20} />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleComplete(todo.id)}
                      className="w-5 h-5 rounded-md bg-gray-800/50 border-gray-600/30 text-purple-500 focus:ring-purple-500/50"
                    />
                    <span className={`flex-1 text-white ${todo.completed ? 'line-through text-gray-400' : ''}`}>
                      {todo.text}
                    </span>
                    <button
                      onClick={() => startEditing(todo)}
                      className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors duration-200 text-blue-400"
                    >
                      <Edit2 size={20} />
                    </button>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors duration-200 text-red-400"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
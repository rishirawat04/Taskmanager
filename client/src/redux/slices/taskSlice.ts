import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';

interface Task {
  _id: string;
  title: string;
  description?: string;
  dueDate?: string;
  completed: boolean;
}

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

export const fetchTasks = createAsyncThunk('tasks/', async () => {
  const response = await api.get('/tasks');
  return response.data;
});

export const createTask = createAsyncThunk(
  'tasks/create',
  async (taskData: Omit<Task, '_id'>) => {
    const response = await api.post('/tasks', taskData);
    return response.data;
  }
);

export const updateTask = createAsyncThunk(
  'tasks/update',
  async ({ id, taskData }: { id: string; taskData: Partial<Task> }) => {
    const response = await api.put(`/tasks/${id}`, taskData);
    return response.data;
  }
);

export const deleteTask = createAsyncThunk('tasks/delete', async (id: string) => {
  await api.delete(`/tasks/${id}`);
  return id;
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch tasks';
      })
      .addCase(createTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create task';
      })
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.tasks.findIndex((task) => task._id === action.payload._id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update task';
      })
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete task';
      });
  },
});

export default taskSlice.reducer;

import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import {
  register,
  login,
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  getTodoById,
  completeTodo
} from "../appwrite";


// =====================================================================================================================
// Authentication
// =====================================================================================================================
export const useSignUp = () => {
  return useMutation({
    mutationFn: data => register(data)
  });
};

export const useSignIn = () => {
  return useMutation({
    mutationFn: data => login(data)
  });
};


// =====================================================================================================================
// TODO CRUD Operation
// =====================================================================================================================
export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: data => createTodo(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_ALL_TODOS"] });
    }
  });
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: data => updateTodo(data),
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ["GET_ALL_TODOS"] });
      queryClient.invalidateQueries({ queryKey: ["GET_TODO_BY_ID", data.$id] });
    }
  });
};

export const useCompleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: data => completeTodo(data),
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ["GET_ALL_TODOS"] });
    }
  });
};

export const useGetTodos = creatorId => {
  return useQuery({
    queryKey: ["GET_ALL_TODOS"],
    queryFn: () => getTodos(creatorId),
    enabled: !!creatorId
  });
};

export const useGetTodoById = data => {
  return useQuery({
    queryKey: ["GET_TODO_BY_ID", data?.todoId],
    queryFn: () => getTodoById(data),
    enabled: !!data?.creatorId && !!data?.todoId
  });
};

export const useDeleteTodoById = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: todoId => deleteTodo(todoId),

    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ["GET_ALL_TODOS"] });
      queryClient.invalidateQueries({ queryKey: ["GET_TODO_BY_ID", data.$id] });
    }
  });
};

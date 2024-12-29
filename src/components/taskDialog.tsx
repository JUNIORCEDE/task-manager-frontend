'use client';

import { useEffect, useRef, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { confirmDialog } from 'primereact/confirmdialog';
import { InputSwitch } from 'primereact/inputswitch';
import { useTaskStore } from '@/store/useTaskStore';
import { useToast } from '@/providers/confirmProvider';

interface TaskDialogProps {
  visible: boolean;
  onHide: () => void;
  taskToEdit?: any;
}

export function TaskDialog({ visible, onHide, taskToEdit }: TaskDialogProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);
  const toast = useToast();
  const { addTask, updateTask, isLoading } = useTaskStore();

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description || '');
      setCompleted(taskToEdit.completed || false);
    } else {
      setTitle('');
      setDescription('');
      setCompleted(false);
    }
  }, [taskToEdit]);

  const confirmSubmit = () => {
    if (!title.trim()) {
        toast.current?.show({
          severity: 'error',
          summary: 'Error',
          detail: 'El título es requerido',
          life: 3000
        });
        return;
      }
    const action = taskToEdit ? 'editar' : 'crear';
    confirmDialog({
      message: `¿Está seguro de ${action} esta tarea?`,
      header: `Confirmar ${action}`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => handleSubmit(),
      acceptClassName: 'mx-2',
      acceptLabel: 'Sí',
      rejectLabel: 'No'
    });
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      toast.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: 'El título es requerido',
        life: 3000
      });
      return;
    }

    try {
      if (taskToEdit) {
        await updateTask(taskToEdit._id, { title, description, completed });
        toast.current?.show({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Tarea actualizada correctamente',
          life: 3000
        });
      } else {
        await addTask(title, description);
        toast.current?.show({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Tarea creada correctamente',
          life: 3000
        });
      }
      onHide();
    } catch (error) {
      toast.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Hubo un error al procesar la tarea',
        life: 3000
      });
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {taskToEdit ? 'Editar Tarea' : 'Nueva Tarea'}
          </h2>
          <Button 
            icon="pi pi-times" 
            className="p-button-rounded p-button-text" 
            onClick={onHide}
          />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="font-medium">
              Título
            </label>
            <InputText
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Título de la tarea"
              required
              className="w-full"
            />
            {!title.trim() && (
              <small id="title-error" className="text-red-500">
                El título es requerido
              </small>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="font-medium">
              Descripción
            </label>
            <InputTextarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Descripción de la tarea (opcional)"
              className="w-full"
            />
          </div>

          {taskToEdit && (
            <div className="flex items-center gap-2">
              <label htmlFor="completed" className="font-medium">
                Estado de la tarea
              </label>
              <InputSwitch
                id="completed"
                checked={completed}
                onChange={(e) => setCompleted(e.value)}
                tooltip={completed ? 'Completada' : 'Pendiente'}
                tooltipOptions={{ position: 'right' }}
              />
              <span className="text-sm text-gray-600">
                {completed ? 'Completada' : 'Pendiente'}
              </span>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button 
            label="Cancelar" 
            icon="pi pi-times" 
            onClick={onHide} 
            className="p-button-text"
          />
          <Button 
            label={taskToEdit ? 'Actualizar' : 'Crear'} 
            icon="pi pi-check" 
            onClick={confirmSubmit} 
            loading={isLoading} 
          />
        </div>
      </div>
    </div>
  );
}
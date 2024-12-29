'use client';

import { useEffect, useRef, useState } from 'react';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Message } from 'primereact/message';
import { confirmDialog } from 'primereact/confirmdialog';
import { useTaskStore } from '@/store/useTaskStore';
import { TaskDialog } from './taskDialog';
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { useToast } from '@/providers/confirmProvider';

export function TaskList() {
    const [mounted, setMounted] = useState(false);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const toast = useToast();

    const [filters, setFilters] = useState<DataTableFilterMeta>({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    const [globalFilterValue, setGlobalFilterValue] = useState<string>('');

    const {
        tasks,
        isLoading,
        error,
        fetchTasks,
        deleteTask
    } = useTaskStore();

    useEffect(() => {
        setMounted(true);
        fetchTasks();
    }, [fetchTasks]);

    const confirmDelete = (task: any) => {
        confirmDialog({
            message: '¿Está seguro de eliminar esta tarea?',
            header: 'Confirmar eliminación',
            icon: 'pi pi-exclamation-triangle',
            acceptClassName: 'p-button-danger mx-2',
            accept: () => handleDelete(task._id),
            acceptLabel: 'Sí',
            rejectLabel: 'No'
        });
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteTask(id);
            toast.current?.show({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Tarea eliminada correctamente',
                life: 3000
            });
        } catch (error) {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Error al eliminar la tarea',
                life: 3000
            });
        }
    };

    const openDialog = (task = null) => {
        setSelectedTask(task);
        setDialogVisible(true);
    };

    if (!mounted) return null;
    if (isLoading) return <ProgressSpinner />;
    if (error) return <Message severity="error" text={error} />;

    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        let _filters = { ...filters };

        // @ts-ignore
        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };  

    const header = (
        <div className="md:flex flex-none md:justify-between justify-start items-center">
            <h2 className="text-xl font-bold my-2">Lista de Tareas</h2>
            <InputText className='my-2 w-full md:w-80' value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Buscar tarea"/>
            <Button
            className='my-2'
                label="Nueva Tarea"
                icon="pi pi-plus"
                onClick={() => openDialog()}
            />
        </div>
    );

    const actionBodyTemplate = (rowData: any) => (
        <div className="flex gap-2">
            <Button
                icon="pi pi-pencil"
                className="p-button-rounded p-button-success"
                onClick={() => openDialog(rowData)}
            />
            <Button
                icon="pi pi-trash"
                className="p-button-rounded p-button-danger"
                severity="danger"
                onClick={() => confirmDelete(rowData)}
            />
        </div>
    );

    return (
        <>
            <DataTable
                value={tasks}
                className='w-full'
                header={header}
                filters={filters}
                stripedRows
                paginator
                rows={5}
                rowsPerPageOptions={[5, 10, 25, 50]}
                globalFilterFields={['title', 'description']}
            >
                <Column
                    sortable
                    field="completed"
                    header="Estado"
                    body={(rowData) => (
                        <span className={rowData.completed ? "text-blue-600" : "text-yellow-600"}>
                            {rowData.completed ? "Completada" : "Pendiente"}
                        </span>
                    )
                    }
                    style={{ width: '5rem' }}
                />
                <Column field="title" header="Título" sortable />
                <Column field="description" header="Descripción" />
                <Column
                    field="createdAt"
                    header="Fecha de Creación"
                    sortable
                    body={(rowData) => new Date(rowData.createdAt).toLocaleDateString()}
                />
                <Column
                    body={actionBodyTemplate}
                    style={{ width: '8rem' }}
                    header="Acciones"
                />
            </DataTable>

            <TaskDialog
                visible={dialogVisible}
                onHide={() => {
                    setDialogVisible(false);
                    setSelectedTask(null);
                }}
                taskToEdit={selectedTask}
            />
        </>
    );
}

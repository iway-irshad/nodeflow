"use client";

import { toast } from "sonner";
import { useCreateWorkflow, useSuspenseWorkflows } from "../hooks/use-workflows";
import { EntityContainer, EntityHeader, EntityPagination, EntitySearch } from "@/components/entity-components";
import { useUpgradeModal } from "@/hooks/use-upgrade-modal";
import { useRouter } from "next/navigation";
import { useEntitySearch } from "../hooks/use-entity-search";
import { useWorkflowsParams } from "../hooks/use-workflows-params";

export const WorkflowsSearch = () => {
    const [params, setParams] = useWorkflowsParams();
    const { searchValue, onSearchChange } = useEntitySearch({
        params,
        setParams,
    });

    return (
        <EntitySearch
            value={searchValue}
            onChange={onSearchChange}
            placeholder="Search workflows..."
        />
    )
}

export const WorkflowsList = () => {
    const router = useRouter();
    const workflows = useSuspenseWorkflows();
    
    if (!workflows.data.items || workflows.data.items.length === 0) {
        return (
            <div className="flex-1 flex flex-col justify-center items-center gap-4 p-8">
                <div className="text-center space-y-2">
                    <h3 className="text-lg font-semibold text-gray-900">No workflows yet</h3>
                    <p className="text-sm text-gray-500">Get started by creating your first workflow</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {workflows.data.items.map((workflow) => (
                    <div
                        key={workflow.id}
                        className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer bg-white"
                        onClick={() => router.push(`/workflows/${workflow.id}`)}
                    >
                        <div className="flex flex-col gap-2">
                            <h3 className="font-semibold text-lg truncate">{workflow.name}</h3>
                            <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
                                <span>Created {new Date(workflow.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export const WorkflowsHeader = ({ disabled }: { disabled?: boolean }) => {
    const router = useRouter();
    const createWorkflow = useCreateWorkflow();
    const { handleError, modal } = useUpgradeModal();

    const handleCreate = () => {
        createWorkflow.mutate(undefined, {
            onSuccess: (data) => {
                router.push(`/workflows/${data.id}`);
            },
            onError: (error) => {
                handleError(error);
            },
        });
    }
    return (
        <>
            {modal}
            <EntityHeader
                title="Workflows"
                description="Create and manage your workflows"
                newButtonLabel="New Workflow"
                onNewClick={handleCreate}
                disabled={disabled}
                isCreating={createWorkflow.isPending}
            />
        </>
    );
};

export const WorkflowsPagination = () => {
    const workflows = useSuspenseWorkflows();
    const [params, setParams] = useWorkflowsParams();

    return (
        <EntityPagination
            disabled={workflows.isFetching}
            page={workflows.data.page}
            totalPages={workflows.data.totalPages}
            onPageChange={(page) => setParams({ ...params, page })}
        />
    );
};

export const WorkflowsContainer = ({children}: {children: React.ReactNode}) => {
    return (
        <EntityContainer
            header={<WorkflowsHeader />}
            search={<WorkflowsSearch />}
            pagination={<WorkflowsPagination />}
        >
            {children}
        </EntityContainer>
    );
};

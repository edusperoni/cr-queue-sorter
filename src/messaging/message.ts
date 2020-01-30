


export type OperationList = "GetConfig" | "SaveConfig" | "RevalidateConfig";

export interface ChromeMessage {
    operation: OperationList;
}

export interface ChromeErrorResponse {
    error: any;
}

export function isError(response: any): response is ChromeErrorResponse {
    return !!response.error;
}


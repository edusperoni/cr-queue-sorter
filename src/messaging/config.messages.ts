import { AppConfig } from "../config";
import { ChromeMessage } from "./message";


export interface GetConfigMessage extends ChromeMessage {
    operation: "GetConfig";
};

export function asGetConfigMessage(message: ChromeMessage) {
    return message.operation === "GetConfig" ? message as GetConfigMessage : null;
}

export interface GetConfigResponse {
    config: AppConfig;
};

export function asGetConfigResponse(message: ChromeMessage) {
    return message.operation === "GetConfig" ? message as GetConfigMessage : null;
}

export interface SaveConfigMessage extends ChromeMessage {
    operation: "SaveConfig";
    config: AppConfig;
}

export function asSaveConfigMessage(message: ChromeMessage) {
    return message.operation === "SaveConfig" ? message as SaveConfigMessage : null;
}

export type SaveConfigResponse = {};

export interface RevalidateConfigMessage extends ChromeMessage {
    operation: "RevalidateConfig"
}


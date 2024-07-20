import { Pregnancy } from "./Pregnancy";
import { Child } from "./Child";

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};

export type DashboardProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
    pregnancy: Pregnancy;
    children: Child[];
};

export type PregnancyProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
    pregnancy: Pregnancy;
    success?: string;
    errors?: string;
};

export type ChildrenProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
    children: Child[];
};




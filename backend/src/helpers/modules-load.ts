const importDynamic = new Function('modulePath', 'return import(modulePath)');

export async function loadLuciaModule() {
    const module = importDynamic('lucia') as Promise<typeof import('lucia')>;

    return module;
}

export async function loadPrismaAdapterModule() {
    const module = importDynamic('@lucia-auth/adapter-prisma') as Promise<
        typeof import('@lucia-auth/adapter-prisma')
    >;

    return module;
}

export async function loadGetPortModule() {
    const module = importDynamic('get-port') as Promise<
        typeof import('get-port')
    >;

    return module;
}

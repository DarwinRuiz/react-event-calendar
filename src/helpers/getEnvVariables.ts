export const getEnvVariables = (): Record<string, string> => {
    import.meta.env

    return {
        ...import.meta.env,
    }
}

export const useTryCatch = () => {
    const handles = {
         wrap: async <T>(callback: () => Promise<T> | T, onErrorCaught?: (err?: any) => Promise<T> | T): Promise<T | undefined> => {
            try {
                return await callback();
            }
            catch(err){
                console.log('--tryCatchWrapper', err);
                if(onErrorCaught) return await onErrorCaught?.(err)
            }
        },
    };
    return {...handles}
};
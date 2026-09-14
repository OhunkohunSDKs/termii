
export const useTryCatch = (debug?: boolean) => {
    const handles = {
         wrap: async <T>(callback: () => Promise<T> | T, onErrorCaught?: (err?: any) => Promise<T> | T): Promise<T | undefined> => {
            try {
                return await callback();
            }
            catch(err){
                if(debug) console.log('debug::useTryCatch.wrap', err);
                return await onErrorCaught?.(err);
            }
        },
    };
    return {...handles}
};
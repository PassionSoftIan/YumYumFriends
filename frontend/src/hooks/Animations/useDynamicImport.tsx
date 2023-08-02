// hooks/Animations/useDynamicImport.ts
import { useState, useEffect } from 'react';

const useDynamicImport = (context: __WebpackModuleApi.RequireContext) => {
  const [importedFiles, setImportedFiles] = useState<string[]>([]);

  useEffect(() => {
    const files = context.keys().map((key: string) => context(key));
    setImportedFiles(files);
  }, [context]);

  return importedFiles;
};

export default useDynamicImport;

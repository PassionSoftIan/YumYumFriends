import { useEffect, useState } from 'react';

const useDynamicImport = (directory: any) => {
  const [importedFiles, setImportedFiles] = useState<string[]>([]);

  useEffect(() => {
    const keys = directory.keys();
    const importedFiles = keys.map((key: string) => directory(key).default);
    console.log(importedFiles);
    setImportedFiles(importedFiles);
  }, [directory]);

  return importedFiles;
};

export default useDynamicImport;

import { Button } from "@/components/ui/button";
import { BiImport } from "react-icons/bi";
import { Input } from "@/components/ui/input";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { DialogDescription } from "@/components/ui/dialog";

export default function ImportFileForm() {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      console.log("file accepted", acceptedFiles);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  return (
    <div
      className={`transition rounded border-2 border-dotted border-gray-200 flex justify-center items-center flex-col min-h-fit p-5 max-h-80 h-72 ${
        isDragActive ? "bg-orange-200" : "bg-transparent"
      }`}
      {...getRootProps()}
    >
      <p className="text-lg mb-4 transition-all">
        {isDragActive
          ? "Drop your file here"
          : "Drag and drop your .keras file here"}
      </p>
      {!isDragActive && (
        <>
          <DialogDescription className="mb-1 transition-opacity">
            Or click import to browse a file.
          </DialogDescription>
          <Button
            className="transition-all bg-orange-400 hover:bg-orange-200"
            onClick={() => {
              const fileInput = document.getElementById("fileInput");
              if (fileInput) fileInput.click();
            }}
          >
            <BiImport /> Import File
          </Button>
        </>
      )}
      <Input
        type="file"
        className="hidden"
        id="fileInput"
        // accept=".keras"
        {...getInputProps()}
      />
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { useDialogContext } from "./action-button-cluster";
import { BiImport } from "react-icons/bi";
import { Input } from "@/components/ui/input";

export default function ImportFileForm() {
  const { formData } = useDialogContext();

  return (
    <div className="rounded border-2 border-dotted border-gray-200 flex justify-center items-center flex-col gap-4 min-h-fit p-5 max-h-80 h-72">
      <p className="text-lg">Drop a .keras file here</p>
      <Button
        onClick={() => {
          const fileInput = document.getElementById("fileInput");
          if (fileInput) fileInput.click();
        }}
      >
        <BiImport /> Import File
      </Button>
      <Input type="file" className="hidden" id="fileInput" accept=".keras" />
    </div>
  );
}

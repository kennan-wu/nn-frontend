import { useDialogContext } from "./action-button-cluster";

export default function NameDescriptionForm() {
  const { formData, setFormData } = useDialogContext();

  return (
    <form>
      <div className="flex flex-col gap-2">
        <p>Name</p>
        <input
          className="w-full border-gray-200 border-2 rounded p-2"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        ></input>
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <p>Description (Optional)</p>
        <textarea
          className="w-full border-gray-200 border-2 rounded p-2 resize-none"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        ></textarea>
      </div>
    </form>
  );
}

import { Button } from "@/components/ui/button";
import React, {
  useEffect,
  useMemo,
  useCallback,
  useState,
  useRef,
} from "react";
import { CreateForm } from "./dashboard-action-button";
import { Edit2, Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function NameDescriptionForm({
  formData,
  setFormData,
  setDisableButton,
}: {
  formData: CreateForm;
  setFormData: (formData: CreateForm) => void;
  setDisableButton: (disable: boolean) => void;
}) {
  const isFormValid = useMemo(() => {
    if (!formData.name.trim()) {
      return false;
    }
    if (formData.layers.length < 2) {
      return false;
    }
    const allLayersValid = formData.layers.every((layer, index) => {
      const isNameValid = layer.name.trim();
      const isActivationValid = layer.activation;
      const isNeuronCountValid = Number(layer.neuronCount) > 0;
      return isNameValid && isActivationValid && isNeuronCountValid;
    });

    if (!allLayersValid) {
      return false;
    }
    return true;
  }, [formData]);

  useEffect(() => {
    setDisableButton(!isFormValid);
  }, [isFormValid, setDisableButton]);

  const handleAddLayer = useCallback(
    (index: number, e: React.MouseEvent) => {
      e.preventDefault();
      const updatedLayers = [...formData.layers];

      updatedLayers.splice(index, 0, {
        name: `Hidden Layer ${index}`,
        activation: "",
        neuronCount: "",
      });

      setFormData({ ...formData, layers: updatedLayers });
    },
    [formData, setFormData]
  );

  return (
    <form>
      <div className="flex flex-col gap-2">
        <p>Name</p>
        <input
          className="w-full border-gray-200 border-2 rounded p-2"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <p>Description (Optional)</p>
        <textarea
          className="w-full border-gray-200 border-2 rounded p-2 resize-none"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
      </div>
      <div className="flex flex-col mt-4">
        <p className="mb-2">Layers</p>
        {formData.layers.map((layer, index) => (
          <div key={index} className="relative">
            <LayerItem
              index={index}
              name={layer.name}
              formData={formData}
              setFormData={setFormData}
              isRequired={index === 0 || index === formData.layers.length - 1}
            />
            {index < formData.layers.length - 1 &&
              formData.layers.length < 6 && (
                <div className="flex justify-center my-1 absolute -bottom-2 left-1/2 transform -translate-x-1/2 z-10">
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full w-6 h-6 p-0 border-dashed"
                    onClick={(e) => handleAddLayer(index + 1, e)}
                  >
                    <Plus className="h-3 w-3" />
                    <span className="sr-only">Add layer</span>
                  </Button>
                </div>
              )}
          </div>
        ))}
      </div>
    </form>
  );
}

function LayerItem({
  name,
  formData,
  setFormData,
  isRequired,
  index,
}: {
  name: string;
  formData: CreateForm;
  setFormData: (formData: CreateForm) => void;
  isRequired: boolean;
  index: number;
}) {
  const onUpdate = (property: string, value: string | number) => {
    const updatedLayers = [...formData.layers];
    updatedLayers[index] = { ...updatedLayers[index], [property]: value };
    setFormData({
      ...formData,
      layers: updatedLayers,
    });
  };

  const [editName, setEditName] = useState(false);
  const onDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    const updatedLayers = [...formData.layers];
    updatedLayers.splice(index, 1);
    setFormData({
      ...formData,
      layers: updatedLayers,
    });
  };

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (editName && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editName]);

  return (
    <div className="space-y-2 p-2 pb-7 mb-2 bg-white rounded-lg transition group hover:shadow-md">
      <div className="flex items-center justify-between">
        <Button
          className="flex flex-row items-center gap-2 group/name p-0 bg-transparent text-black hover:bg-transparent"
          onClick={(e) => {
            e.preventDefault();
            setEditName(true);
          }}
        >
          {editName ? (
            <Input
              ref={inputRef}
              value={formData.layers[index].name}
              onChange={(e) => onUpdate("name", e.target.value)}
              placeholder="Layer name"
              onBlur={(e) => {
                onUpdate("name", e.target.value);
                setEditName(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onUpdate("name", e.currentTarget.value);
                  setEditName(false);
                }
              }}
            />
          ) : (
            <>
              <h3 className="text-lg font-semibold">{name}</h3>
              <Edit2 className="w-3 h-3 text-gray-300 group-hover/name:text-black transition mt-1" />
            </>
          )}
        </Button>
        {!isRequired && (
          <Button
            variant="ghost"
            size="icon"
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            onClick={(e) => onDelete(e)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="space-y-2">
        <Select onValueChange={(value) => onUpdate("activation", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select layer type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Sigmoid">Sigmoid</SelectItem>
            <SelectItem value="ReLU">ReLU</SelectItem>
            <SelectItem value="Tanh">Tanh</SelectItem>
          </SelectContent>
        </Select>
        <Input
          type="number"
          min="1"
          max="100"
          value={formData.layers[index].neuronCount || ""}
          onChange={(e) => onUpdate("neuronCount", e.target.value)}
          onInput={(e) => {
            const input = e.target as HTMLInputElement;
            input.value = input.value.replace(/[^0-9]/g, "");
          }}
          placeholder="Number of neurons (max 1000)"
        />
      </div>
    </div>
  );
}

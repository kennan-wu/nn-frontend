import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { CreateForm } from "./dashboard-action-button";
import { Edit, Edit2, Plus, Trash2 } from "lucide-react";
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
  useEffect(() => {
    if (formData.name.length > 0 && formData.description.length > 0) {
      setDisableButton(false);
    }
  }, [formData]);

  console.log("formData", formData);
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
      <div className="flex flex-col mt-4">
        <p className="mb-2">Layers</p>
        {formData.layers.map((layer, index) => (
          <React.Fragment key={index}>
            <LayerItem
              index={index}
              name={layer.name}
              formData={formData}
              setFormData={setFormData}
              isRequired={index === 0 || index === formData.layers.length - 1}
            />
            {index < formData.layers.length - 1 &&
              formData.layers.length < 6 && (
                <div className="flex justify-center my-1">
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full w-6 h-6 p-0 border-dashed"
                    // onClick={() => handleAddLayer(index + 1)}
                  >
                    <Plus className="h-3 w-3" />
                    <span className="sr-only">Add layer</span>
                  </Button>
                </div>
              )}
          </React.Fragment>
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
    console.log(index);
    const updatedLayers = [...formData.layers];
    updatedLayers[index] = { ...updatedLayers[index], [property]: value };
    setFormData({
      ...formData,
      layers: updatedLayers,
    });
    console.log(formData);
  };

  const [editName, setEditName] = useState(false);

  return (
    <div className="space-y-2 p-2 pt-0 bg-white rounded-lg transition group hover:shadow-sm">
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
              value={formData.layers[index].name}
              onChange={(e) => onUpdate("name", e.target.value)}
              placeholder="Layer name"
              onBlur={(e) => {
                onUpdate("name", e.target.value);
                setEditName(false);
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
            // onClick={() => onDelete(layer.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="space-y-2">
        <Select onValueChange={(value) => onUpdate("type", value)}>
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
          value={formData.layers[index].neuronCount}
          onChange={(e) => onUpdate("neuronCount", e.target.value)}
          placeholder="Number of neurons (max 100)"
        />
      </div>
    </div>
  );
}

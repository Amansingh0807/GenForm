"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Trash2, Plus, Save, ArrowUp, ArrowDown } from "lucide-react";
import toast from "react-hot-toast";

import { useAutoSaveDraft } from "@/hooks/useAutoSaveDraft";

type FieldType = {
  id: string;
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  options?: string[];
  required: boolean;
};

type FormData = {
  formTitle: string;
  formFields: FieldType[];
};

type Props = {
  form: any;
  onSave: (formData: FormData) => void;
};

const fieldTypes = [
  { value: "text", label: "Text Input" },
  { value: "email", label: "Email" },
  { value: "number", label: "Number" },
  { value: "textarea", label: "Textarea" },
  { value: "select", label: "Dropdown" },
  { value: "radio", label: "Radio Buttons" },
  { value: "checkbox", label: "Checkboxes" },
  { value: "date", label: "Date" },
  { value: "time", label: "Time" },
  { value: "datetime-local", label: "Date & Time" },
];

const FormEditor: React.FC<Props> = ({ form, onSave }) => {
  const [formData, setFormData] = useState<FormData>({
    formTitle: "",
    formFields: [],
  });

  const draftKey = `genform-draft-${form?.id || "new"}`;

  const { status, loadDraft, clearDraft } = useAutoSaveDraft<FormData>(
    draftKey,
    formData
  );

  useEffect(() => {
    const savedDraft = loadDraft();

    if (savedDraft) {
      setFormData(savedDraft);
      toast.success("Draft restored");
      return;
    }

    if (form) {
      const parsedContent =
        typeof form.content === "string"
          ? JSON.parse(form.content)
          : form.content;

      setFormData({
        formTitle: parsedContent.formTitle || "",
        formFields:
          parsedContent.formFields?.map((field: any, index: number) => ({
            id: `field-${index}`,
            ...field,
          })) || [],
      });
    }
  }, [form, loadDraft]);

  const addField = () => {
    const newField: FieldType = {
      id: `field-${Date.now()}`,
      label: "New Field",
      name: `field_${formData.formFields.length + 1}`,
      type: "text",
      placeholder: "Enter value",
      required: false,
    };

    setFormData((prev) => ({
      ...prev,
      formFields: [...prev.formFields, newField],
    }));
  };

  const updateField = (fieldId: string, updates: Partial<FieldType>) => {
    setFormData((prev) => ({
      ...prev,
      formFields: prev.formFields.map((field) =>
        field.id === fieldId ? { ...field, ...updates } : field
      ),
    }));
  };

  const deleteField = (fieldId: string) => {
    setFormData((prev) => ({
      ...prev,
      formFields: prev.formFields.filter((field) => field.id !== fieldId),
    }));
  };

  const moveField = (fieldId: string, direction: "up" | "down") => {
    const index = formData.formFields.findIndex((f) => f.id === fieldId);
    if (index === -1) return;

    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= formData.formFields.length) return;

    const items = [...formData.formFields];
    const [moved] = items.splice(index, 1);
    items.splice(newIndex, 0, moved);

    setFormData((prev) => ({
      ...prev,
      formFields: items,
    }));
  };

  const handleSave = () => {
    if (!formData.formTitle.trim()) {
      toast.error("Form title is required");
      return;
    }

    if (formData.formFields.length === 0) {
      toast.error("At least one field is required");
      return;
    }

    onSave(formData);
    clearDraft();
    toast.success("Form saved successfully");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Form Settings</CardTitle>
        </CardHeader>

        <CardContent>
          <Label>Form Title</Label>
          <Input
            value={formData.formTitle}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                formTitle: e.target.value,
              }))
            }
            placeholder="Enter form title"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Form Fields</CardTitle>
          <Button onClick={addField} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Field
          </Button>
        </CardHeader>

        <CardContent className="space-y-4">
          {formData.formFields.map((field, index) => (
            <Card key={field.id}>
              <CardContent className="p-4 space-y-3">
                {/* label + controls row */}
                <div className="flex gap-3 items-center">
                  <Input
                    value={field.label}
                    onChange={(e) =>
                      updateField(field.id, { label: e.target.value })
                    }
                    placeholder="Field Label"
                  />

                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => moveField(field.id, "up")}
                    disabled={index === 0}
                  >
                    <ArrowUp size={14} />
                  </Button>

                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => moveField(field.id, "down")}
                    disabled={index === formData.formFields.length - 1}
                  >
                    <ArrowDown size={14} />
                  </Button>

                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => deleteField(field.id)}
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>

                {/* type selector */}
                <div className="space-y-1">
                  <Label>Field Type</Label>
                  <Select
                    value={field.type}
                    onValueChange={(value) =>
                      updateField(field.id, { type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select field type" />
                    </SelectTrigger>
                    <SelectContent>
                      {fieldTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* placeholder input */}
                <div className="space-y-1">
                  <Label>Placeholder</Label>
                  <Input
                    value={field.placeholder || ""}
                    onChange={(e) =>
                      updateField(field.id, { placeholder: e.target.value })
                    }
                    placeholder="Placeholder"
                  />
                </div>

                {/* required toggle */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={field.required}
                    onChange={(e) =>
                      updateField(field.id, { required: e.target.checked })
                    }
                  />
                  <Label className="!mb-0">Required</Label>
                </div>

                {/* options for select/radio/checkbox */}
                {["select", "radio", "checkbox"].includes(field.type) && (
                  <div className="space-y-2">
                    <Label>Options</Label>
                    {(field.options || []).map((option, idx) => (
                      <Input
                        key={idx}
                        value={option}
                        onChange={(e) => {
                          const newOptions = [...(field.options || [])];
                          newOptions[idx] = e.target.value;
                          updateField(field.id, { options: newOptions });
                        }}
                      />
                    ))}
                    <Button
                      size="sm"
                      onClick={() =>
                        updateField(field.id, {
                          options: [...(field.options || []), "New Option"],
                        })
                      }
                    >
                      Add Option
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      {/* live preview card */}
      <Card>
        <CardHeader>
          <CardTitle>Live Preview</CardTitle>
        </CardHeader>
        <CardContent>
          {formData.formFields.map((field) => (
            <div key={field.id} className="space-y-2 mb-4">
              <Label>
                {field.label}
                {field.required && " *"}
              </Label>

              {field.type === "textarea" && (
                <textarea className="w-full border p-2" />
              )}
              {field.type === "select" && (
                <select className="w-full border p-2">
                  {(field.options || []).map((opt, idx) => (
                    <option key={idx}>{opt}</option>
                  ))}
                </select>
              )}
              {field.type === "radio" && (
                <div className="space-y-1">
                  {(field.options || []).map((opt, idx) => (
                    <label key={idx} className="flex items-center gap-2">
                      <input type="radio" name={field.id} />
                      {opt}
                    </label>
                  ))}
                </div>
              )}
              {field.type === "checkbox" && (
                <div className="space-y-1">
                  {(field.options || []).map((opt, idx) => (
                    <label key={idx} className="flex items-center gap-2">
                      <input type="checkbox" />
                      {opt}
                    </label>
                  ))}
                </div>
              )}
              {field.type !== "textarea" &&
                field.type !== "select" &&
                field.type !== "radio" &&
                field.type !== "checkbox" && (
                  <input
                    className="w-full border p-2"
                    type={field.type}
                    placeholder={field.placeholder}
                    disabled
                  />
                )}
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          {status === "saving" && "Saving draft..."}
          {status === "saved" && "Draft saved ✓"}
        </div>

        <Button onClick={handleSave}>
          <Save className="w-4 h-4 mr-2" />
          Save Form
        </Button>
      </div>
    </div>
  );
};

export default FormEditor;

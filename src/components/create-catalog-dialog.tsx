import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import { Button } from "@/components/ui/button";
  import { Input } from "@/components/ui/input";
  import { Textarea } from "@/components/ui/textarea";
  import { useState } from 'react';
  import { Plus } from 'lucide-react';
  import { api } from "@/services/api"
import { SidebarGroupAction } from "./ui/sidebar";
import { Catalog } from "@/types/types";
  
  export function CreateCatalogDialog({ onCatalogCreate }: { onCatalogCreate: (catalog: Catalog) => void }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [open, setOpen] = useState(false);
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        const catalog = await api.createCatalog(name, description);
        onCatalogCreate({ ...catalog, items: [] });
        setOpen(false);
        setName('');
        setDescription('');
      } catch (error) {
        console.error('Failed to create catalog:', error);
      }
    };
  
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <SidebarGroupAction title="Add Catalog" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
          </SidebarGroupAction>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Catalog</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Catalog Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <Button type="submit" className="w-full">Create Catalog</Button>
          </form>
        </DialogContent>
      </Dialog>
    );
  }
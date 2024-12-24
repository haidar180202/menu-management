// src/types/menu.ts
export interface MenuItem {
    icon: string;
    parentName: string;
    id: string;
    name: string;
    children?: MenuItem[];
    parentId?: string;
    depth?: number;
  }
  

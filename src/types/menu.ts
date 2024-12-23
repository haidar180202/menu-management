// src/types/menu.ts
export interface MenuItem {
    id: string;
    name: string;
    children?: MenuItem[];
    parentId?: string;
    depth?: number;
  }
  

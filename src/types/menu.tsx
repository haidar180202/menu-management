// src/types/menu.ts
export interface MenuItem {
    active: any;
    highlight: any;
    icon: string;
    parentName: string;
    id: string;
    name: string;
    children?: MenuItem[];
    parentId?: string;
    depth?: number;
  }
  

export interface MenuItem {
    active: boolean;
    highlight: boolean;
    icon: string;
    parentName: string;
    id: string;
    name: string;
    children?: MenuItem[];
    parentId?: string;
    depth?: number;
  }
  

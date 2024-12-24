// src/types/menu.ts
"use client"
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
  

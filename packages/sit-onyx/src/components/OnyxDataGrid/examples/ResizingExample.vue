<script setup lang="ts">
import { DataGridFeatures, OnyxDataGrid, type ColumnConfig } from "../../..";

type TEntry = {
  id: number;
  name: string;
  age: number;
  birthday: Date;
  balance: number;
  car: string;
  favoriteColor: string;
  email: string;
  phone: string;
};

const data: TEntry[] = [
  {
    id: 1,
    name: "Jennifer Pennymarket",
    age: 25,
    birthday: new Date("1995-06-15"),
    balance: 1000,
    car: "Toyota Corolla 2005 (Blue)",
    favoriteColor: "Blue",
    email: "jennifer.pennymarket@example.com",
    phone: "+1 (212) 555-1234",
  },
  {
    id: 2,
    name: "Dieter Dubinsky",
    age: 28,
    birthday: new Date("2001-02-22"),
    balance: 2000,
    car: "Honda Civic 2004 (Red)",
    favoriteColor: "Red",
    email: "dieter.dubinsky@example.com",
    phone: "+1 (212) 555-5678",
  },
  {
    id: 3,
    name: "Officer Rathershort",
    age: 42,
    birthday: new Date("1997-04-18"),
    balance: 3000,
    car: "Ford Mustang 2007 (Black)",
    favoriteColor: "Black",
    email: "officer.rathershort@example.com",
    phone: "+1 (212) 555-9012",
  },
  {
    id: 4,
    name: "Inspector Vary Long",
    age: 30,
    birthday: new Date("1990-01-01"),
    balance: 4000,
    car: "BMW 3 Series 2002 (White)",
    favoriteColor: "White",
    email: "inspector.varylong@example.com",
    phone: "+1 (212) 555-3456",
  },
  {
    id: 5,
    name: "Chief Superintendent Evan Longer",
    age: 35,
    birthday: new Date("1998-02-11"),
    balance: 5000,
    car: "Mercedes-Benz B-Class 2003 (Silver)",
    favoriteColor: "Green",
    email: "chief.superintendentevanlonger@example.com",
    phone: "+1 (212) 555-7890",
  },
];

const columns: ColumnConfig<TEntry>[] = [
  { key: "name", label: "Name" },
  { key: "age", label: "Age", type: "number" },
  { key: "birthday", label: "Birthday", type: "date" },
  { key: "balance", label: "Balance", type: "number" },
  { key: "car", label: "Car" },
  { key: "favoriteColor", label: "Favorite Color" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
];

const withResizing = DataGridFeatures.useResizing<TEntry>();
const features = [withResizing];
</script>

<template>
  <OnyxDataGrid headline="Resizable table columns with drag and slide" :columns :data :features />
</template>

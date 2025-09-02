<script lang="ts" setup>
import { iconForward } from "@sit-onyx/icons";
import {
  createFeature,
  DataGridFeatures,
  OnyxAvatar,
  OnyxDataGrid,
  OnyxSystemButton,
  useToast,
  type ColumnConfig,
  type ColumnGroupConfig,
  type TypeRenderMap,
} from "sit-onyx";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const toast = useToast();

type TUserFromApi = {
  id: number;
  image: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  role: string;
  address: {
    address: string;
    city: string;
    country: string;
  };
};

type UserEntry = Omit<TUserFromApi, "address"> &
  TUserFromApi["address"] & {
    isAdmin: boolean;
  };

const userColumns: ColumnConfig<
  UserEntry,
  ColumnGroupConfig,
  keyof ReturnType<typeof userCustomType>["typeRenderer"]
>[] = [
  { key: "image", label: t("dataGrid.userTable.image"), type: "image", width: "min-content" },
  { key: "firstName", label: t("dataGrid.userTable.firstName") },
  { key: "lastName", label: t("dataGrid.userTable.lastName") },
  { key: "email", label: t("dataGrid.userTable.email") },
  { key: "age", label: t("dataGrid.userTable.age") },
  { key: "address", label: t("dataGrid.userTable.address"), width: "max-content" },
  { key: "city", label: t("dataGrid.userTable.city") },
  { key: "country", label: t("dataGrid.userTable.country"), width: "max-content" },
  { key: "role", label: t("dataGrid.userTable.role") },
  { key: "isAdmin", label: t("dataGrid.userTable.isAdmin"), type: "boolean", width: "max-content" },
  { key: "id", label: "", type: "detailsButton", width: "min-content" },
];

const { state: userData, isLoading } = useAsyncState(
  async () => {
    const { users } = await $fetch<{ users: TUserFromApi[] }>("https://dummyjson.com/users");
    return users.map<UserEntry>((user) => ({
      id: user.id,
      image: user.image,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      age: user.age,
      role: user.role,
      isAdmin: user.role.toLowerCase() === "admin",
      address: user.address.address,
      city: user.address.city,
      country: user.address.country,
    }));
  },
  [],
  {
    delay: 1000, // add a fake delay so the skeleton state can be showcased
    onError: (e) => {
      toast.show({
        headline: t("dataGrid.userTable.error.errorTitle"),
        description: (e as Error).message,
        color: "danger",
      });
    },
  },
);

const userCustomType = createFeature(() => ({
  name: Symbol("User Types"),
  typeRenderer: {
    image: DataGridFeatures.createTypeRenderer({
      cell: {
        component: ({ modelValue, row }) => {
          return h(OnyxAvatar, {
            fullName: `${row.firstName} ${row.lastName}`,
            src: modelValue?.toString(),
            size: "32px",
          });
        },
      },
    }),
    detailsButton: DataGridFeatures.createTypeRenderer({
      cell: {
        component: () => {
          return h(OnyxSystemButton, {
            label: t("dataGrid.userTable.detailsButton"),
            icon: iconForward,
            link: "/forms",
            style: { verticalAlign: "middle" },
          });
        },
      },
    }),
  } satisfies TypeRenderMap<UserEntry>,
}));
const userPagination = DataGridFeatures.usePagination({
  pageSize: 8,
});
const userHiddenColumns = DataGridFeatures.useHideColumns<UserEntry>({
  columns: {
    id: { enabled: false },
  },
});
const userFiltering = DataGridFeatures.useFiltering<UserEntry>({
  columns: {
    id: { enabled: false },
    image: { enabled: false },
  },
});
const userSorting = DataGridFeatures.useSorting<UserEntry>({
  columns: {
    id: { enabled: false },
    image: { enabled: false },
  },
});
const userStickyColumns = DataGridFeatures.useStickyColumns<UserEntry>({
  columns: ["id"],
  position: "right",
});
const userResizing = DataGridFeatures.useResizing<UserEntry>();

const userSelection = DataGridFeatures.useSelection<UserEntry>();

const userFeatures = [
  userCustomType,
  userPagination,
  userFiltering,
  userSorting,
  userHiddenColumns,
  userStickyColumns,
  userSelection,
  userResizing,
];
</script>

<template>
  <OnyxDataGrid
    :columns="userColumns"
    :data="userData"
    :skeleton="isLoading"
    :features="userFeatures"
  />
</template>

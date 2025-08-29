<script lang="ts" setup>
import { iconForward } from "@sit-onyx/icons";
import {
  createFeature,
  DataGridFeatures,
  OnyxAvatar,
  OnyxDataGrid,
  OnyxSystemButton,
  type ColumnConfig,
  type ColumnGroupConfig,
  type TypeRenderMap,
} from "sit-onyx";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const userData = ref<UserEntry[]>([]);
const isLoading = ref(true);
const error = ref<string | null>(null);

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

type UserEntry = {
  id: number;
  avatar: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  role: string;
  isAdmin: boolean;
  address: string;
  city: string;
  country: string;
};

const userColumns: ColumnConfig<
  UserEntry,
  ColumnGroupConfig,
  keyof ReturnType<typeof userCustomType>["typeRenderer"]
>[] = [
  { key: "avatar", label: t("dataGrid.userTable.avatar"), type: "avatar", width: "min-content" },
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

async function fetchData() {
  try {
    const response = await fetch("https://dummyjson.com/users");
    if (!response.ok) {
      throw new Error("Failed to fetch data.");
    }
    const result = await response.json();

    const transformedUserData: UserEntry[] = result.users.map((user: TUserFromApi) => ({
      id: user.id,
      avatar: user.image,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      age: user.age,
      role: user.role,
      isAdmin: user.role === "admin",
      address: user.address.address,
      city: user.address.city,
      country: user.address.country,
    }));

    userData.value = transformedUserData;
  } catch (err) {
    if (err instanceof Error) {
      error.value = err.message;
    } else {
      error.value = "An unknown error occurred.";
    }
  } finally {
    isLoading.value = false;
  }
}

const userCustomType = createFeature(() => ({
  name: Symbol("User Types"),
  typeRenderer: {
    avatar: DataGridFeatures.createTypeRenderer({
      cell: {
        component: ({ modelValue }) => {
          return h(OnyxAvatar, { fullName: "Test", src: modelValue?.toString(), size: "32px" });
        },
      },
    }),
    detailsButton: DataGridFeatures.createTypeRenderer({
      cell: {
        component: (props) => {
          return h(OnyxSystemButton, {
            label: "Show details",
            icon: iconForward,
            link: `#some-page-${props.row.id}`,
            onClick: () => alert(JSON.stringify(props)),
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
    avatar: { enabled: false },
  },
});
const userFiltering = DataGridFeatures.useFiltering<UserEntry>({
  columns: {
    id: { enabled: false },
    isAdmin: { enabled: false },
    avatar: { enabled: false },
  },
});
const userSorting = DataGridFeatures.useSorting<UserEntry>({
  columns: {
    id: { enabled: false },
    avatar: { enabled: false },
  },
});

const userStickyColumns = DataGridFeatures.useStickyColumns<UserEntry>({
  columns: ["id"],
  position: "right",
});

const userFeatures = [
  userCustomType,
  userPagination,
  userHiddenColumns,
  userFiltering,
  userSorting,
  userStickyColumns,
];

onMounted(() => {
  fetchData();
});
</script>

<template>
  <OnyxDataGrid
    :columns="userColumns"
    :data="userData"
    :skeleton="isLoading"
    :features="userFeatures"
  />
  <p v-if="error">{{ error }}</p>
</template>

<style lang="scss" scoped></style>
